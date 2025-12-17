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
                .order('created_at', { ascending: false });

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
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Registered Users</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">View all platform users.</p>
                </div>
                <div className="border-t border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">Loading...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center">No users found.</td>
                                </tr>
                            ) : users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {user.avatar_url ? (
                                                    <img className="h-10 w-10 rounded-full object-cover" src={user.avatar_url} alt="" />
                                                ) : (
                                                    <span className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                                        {user.email?.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.full_name || 'Unnamed'}</div>
                                                <div className="text-sm text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                                            }`}>
                                            {user.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50 cursor-not-allowed" title="Requires Backend API">Edit</button>
                                        <span className="mx-2 text-gray-300">|</span>
                                        <button className="text-red-600 hover:text-red-900 disabled:opacity-50 cursor-not-allowed" title="Requires Backend API">Ban</button>
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
