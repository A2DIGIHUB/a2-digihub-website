import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
    XMarkIcon,
    ClockIcon,
    CalendarIcon,
    CheckCircleIcon,
    ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import {
    EnhancedQuote,
    ProjectActivity,
    ProjectMilestone,
    getStatusConfig,
    getActivityConfig,
    formatDateTime,
    getRelativeTime,
    getProgressColor,
} from '../lib/projectStatus';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
    isOpen,
    onClose,
    projectId,
}) => {
    const [project, setProject] = useState<EnhancedQuote | null>(null);
    const [activities, setActivities] = useState<ProjectActivity[]>([]);
    const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && projectId) {
            fetchProjectDetails();
        }
    }, [isOpen, projectId]);

    const fetchProjectDetails = async () => {
        setLoading(true);
        try {
            // Fetch project
            const { data: projectData, error: projectError } = await supabase
                .from('quotes')
                .select('*, profiles:user_id(email, full_name, avatar_url)')
                .eq('id', projectId)
                .single();

            if (projectError) throw projectError;

            // Fetch activities
            const { data: activitiesData, error: activitiesError } = await supabase
                .from('project_activities')
                .select('*, profile:created_by(full_name, email, avatar_url)')
                .eq('quote_id', projectId)
                .order('created_at', { ascending: false });

            if (activitiesError) throw activitiesError;

            // Fetch milestones
            const { data: milestonesData, error: milestonesError } = await supabase
                .from('project_milestones')
                .select('*')
                .eq('quote_id', projectId)
                .order('order_index', { ascending: true });

            if (milestonesError) throw milestonesError;

            setProject(projectData);
            setActivities(activitiesData || []);
            setMilestones(milestonesData || []);
        } catch (error) {
            console.error('Error fetching project details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!project) return null;

    const statusConfig = getStatusConfig(project.status);
    const progressColor = getProgressColor(project.progress_percentage);

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
                <Dialog.Panel className="w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-800 shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800">
                        <div className="flex-1">
                            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                                {project.service_type}
                            </Dialog.Title>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {project.package_type} • {project.estimated_price}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            <XMarkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <>
                                {/* Status & Progress */}
                                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Status</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusConfig.bgColor} ${statusConfig.darkBgColor} ${statusConfig.color}`}>
                                                    {statusConfig.label}
                                                </span>
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {statusConfig.description}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Progress</p>
                                            <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                                                {project.progress_percentage}%
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.progress_percentage}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            className={`h-full ${progressColor} rounded-full`}
                                        />
                                    </div>

                                    {/* Timeline Info */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-slate-600">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Started</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {project.started_at ? formatDateTime(project.started_at) : 'Not started'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <ClockIcon className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Est. Completion</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {project.estimated_completion ? formatDateTime(project.estimated_completion) : 'TBD'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Milestones */}
                                {milestones.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                            <CheckCircleIcon className="h-5 w-5 mr-2 text-gray-400" />
                                            Milestones
                                        </h3>
                                        <div className="space-y-3">
                                            {milestones.map((milestone) => (
                                                <div
                                                    key={milestone.id}
                                                    className={`p-4 rounded-lg border-2 ${milestone.completed_at
                                                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                                                            : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700/50'
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                {milestone.completed_at && (
                                                                    <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                                )}
                                                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                    {milestone.title}
                                                                </h4>
                                                            </div>
                                                            {milestone.description && (
                                                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                                    {milestone.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {milestone.due_date && (
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                Due: {formatDateTime(milestone.due_date)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Activity Timeline */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <ChatBubbleLeftIcon className="h-5 w-5 mr-2 text-gray-400" />
                                        Activity Timeline
                                    </h3>
                                    <div className="space-y-4">
                                        <AnimatePresence>
                                            {activities.map((activity, index) => {
                                                const activityConfig = getActivityConfig(activity.activity_type);
                                                return (
                                                    <motion.div
                                                        key={activity.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        className="flex gap-4"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-lg">
                                                                {activityConfig.icon}
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-lg p-4 border border-gray-200 dark:border-slate-600">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        {activity.description}
                                                                    </p>
                                                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                                        {activity.profile?.full_name || 'System'} • {getRelativeTime(activity.created_at)}
                                                                    </p>
                                                                </div>
                                                                <span className={`text-xs font-medium ${activityConfig.color}`}>
                                                                    {activityConfig.label}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                        {activities.length === 0 && (
                                            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                                                No activity yet
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50">
                        <button
                            onClick={onClose}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ProjectDetailModal;
