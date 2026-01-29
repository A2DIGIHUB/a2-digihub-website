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
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-orange-600"></div>
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

    const stats = [
        {
            name: 'Total Projects',
            value: projects.length,
            icon: DocumentTextIcon,
            change: '+12%',
            changeType: 'positive',
            color: 'orange'
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
        { name: 'Start New Project', href: '/services', icon: PlusIcon, color: 'orange' },
        { name: 'View All Projects', href: '/dashboard/projects', icon: DocumentTextIcon, color: 'gray' },
        { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon, color: 'gray' },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back, <span className="text-orange-600 dark:text-orange-500">{user?.user_metadata?.first_name || 'Creator'}</span>
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Here's what's happening with your projects today.
                    </p>
                </div>
                <Link
                    to="/services"
                    className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all hover:scale-105"
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
                        className="bg-white dark:bg-gray-950 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-900/50 transition-all duration-200 group"
                    >
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 transition-colors`}>
                                    <stat.icon className={`h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors`} />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                            {stat.name}
                                        </dt>
                                        <dd className="flex items-baseline mt-1">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {stat.value}
                                            </div>
                                            {/* Removed change indicator for cleanliness unless real data is available */}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-orange-50 dark:bg-orange-950/10 rounded-2xl p-8 border border-orange-100 dark:border-orange-900/20">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-500" />
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            to={action.href}
                            className="flex items-center p-4 bg-white dark:bg-gray-950 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 group"
                        >
                            <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-900 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 transition-colors`}>
                                <action.icon className={`h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors`} />
                            </div>
                            <span className="ml-3 text-sm font-bold text-gray-900 dark:text-white">
                                {action.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Projects */}
            <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2 text-orange-600 dark:text-orange-500" />
                        Recent Projects
                    </h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {loading ? (
                        <div className="p-10 text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading projects...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No projects yet</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                                Start your digital transformation journey by creating your first project with us.
                            </p>
                            <Link
                                to="/services"
                                className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                            >
                                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                                Start a Project
                            </Link>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                            {projects.slice(0, 5).map((project) => {
                                const statusConfig = getStatusConfig(project.status);
                                // Override status colors for Clean Minimal consistency if needed, 
                                // but for now assuming getStatusConfig returns Tailwind classes.
                                // We might want to ensure they are orange-compatible or neutral.

                                return (
                                    <li
                                        key={project.id}
                                        onClick={() => handleViewProject(project.id)}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                                    >
                                        <div className="px-6 py-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-4 mb-3">
                                                        <div className="h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center border border-orange-100 dark:border-orange-900/30">
                                                            <DocumentTextIcon className="h-6 w-6 text-orange-600 dark:text-orange-500" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base font-bold text-gray-900 dark:text-white truncate">
                                                                {project.service_type}
                                                            </h4>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                {project.package_type} • {project.estimated_price}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Progress Bar - Minimal */}
                                                    <div className="max-w-md">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                                Progress
                                                            </span>
                                                            <span className="text-xs font-bold text-gray-900 dark:text-white">
                                                                {project.progress_percentage || 0}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                                            <div
                                                                className={`h-full bg-orange-600 rounded-full transition-all duration-500`}
                                                                style={{ width: `${project.progress_percentage || 0}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end gap-3">
                                                    {/* Status Badge */}
                                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full uppercase tracking-wide border ${project.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900' :
                                                            project.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900' :
                                                                'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                                                        }`}>
                                                        {statusConfig.label}
                                                    </span>

                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                                            {new Date(project.created_at).toLocaleDateString()}
                                                        </span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleViewProject(project.id);
                                                            }}
                                                            className="text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
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
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center">
                        <Link
                            to="/dashboard/projects"
                            className="text-sm font-bold text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
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
