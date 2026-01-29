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
    const { user, isAdmin, loading: authLoading } = useAuth();
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
                    .order('updated_at', { ascending: false })
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
        { name: 'Partners', href: '/admin/partners', icon: UsersIcon, color: 'pink' },
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
                        className="glass-card overflow-hidden"
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 p-3 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-500/20`}>
                                    <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-ios-subtext truncate">
                                            {stat.name}
                                        </dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-bold text-ios-text">
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
            <div className="glass-panel rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-ios-text mb-4 flex items-center">
                    <ChartBarIcon className="h-5 w-5 mr-2 text-ios-blue" />
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            to={action.href}
                            className="flex items-center p-4 bg-ios-surface/50 border border-ios-border rounded-2xl hover:bg-ios-blue/5 hover:border-ios-blue/30 transition-all group"
                        >
                            <div className={`p-2 rounded-xl bg-${action.color}-100 dark:bg-${action.color}-500/20 group-hover:scale-110 transition-transform`}>
                                <action.icon className={`h-5 w-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                            </div>
                            <span className="ml-3 text-sm font-medium text-ios-text">
                                {action.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Requests */}
                <div className="glass-card overflow-hidden">
                    <div className="px-6 py-5 border-b border-ios-border">
                        <h3 className="text-lg font-semibold text-ios-text flex items-center">
                            <DocumentTextIcon className="h-5 w-5 mr-2 text-ios-subtext" />
                            Recent Requests
                        </h3>
                        <p className="mt-1 text-sm text-ios-subtext">
                            Latest project submissions
                        </p>
                    </div>
                    <div className="divide-y divide-ios-border max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="p-6 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ios-blue mx-auto"></div>
                            </div>
                        ) : quotes.length === 0 ? (
                            <div className="p-6 text-center text-ios-subtext">
                                No requests yet
                            </div>
                        ) : (
                            quotes.slice(0, 5).map((quote) => (
                                <div key={quote.id} className="px-6 py-4 hover:bg-ios-blue/5 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-ios-text truncate">
                                                {quote.profiles?.full_name || 'Unknown User'}
                                            </p>
                                            <p className="text-xs text-ios-subtext">
                                                {quote.profiles?.phone || 'No contact info'}
                                            </p>
                                            <p className="text-sm text-ios-subtext mt-1">
                                                {quote.service_type} • {quote.estimated_price}
                                            </p>
                                        </div>
                                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${quote.status === 'approved'
                                            ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/20'
                                            : quote.status === 'rejected'
                                                ? 'bg-red-100 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20'
                                                : 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/20'
                                            }`}>
                                            {quote.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {quotes.length > 5 && (
                        <div className="px-6 py-4 bg-ios-surface/50 border-t border-ios-border">
                            <Link
                                to="/admin/projects"
                                className="text-sm font-medium text-ios-blue hover:text-blue-400"
                            >
                                View all {quotes.length} requests →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Recent Users */}
                <div className="glass-card overflow-hidden">
                    <div className="px-6 py-5 border-b border-ios-border">
                        <h3 className="text-lg font-semibold text-ios-text flex items-center">
                            <UsersIcon className="h-5 w-5 mr-2 text-ios-subtext" />
                            Recent Users
                        </h3>
                        <p className="mt-1 text-sm text-ios-subtext">
                            Newest platform members
                        </p>
                    </div>
                    <div className="divide-y divide-ios-border max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="p-6 text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ios-blue mx-auto"></div>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="p-6 text-center text-ios-subtext">
                                No users yet
                            </div>
                        ) : (
                            users.slice(0, 5).map((user) => (
                                <div key={user.id} className="px-6 py-4 hover:bg-ios-blue/5 transition-colors">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            {user.avatar_url ? (
                                                <img className="h-10 w-10 rounded-full object-cover border border-ios-border" src={user.avatar_url} alt="" />
                                            ) : (
                                                <div className="h-10 w-10 rounded-full bg-ios-surface border border-ios-border flex items-center justify-center">
                                                    <span className="text-ios-subtext font-semibold text-sm">
                                                        {user.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <p className="text-sm font-semibold text-ios-text">
                                                {user.full_name || 'Unnamed'}
                                            </p>
                                            <p className="text-sm text-ios-subtext">
                                                {user.email}
                                            </p>
                                        </div>
                                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20'
                                            : 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20'
                                            }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    {users.length > 5 && (
                        <div className="px-6 py-4 bg-ios-surface/50 border-t border-ios-border">
                            <Link
                                to="/admin/users"
                                className="text-sm font-medium text-ios-blue hover:text-blue-400"
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
