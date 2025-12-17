import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { Link, Navigate } from 'react-router-dom';
import { ClockIcon, PlusIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const UserDashboard: React.FC = () => {
    const { user, isAdmin } = useAuth();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (isAdmin) {
        return <Navigate to="/admin" replace />;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.email}</p>
                </div>
                <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    New Project
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <ClockIcon className="h-6 w-6 text-gray-400 dark:text-slate-500" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending Projects</dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                        {projects.filter(p => p.status === 'pending').length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <CheckCircleIcon className="h-6 w-6 text-green-400 dark:text-green-500" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Approved Projects</dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                        {projects.filter(p => p.status === 'approved').length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 overflow-hidden shadow rounded-lg transition-colors duration-300">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <XCircleIcon className="h-6 w-6 text-red-400 dark:text-red-500" aria-hidden="true" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Completed Projects</dt>
                                    <dd className="text-lg font-medium text-gray-900 dark:text-white">
                                        {projects.filter(p => p.status === 'completed').length}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects List */}
            <div className="bg-white dark:bg-slate-800 shadow overflow-hidden sm:rounded-md transition-colors duration-300">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-slate-700">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Projects</h3>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-slate-700">
                    {loading ? (
                        <div className="p-10 text-center text-gray-500 dark:text-gray-400">Loading projects...</div>
                    ) : projects.length === 0 ? (
                        <div className="p-10 text-center text-gray-500 dark:text-gray-400">
                            No projects found. Start a new project to get started!
                        </div>
                    ) : (
                        projects.map((project) => (
                            <li key={project.id}>
                                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                                            {project.service_type}
                                        </p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                {project.package_type}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                            <p>
                                                Estimated: {project.estimated_price}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserDashboard;
