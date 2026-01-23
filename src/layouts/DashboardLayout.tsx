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
            <div className={`fixed inset-y-0 left-0 z-50 w-72 glass-panel transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } m-4 rounded-3xl h-[calc(100vh-2rem)] flex flex-col`}>
                <div className="flex flex-col h-full">
                    {/* Brand */}
                    <div className="flex items-center justify-between h-20 px-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-ios-blue p-2.5 rounded-2xl shadow-ios text-white">
                                <SparklesIcon className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-ios-text">
                                OKIKE
                            </span>
                        </div>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Nav Items */}
                    <div className="flex-1 flex flex-col justify-between overflow-y-auto px-4 py-4">
                        <nav className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`group flex items-center px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-200 ${item.current
                                        ? 'bg-ios-blue text-white shadow-ios-hover scale-[1.02]'
                                        : 'text-gray-500 hover:bg-white/50 hover:text-ios-text hover:shadow-sm'
                                        }`}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 transition-colors ${item.current ? 'text-white' : 'text-gray-400 group-hover:text-ios-blue'
                                        }`} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* User Profile Section in Sidebar (Bottom) */}
                        <div className="mt-auto pt-6 border-t border-gray-100/50">
                            <div className="flex items-center px-4 mb-6 p-3 rounded-2xl bg-white/40 border border-white/40">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="ml-3 overflow-hidden">
                                    <p className="text-sm font-semibold text-ios-text truncate">
                                        {user.email}
                                    </p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <span className={`inline-block w-2 w-2 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-green-500'}`}></span>
                                        {isAdmin ? 'Administrator' : 'Client'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Link
                                    to="/"
                                    className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-gray-500 rounded-xl hover:bg-white/60 hover:text-ios-text transition-all group"
                                >
                                    <ArrowLeftIcon className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
                                    Back to Site
                                </Link>

                                <button
                                    onClick={() => signOut()}
                                    className="flex w-full items-center px-4 py-2.5 text-sm font-medium text-red-500 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors group"
                                >
                                    <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 opacity-70 group-hover:opacity-100" />
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-80 flex flex-col min-h-screen transition-all duration-300 bg-ios-bg">
                {/* Top bar - Transparent/Glass */}
                <div className="sticky top-0 z-30 flex-shrink-0 flex h-20 bg-ios-bg/80 backdrop-blur-lg">
                    <button
                        type="button"
                        className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ios-blue lg:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon className="h-6 w-6" />
                    </button>

                    <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <h1 className="text-3xl font-bold text-ios-text capitalize tracking-tight">
                                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
                            </h1>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Theme Toggle - Hidden for iOS Style as it defaults to light clean mode for now, or adapt later */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {theme === 'dark' ? (
                                    <SunIcon className="h-6 w-6" />
                                ) : (
                                    <MoonIcon className="h-6 w-6" />
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <Menu.Button className="relative p-2 rounded-full text-gray-400 hover:text-ios-blue hover:bg-blue-50 transition-colors">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                                    )}
                                </Menu.Button>
                                {/* ... existing menu implementation ... */}
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-3xl bg-white/90 backdrop-blur-xl py-1 shadow-glass ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-y-auto outline-none">
                                        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                                            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={() => markAllAsRead()}
                                                    className="text-xs text-ios-blue font-medium hover:text-blue-600"
                                                >
                                                    Mark all read
                                                </button>
                                            )}
                                        </div>
                                        {/* Notifications rendering logic preserved via ... */}
                                        {notifications.length === 0 ? (
                                            <div className="px-4 py-8 text-center text-sm text-gray-500">
                                                No new notifications
                                            </div>
                                        ) : (
                                            notifications.map((notification) => (
                                                <Menu.Item key={notification.id}>
                                                    {({ active }) => (
                                                        <div
                                                            className={`px-4 py-3 border-b border-gray-50 last:border-0 ${active ? 'bg-gray-50' : ''
                                                                } ${!notification.is_read ? 'bg-blue-50/50' : ''}`}
                                                            onClick={() => markAsRead(notification.id)}
                                                        >
                                                            <p className="text-sm text-gray-900 mb-1">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
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

                <main className="flex-1 py-8 px-4 sm:px-8 lg:px-10 bg-ios-bg">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
