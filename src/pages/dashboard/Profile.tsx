import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { UserCircleIcon, CameraIcon } from '@heroicons/react/24/solid';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [fullName, setFullName] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (user) {
            getProfile();
        }
    }, [user]);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('profiles')
                .select('avatar_url, full_name')
                .eq('id', user?.id)
                .single();

            if (error) {
                console.warn(error);
            } else if (data) {
                setAvatarUrl(data.avatar_url);
                setFullName(data.full_name || '');
            }
        } catch (error) {
            console.error('Error loading user data!', error);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async () => {
        try {
            setLoading(true);
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    avatar_url: avatarUrl,
                    updated_at: new Date(),
                })
                .eq('id', user?.id);

            if (error) throw error;
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating profile!' });
        } finally {
            setLoading(false);
        }
    };

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setLoading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];

            // Validate file size (2MB limit for avatars)
            if (file.size > 2 * 1024 * 1024) {
                throw new Error('Avatar file size must be less than 2MB');
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('Please upload an image file');
            }

            const fileExt = file.name.split('.').pop();
            const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                if (uploadError.message.includes('not found')) {
                    throw new Error('Storage bucket not configured. Please run storage_migration.sql in your Supabase project.');
                }
                throw uploadError;
            }

            const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
            setAvatarUrl(data.publicUrl);

            // Auto-save after upload
            const { error: updateError } = await supabase
                .from('profiles')
                .update({
                    avatar_url: data.publicUrl
                })
                .eq('id', user?.id);

            if (updateError) throw updateError;

            setMessage({ type: 'success', text: 'Avatar uploaded successfully!' });

        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error uploading avatar!' });
            console.error('Avatar upload error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>

            <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                    {/* Avatar Section */}
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 ring-4 ring-white dark:ring-slate-700 shadow-lg">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserCircleIcon className="h-full w-full text-gray-300" />
                            )}
                        </div>
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer shadow-lg hover:bg-blue-700 transition-colors"
                        >
                            <CameraIcon className="h-5 w-5" />
                        </label>
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={uploadAvatar}
                            disabled={loading}
                            className="hidden"
                        />
                    </div>

                    {/* Form Section */}
                    <div className="flex-1 w-full space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="text"
                                disabled
                                value={user?.email || ''}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-500 shadow-sm sm:text-sm px-3 py-2 cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300'}`}>
                                {message.text}
                            </div>
                        )}

                        <div className="pt-4 flex justify-end">
                            <button
                                onClick={updateProfile}
                                disabled={loading}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
