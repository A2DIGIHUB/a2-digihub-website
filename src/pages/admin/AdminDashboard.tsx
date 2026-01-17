import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import {
    UsersIcon,
    DocumentTextIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    SparklesIcon,
    CogIcon,
    FolderIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
    const { isAdmin, loading: authLoading } = useAuth();
    const [quotes, setQuotes] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAdmin) {
            fetchData();
        }
    }, [isAdmin]);

    const fetchData = async () => {
        try {
            const [quotesRes, usersRes] = await Promise.all([
                supabase
                    .from('quotes')
                    .select(`
                        *,
                        profiles:user_id (full_name, phone)
                    `)
                    .order('created_at', { ascending: false }),
                supabase
                    .from('profiles')
                    .select('*')
                    .order('created_at', { ascending: false })
            ]);

            if (quotesRes.error) throw quotesRes.error;
            if (usersRes.error) throw usersRes.error;

            setQuotes(quotesRes.data || []);
            setUsers(usersRes.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('quotes')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus } : q));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    if (authLoading) return <div>Loading...</div>;
    if (!isAdmin) return <Navigate to="/dashboard" replace />;

    const stats = [
        {
            name: 'Total Users',
            value: users.length,
            icon: UsersIcon,
            change: '+12.5%',
            changeType: 'positive',
            color: 'blue'
        },
        {
            name: 'Total Requests',
            value: quotes.length,
            icon: DocumentTextIcon,
            change: '+8.2%',
            changeType: 'positive',
            color: 'purple'
        },
        {
            name: 'Pending Review',
            value: quotes.filter(q => q.status === 'pending').length,
            icon: ClockIcon,
            change: '-3.1%',
            changeType: 'negative',
            color: 'yellow'
        },
        {
            name: 'Approved',
            value: quotes.filter(q => q.status === 'approved').length,
            icon: CheckCircleIcon,
            change: '+15.3%',
            changeType: 'positive',
            color: 'green'
        }
    ];

    const quickActions = [
        { name: 'Manage Users', href: '/admin/users', icon: UsersIcon, color: 'blue' },
        { name: 'View Requests', href: '/admin/projects', icon: FolderIcon, color: 'purple' },
        { name: 'CMS Content', href: '/admin/content', icon: DocumentTextIcon, color: 'green' },
        { name: 'Site Settings', href: '/admin/settings', icon: CogIcon, color: 'orange' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Overview</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Monitor and manage your platform activity
                    </p>
                </div>
                <Link
                    to="/admin/content"
                    className="inline-flex items-center px-4 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                >
                    <SparklesIcon className="-ml-1 mr-2 h-5 w-5" />
                    Manage Content
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
                                                <ArrowTrendingUpIcon className={`self-center flex-shrink-0 h-4 w-4 ${stat.changeType === 'negative' ? 'rotate-180' : ''}`} />
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
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 rounded-xl p-6 border border-purple-100 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Requests */}
                <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <DocumentTextIcon className="h-5 w-5 mr-2 text-gray-400" />
                            Recent Requests
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Latest project submissions
                        </p>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="p-6 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                            </div>
                        ) : quotes.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                                No requests yet
                            </div>
                        ) : (
                            quotes.slice(0, 5).map((quote) => (
                                <div key={quote.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                {quote.profiles?.full_name || 'Unknown User'}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {quote.profiles?.phone || 'No contact info'}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                                {quote.service_type} • {quote.estimated_price}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${quote.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                            quote.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                            }`}>
                                            {quote.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {quotes.length > 5 && (
                        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                            <Link
                                to="/admin/projects"
                                className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                            >
                                View all {quotes.length} requests →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Recent Users */}
                <div className="bg-white dark:bg-slate-800 shadow-sm rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <UsersIcon className="h-5 w-5 mr-2 text-gray-400" />
                            Recent Users
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Newest platform members
                        </p>
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-slate-700 max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="p-6 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                                No users yet
                            </div>
                        ) : (
                            users.slice(0, 5).map((user) => (
                                <div key={user.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {user.avatar_url ? (
                                                <img className="h-10 w-10 rounded-full object-cover" src={user.avatar_url} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                    <span className="text-white font-semibold text-sm">
                                                        {user.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {user.full_name || 'Unnamed'}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {user.email}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                            'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                            }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {users.length > 5 && (
                        <div className="px-6 py-4 bg-gray-50 dark:bg-slate-700/50 border-t border-gray-100 dark:border-slate-700">
                            <Link
                                to="/admin/users"
                                className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                            >
                                View all {users.length} users →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
