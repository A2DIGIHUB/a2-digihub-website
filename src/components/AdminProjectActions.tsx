import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import {
    ProjectStatus,
    getStatusConfig,
    calculateEstimatedCompletion,
} from '../lib/projectStatus';
import { useAuth } from '../contexts/AuthContext';

interface AdminProjectActionsProps {
    projectId: string;
    currentStatus: ProjectStatus;
    currentProgress: number;
    onUpdate: () => void;
}

const AdminProjectActions: React.FC<AdminProjectActionsProps> = ({
    projectId,
    currentStatus,
    currentProgress,
    onUpdate,
}) => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [newStatus, setNewStatus] = useState<ProjectStatus>(currentStatus);
    const [progress, setProgress] = useState(currentProgress);
    const [milestone, setMilestone] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    const availableStatuses: ProjectStatus[] = [
        'pending',
        'under_review',
        'approved',
        'in_progress',
        'in_development',
        'testing',
        'ready_for_delivery',
        'delivered',
        'completed',
        'rejected',
        'on_hold',
    ];

    const handleUpdateProject = async () => {
        setLoading(true);
        try {
            const updates: any = {
                status: newStatus,
                progress_percentage: progress,
            };

            // Set started_at if moving to in_progress
            if (newStatus === 'in_progress' && currentStatus !== 'in_progress') {
                updates.started_at = new Date().toISOString();
                updates.estimated_completion = calculateEstimatedCompletion('standard').toISOString();
            }

            // Set completed_at if moving to completed
            if (newStatus === 'completed' && currentStatus !== 'completed') {
                updates.completed_at = new Date().toISOString();
                updates.progress_percentage = 100;
            }

            if (milestone) {
                updates.current_milestone = milestone;
            }

            if (notes) {
                updates.notes = notes;
            }

            const { error: updateError } = await supabase
                .from('quotes')
                .update(updates)
                .eq('id', projectId);

            if (updateError) throw updateError;

            // Add activity for progress update if changed
            if (progress !== currentProgress) {
                await supabase.from('project_activities').insert({
                    quote_id: projectId,
                    activity_type: 'progress_update',
                    description: `Progress updated to ${progress}%`,
                    created_by: user?.id,
                    metadata: { old_progress: currentProgress, new_progress: progress },
                });
            }

            // Add activity for milestone if added
            if (milestone) {
                await supabase.from('project_activities').insert({
                    quote_id: projectId,
                    activity_type: 'milestone_completed',
                    description: `Milestone: ${milestone}`,
                    created_by: user?.id,
                });
            }

            // Add comment if notes provided
            if (notes) {
                await supabase.from('project_activities').insert({
                    quote_id: projectId,
                    activity_type: 'comment',
                    description: notes,
                    created_by: user?.id,
                });
            }

            setIsOpen(false);
            onUpdate();
        } catch (error) {
            console.error('Error updating project:', error);
            alert('Failed to update project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-ios-blue hover:bg-purple-700 rounded-lg transition-colors"
            >
                Update Status
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <Dialog.Title className="text-lg font-bold text-gray-900 dark:text-white">
                                Update Project
                            </Dialog.Title>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                <XMarkIcon className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value as ProjectStatus)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                >
                                    {availableStatuses.map((status) => {
                                        const config = getStatusConfig(status);
                                        return (
                                            <option key={status} value={status}>
                                                {config.label}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            {/* Progress */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Progress: {progress}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress}
                                    onChange={(e) => setProgress(parseInt(e.target.value))}
                                    className="w-full"
                                />
                            </div>

                            {/* Milestone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Current Milestone (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={milestone}
                                    onChange={(e) => setMilestone(e.target.value)}
                                    placeholder="e.g., Design approved, Development started"
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Notes/Comment (Optional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add any notes or comments..."
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateProject}
                                disabled={loading}
                                className="flex-1 px-4 py-2 bg-ios-blue hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Project'}
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default AdminProjectActions;
