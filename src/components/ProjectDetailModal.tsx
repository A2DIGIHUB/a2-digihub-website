import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import {
    XMarkIcon,
    ClockIcon,
    CalendarIcon,
    ChatBubbleLeftIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
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
    const { user, isAdmin } = useAuth();
    const [project, setProject] = useState<EnhancedQuote | null>(null);
    const [activities, setActivities] = useState<ProjectActivity[]>([]);
    const [milestones, setMilestones] = useState<ProjectMilestone[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'messages'>('overview');
    const [newMessage, setNewMessage] = useState('');
    const [sendingMessage, setSendingMessage] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [messages, setMessages] = useState<any[]>([]); // New messages state


    useEffect(() => {
        if (isOpen && projectId) {
            fetchProjectDetails();
        }
    }, [isOpen, projectId]);

    const fetchProjectDetails = async () => {
        setLoading(true);
        console.log('Fetching details for project:', projectId);
        try {
            // Fetch project
            const { data: projectData, error: projectError } = await supabase
                .from('quotes')
                .select('*, profiles:user_id(full_name, avatar_url, phone, email)')
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

            // Fetch messages (NEW)
            const { data: messagesData, error: messagesError } = await supabase
                .from('project_messages')
                .select('*, sender:sender_id(full_name, email, avatar_url)')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false });

            if (messagesError) throw messagesError;

            // Fetch milestones
            const { data: milestonesData, error: milestonesError } = await supabase
                .from('project_milestones')
                .select('*')
                .eq('quote_id', projectId)
                .order('order_index', { ascending: true });

            if (milestonesError) throw milestonesError;

            setProject(projectData);
            setActivities(activitiesData || []);
            setMessages(messagesData || []);
            setMilestones(milestonesData || []);
        } catch (error) {
            console.error('Error fetching project details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        if (!project || !isAdmin) return;
        setUpdatingStatus(true);
        try {
            const { error } = await supabase
                .from('quotes')
                .update({ status: newStatus })
                .eq('id', project.id);

            if (error) throw error;

            // Refresh local data
            setProject({ ...project, status: newStatus as any });

            // Add system activity
            await supabase.from('project_activities').insert({
                quote_id: project.id,
                activity_type: 'status_change',
                description: `Status updated to ${newStatus}`,
                created_by: user?.id
            });

            alert('Status updated successfully');
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setSendingMessage(true);
        try {
            const { error } = await supabase
                .from('project_messages') // Sending to NEW TABLE
                .insert({
                    project_id: projectId,
                    content: newMessage, // Schema uses 'content', not 'description'
                    sender_id: user?.id
                });

            if (error) throw error;
            setNewMessage('');
            fetchProjectDetails(); // Refresh activities
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        } finally {
            setSendingMessage(false);
        }
    };

    const statusConfig = project ? getStatusConfig(project.status) : null;
    const progressColor = project ? getProgressColor(project.progress_percentage) : '';
    const tabClass = (isActive: boolean) =>
        `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
            : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700'
        }`;

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
                <Dialog.Panel className="w-full max-w-4xl rounded-2xl bg-white dark:bg-slate-800 shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                {project ? (
                                    <>
                                        <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white">
                                            {project.service_type}
                                        </Dialog.Title>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            {project.package_type} • {project.estimated_price}
                                        </p>

                                        {/* User Details */}
                                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            {project.profiles && (
                                                <>
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-900 dark:text-white mr-2">Client:</span>
                                                        {project.profiles.full_name || 'Unknown'}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-900 dark:text-white mr-2">Email:</span>
                                                        {project.profiles.email || 'N/A'}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <span className="font-medium text-gray-900 dark:text-white mr-2">Phone:</span>
                                                        {project.profiles.phone || 'N/A'}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Admin Status Control */}
                                        {isAdmin && (
                                            <div className="mt-4 flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
                                                <select
                                                    value={project.status}
                                                    onChange={(e) => handleStatusChange(e.target.value)}
                                                    disabled={updatingStatus}
                                                    className="text-sm rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-700 py-1 pl-2 pr-8"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="approved">Approved (In Progress)</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                                {updatingStatus && <span className="text-xs text-blue-500 animate-pulse">Updating...</span>}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="h-10 w-48 bg-gray-200 dark:bg-slate-700 animate-pulse rounded" />
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <XMarkIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={tabClass(activeTab === 'overview')}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('milestones')}
                                className={tabClass(activeTab === 'milestones')}
                            >
                                Milestones
                            </button>
                            <button
                                onClick={() => setActiveTab('messages')}
                                className={tabClass(activeTab === 'messages')}
                            >
                                Messages
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            </div>
                        ) : project && statusConfig ? (
                            <>
                                {activeTab === 'overview' && (
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

                                        {/* Activity Timeline */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                                <ChatBubbleLeftIcon className="h-5 w-5 mr-2 text-gray-400" />
                                                Recent Activity
                                            </h3>
                                            <div className="space-y-4">
                                                {activities.slice(0, 5).map((activity, index) => {
                                                    const activityConfig = getActivityConfig(activity.activity_type);
                                                    return (
                                                        <div key={activity.id} className="flex gap-4">
                                                            <div className="flex-shrink-0">
                                                                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-lg">
                                                                    {activityConfig.icon}
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 bg-white dark:bg-slate-700/50 rounded-lg p-4 border border-gray-200 dark:border-slate-600">
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                                                                    {activity.description}
                                                                </p>
                                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                                    {activity.profile?.full_name || 'System'} • {getRelativeTime(activity.created_at)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'milestones' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Milestones</h3>
                                            <span className="text-sm text-gray-500">{milestones.filter(m => m.completed_at).length} / {milestones.length} Completed</span>
                                        </div>
                                        {milestones.length > 0 ? (
                                            <div className="space-y-3">
                                                {milestones.map((milestone) => (
                                                    <motion.div
                                                        key={milestone.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className={`p-4 rounded-lg border-2 transition-all ${milestone.completed_at
                                                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                                                            : 'border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700/50'
                                                            }`}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    {milestone.completed_at ? (
                                                                        <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                                                                    ) : (
                                                                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                                                                    )}
                                                                    <h4 className={`font-semibold ${milestone.completed_at ? 'text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'}`}>
                                                                        {milestone.title}
                                                                    </h4>
                                                                </div>
                                                                {milestone.description && (
                                                                    <p className="mt-2 ml-8 text-sm text-gray-600 dark:text-gray-400">
                                                                        {milestone.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            {milestone.due_date && (
                                                                <span className={`text-xs font-medium px-2 py-1 rounded ${milestone.completed_at
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-gray-100 text-gray-600'
                                                                    }`}>
                                                                    Due: {formatDateTime(milestone.due_date)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                                <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No milestones yet</h3>
                                                <p className="mt-1 text-sm text-gray-500">Project timeline will appear here once established.</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'messages' && (
                                    <div className="flex flex-col h-[500px]">
                                        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                                            {messages.length > 0 ? (
                                                messages.map((message) => {
                                                    const isMe = message.sender_id === user?.id; // Check if current user sent it
                                                    return (
                                                        <div key={message.id} className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                            <div className={`max-w-[80%] rounded-2xl p-4 ${isMe
                                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                                : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-tl-none'
                                                                }`}>
                                                                <p className="text-sm">{message.content}</p>
                                                                <p className={`text-xs mt-1 opacity-70 ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
                                                                    {message.sender?.full_name} • {getRelativeTime(message.created_at)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <div className="text-center py-12 text-gray-500">
                                                    No messages yet. Start the conversation!
                                                </div>
                                            )}
                                        </div>
                                        <form onSubmit={handleSendMessage} className="mt-auto pt-4 border-t border-gray-200 dark:border-slate-700">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    placeholder="Type your message..."
                                                    className="flex-1 rounded-lg border-gray-300 dark:border-slate-600 dark:bg-slate-700 focus:ring-blue-500 focus:border-blue-500"
                                                    disabled={sendingMessage}
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={sendingMessage || !newMessage.trim()}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                                >
                                                    {sendingMessage ? 'Sending...' : 'Send'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12 text-gray-500">Project data not found.</div>
                        )}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ProjectDetailModal;
