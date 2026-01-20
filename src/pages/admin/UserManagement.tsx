import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const UserManagement: React.FC = () => {
    const { isAdmin, loading: authLoading } = useAuth();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAdmin) {
            fetchAllUsers();
        }
    }, [isAdmin]);

    const fetchAllUsers = async () => {
        try {
            // Note: In a real Supabase app, accessing auth.users directly from client is restricted.
            // We usually query the 'profiles' table which is public/readable.
            // Functionality to "Ban" or "Delete" users usually requires a Supabase Edge Function
            // or a backend service with service_role key.
            // Here, we maintain the "Profiles" view as the user management source.

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setUsers(data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return <div>Loading...</div>;
    if (!isAdmin) return <Navigate to="/dashboard" replace />;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-ios-text">User Management</h1>

            <div className="glass-panel overflow-hidden sm:rounded-3xl">
                <div className="px-6 py-5 border-b border-ios-border">
                    <h3 className="text-xl font-semibold text-ios-text">Registered Users</h3>
                    <p className="mt-1 max-w-2xl text-sm text-ios-subtext">View all platform users.</p>
                </div>
                <div>
                    <table className="min-w-full divide-y divide-ios-border">
                        <thead className="bg-ios-surface/50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-ios-subtext uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-ios-subtext uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-ios-subtext uppercase tracking-wider">
                                    Joined
                                </th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-ios-subtext uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-ios-border bg-transparent">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-ios-subtext">Loading...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-ios-subtext">No users found.</td>
                                </tr>
                            ) : users.map((user) => (
                                <tr key={user.id} className="hover:bg-ios-blue/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {user.avatar_url ? (
                                                    <img className="h-10 w-10 rounded-full object-cover border border-ios-border" src={user.avatar_url} alt="" />
                                                ) : (
                                                    <span className="h-10 w-10 rounded-full bg-ios-surface border border-ios-border flex items-center justify-center font-bold text-ios-subtext">
                                                        {user.email?.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-ios-text">{user.full_name || 'Unnamed'}</div>
                                                <div className="text-sm text-ios-subtext">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border ${user.role === 'admin'
                                            ? 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20'
                                            : 'bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/20'
                                            }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-ios-subtext">
                                        {new Date(user.updated_at || new Date()).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-ios-blue hover:text-blue-400 disabled:opacity-50 cursor-not-allowed transition-colors" title="Requires Backend API">Edit</button>
                                        <span className="mx-2 text-ios-border">|</span>
                                        <button className="text-red-600 hover:text-red-400 disabled:opacity-50 cursor-not-allowed transition-colors" title="Requires Backend API">Ban</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
