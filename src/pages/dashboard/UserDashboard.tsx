import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Link, Navigate } from 'react-router-dom';
import {
    ClockIcon,
    PlusIcon,
    CheckCircleIcon,
    XCircleIcon,
    ChartBarIcon,
    DocumentTextIcon,
    ArrowTrendingUpIcon,
    CalendarIcon,
    SparklesIcon,
    EyeIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import ProjectDetailModal from '../../components/ProjectDetailModal';
import { EnhancedQuote, getStatusConfig, getProgressColor } from '../../lib/projectStatus';

const UserDashboard: React.FC = () => {
    const { user, isAdmin, loading: authLoading } = useAuth();
    const [projects, setProjects] = useState<EnhancedQuote[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('quotes')
                .select('*')
                .eq('user_id', user?.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchProjects();
        }
    }, [user]);

    if (authLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    const handleViewProject = (projectId: string) => {
        setSelectedProjectId(projectId);
        setIsModalOpen(true);
    };

    const getStatusColor = (status: string) => {
        const config = getStatusConfig(status as any);
        return `${config.bgColor} ${config.darkBgColor} ${config.color}`;
    };

    const stats = [
        {
            name: 'Total Projects',
            value: projects.length,
            icon: DocumentTextIcon,
            change: '+12%',
            changeType: 'positive',
            color: 'blue'
        },
        {
            name: 'In Progress',
            value: projects.filter(p => p.status === 'approved').length,
            icon: ClockIcon,
            change: '+4.75%',
            changeType: 'positive',
            color: 'yellow'
        },
        {
            name: 'Completed',
            value: projects.filter(p => p.status === 'completed').length,
            icon: CheckCircleIcon,
            change: '+54.02%',
            changeType: 'positive',
            color: 'green'
        },
        {
            name: 'Success Rate',
            value: projects.length > 0 ? `${Math.round((projects.filter(p => p.status === 'completed').length / projects.length) * 100)}%` : '0%',
            icon: ChartBarIcon,
            change: '+2.5%',
            changeType: 'positive',
            color: 'purple'
        }
    ];

    const quickActions = [
        { name: 'Start New Project', href: '/services', icon: PlusIcon, color: 'blue' },
        { name: 'View All Projects', href: '/dashboard/projects', icon: DocumentTextIcon, color: 'purple' },
        { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon, color: 'green' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Here's what's happening with your projects today.
                    </p>
                </div>
                <Link
                    to="/services"
                    className="inline-flex items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    New Project
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-slate-800 overflow-hidden shadow-sm rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all duration-200"
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                                    <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            {stat.name}
                                        </dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                                                {stat.value}
                                            </div>
                                            <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                                <ArrowTrendingUpIcon className="self-center flex-shrink-0 h-4 w-4" />
                                                <span className="ml-1">{stat.change}</span>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 rounded-xl p-6 border border-blue-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            to={action.href}
                            className="flex items-center p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-slate-600 group"
                        >
                            <div className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/20 group-hover:scale-110 transition-transform`}>
                                <action.icon className={`h-5 w-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                                {action.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                        Recent Projects
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Track the status of your latest project requests
                    </p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-slate-700">
                    {loading ? (
                        <div className="p-10 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading projects...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="p-10 text-center">
                            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects yet</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Get started by creating your first project.
                            </p>
                            <div className="mt-6">
                                <Link
                                    to="/services"
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                    New Project
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100 dark:divide-slate-700">
                            {projects.slice(0, 5).map((project) => {
                                const statusConfig = getStatusConfig(project.status);
                                const progressColor = getProgressColor(project.progress_percentage || 0);

                                return (
                                    <li
                                        key={project.id}
                                        onClick={() => handleViewProject(project.id)}
                                        className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                                    >
                                        <div className="px-6 py-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="flex-shrink-0">
                                                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                                <DocumentTextIcon className="h-5 w-5 text-white" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                                {project.service_type}
                                                            </p>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {project.package_type} • {project.estimated_price}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="mb-2">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                                Progress
                                                            </span>
                                                            <span className="text-xs font-semibold text-gray-900 dark:text-white">
                                                                {project.progress_percentage || 0}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
                                                            <div
                                                                className={`h-full ${progressColor} transition-all duration-500`}
                                                                style={{ width: `${project.progress_percentage || 0}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end gap-2">
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig.bgColor} ${statusConfig.darkBgColor} ${statusConfig.color}`}>
                                                        {statusConfig.label}
                                                    </span>
                                                    <button
                                                        onClick={() => handleViewProject(project.id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                                                    >
                                                        <EyeIcon className="h-4 w-4" />
                                                        View Details
                                                    </button>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(project.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                {projects.length > 5 && (
                    <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                        <Link
                            to="/dashboard/projects"
                            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                            View all {projects.length} projects →
                        </Link>
                    </div>
                )}
            </div>

            {/* Project Detail Modal */}
            {selectedProjectId && (
                <ProjectDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    projectId={selectedProjectId}
                />
            )}
        </div>
    );
};

export default UserDashboard;
