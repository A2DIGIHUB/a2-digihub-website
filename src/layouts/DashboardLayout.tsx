import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    HomeIcon,
    UserCircleIcon,
    DocumentTextIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ArrowLeftIcon,
    SparklesIcon,
    SunIcon,
    MoonIcon,
    BellIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    UserGroupIcon,
    SwatchIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';
import { useNotifications } from '../contexts/NotificationsContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const DashboardLayout: React.FC = () => {
    const { user, loading, signOut, isAdmin } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const userNavigation = [
        { name: 'Overview', href: '/dashboard', icon: HomeIcon, current: location.pathname === '/dashboard' },
        { name: 'My Projects', href: '/dashboard/projects', icon: ClipboardDocumentListIcon, current: location.pathname === '/dashboard/projects' },
        { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon, current: location.pathname === '/dashboard/analytics' },
        { name: 'Team', href: '/dashboard/team', icon: UserGroupIcon, current: location.pathname === '/dashboard/team' },
        { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon, current: location.pathname === '/dashboard/profile' },
    ];

    const adminNavigation = [
        { name: 'Admin Overview', href: '/admin', icon: HomeIcon, current: location.pathname === '/admin' },
        { name: 'Project Requests', href: '/admin/projects', icon: SparklesIcon, current: location.pathname === '/admin/projects' },
        { name: 'User Management', href: '/admin/users', icon: UserGroupIcon, current: location.pathname === '/admin/users' },
        { name: 'CMS Content', href: '/admin/content', icon: DocumentTextIcon, current: location.pathname === '/admin/content' },
        { name: 'Site Configuration', href: '/admin/settings', icon: SwatchIcon, current: location.pathname === '/admin/settings' },
        { name: 'My Profile', href: '/dashboard/profile', icon: UserCircleIcon, current: location.pathname === '/dashboard/profile' },
    ];

    const navigation = isAdmin ? adminNavigation : userNavigation;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans transition-colors duration-300">
            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar navigation */}
            <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex flex-col h-full">
                    {/* Brand */}
                    <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/50">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg">
                                <SparklesIcon className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                A2-DIGIHUB
                            </span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <div className="flex-1 flex flex-col justify-between overflow-y-auto px-4 py-8">
                        <nav className="space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ${item.current
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 dark:shadow-indigo-500/20'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 transition-colors ${item.current ? 'text-white' : 'text-slate-500 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                        }`} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* User Profile Section in Sidebar (Bottom) */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-6">
                            <div className="flex items-center px-4 mb-6">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-slate-200 dark:ring-slate-800">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                                        {user.email}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                        <span className={`inline-block w-2 w-2 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-emerald-500'}`}></span>
                                        {isAdmin ? 'Administrator' : 'Client Account'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Link
                                    to="/"
                                    className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors group"
                                >
                                    <ArrowLeftIcon className="mr-3 h-5 w-5 text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-white" />
                                    Back to Site
                                </Link>

                                <button
                                    onClick={() => signOut()}
                                    className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-300 transition-colors group"
                                >
                                    <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-red-500 dark:text-red-500/70 group-hover:text-red-600 dark:group-hover:text-red-400" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
                {/* Top bar */}
                <div className="sticky top-0 z-30 flex-shrink-0 flex h-16 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">
                    <button
                        type="button"
                        className="px-4 border-r border-slate-200 dark:border-slate-800 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-slate-800 dark:text-white capitalize">
                                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'dark' ? (
                                    <SunIcon className="h-6 w-6" />
                                ) : (
                                    <MoonIcon className="h-6 w-6" />
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <Menu.Button className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                                    )}
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-y-auto">
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={() => markAllAsRead()}
                                                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-500"
                                                >
                                                    Mark all read
                                                </button>
                                            )}
                                        </div>
                                        {notifications.length === 0 ? (
                                            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                                No notifications
                                            </div>
                                        ) : (
                                            notifications.map((notification) => (
                                                <Menu.Item key={notification.id}>
                                                    {({ active }) => (
                                                        <div
                                                            className={`px-4 py-3 border-b border-gray-50 dark:border-slate-700/50 last:border-0 ${active ? 'bg-gray-50 dark:bg-slate-700/50' : ''
                                                                } ${!notification.is_read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                                                            onClick={() => markAsRead(notification.id)}
                                                        >
                                                            <p className="text-sm text-gray-900 dark:text-white mb-1">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {new Date(notification.created_at).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            ))
                                        )}
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>

                <main className="flex-1 py-8 px-4 sm:px-8 lg:px-10 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
