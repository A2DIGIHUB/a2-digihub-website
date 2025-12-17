import React, { useState, useEffect } from 'react';
import {
    UserPlusIcon,
    EnvelopeIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface TeamMember {
    id: string;
    full_name: string;
    email: string;
    role: string;
    created_at: string;
    avatar_url?: string;
}

const Team: React.FC = () => {
    const { user } = useAuth();
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [loading, setLoading] = useState(true);

    // NOTE: In a real app, "Team" would imply Organization ID.
    // For this MVP, we will list ALL users if Admin, 
    // OR for client, we'll just mock a "My Colleagues" list if we had a team table.
    // Since we don't have orgs yet, let's make this page:
    // 1. For Admins: List all users (User Management Lite)
    // 2. For Clients: Show a "Coming Soon" or simple Invite UI that just sends an email (mock).

    // Actually, let's piggyback on the "Admin User Management" requirement. 
    // We'll make this page the "Team/User Management" page.

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            // Fetch profiles. RLS usually restricts this to own profile. 
            // If Admin, RLS should allow all.
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMembers(data || []);
        } catch (error) {
            console.error('Error fetching members:', error);
        } finally {
            setLoading(false);
        }
    };

    const inviteMember = async () => {
        // Mock invitation for now unless we set up Edge Functions
        alert(`Invitation sent to ${inviteEmail} (Simulation)`);
        setShowInviteModal(false);
        setInviteEmail('');
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
            default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Team & Users</h1>
                    <p className="text-gray-500 dark:text-gray-400"> collaboratively manage your projects</p>
                </div>
                <button
                    onClick={() => setShowInviteModal(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <UserPlusIcon className="w-5 h-5 mr-2" />
                    Invite Member
                </button>
            </div>

            {/* Members List */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
                        <thead className="bg-gray-50 dark:bg-slate-900/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Member
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Joined
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                            {loading ? (
                                <tr><td colSpan={4} className="p-4 text-center">Loading users...</td></tr>
                            ) : members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                {member.avatar_url ? (
                                                    <img className="h-10 w-10 rounded-full object-cover" src={member.avatar_url} alt="" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                                                        {member.email?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{member.full_name || 'Unnamed User'}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(member.role)}`}>
                                            {member.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(member.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mx-2">
                                            <EnvelopeIcon className="w-5 h-5" />
                                        </button>
                                        <button className="text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Invite New Member</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="colleague@company.com"
                                />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={inviteMember}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Send Invite
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Team;
