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
        <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-ios-text">Profile Settings</h1>

            <div className="glass-card p-6 md:p-8">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8">
                    {/* Avatar Section */}
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-full overflow-hidden bg-ios-surface-2 ring-4 ring-ios-surface shadow-lg">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <UserCircleIcon className="h-full w-full text-ios-subtext" />
                            )}
                        </div>
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-0 bg-ios-blue p-2 rounded-full text-white cursor-pointer shadow-lg hover:bg-blue-600 transition-colors ring-2 ring-ios-surface"
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
                    <div className="flex-1 w-full space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-ios-subtext mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="text"
                                disabled
                                value={user?.email || ''}
                                className="block w-full rounded-2xl border-ios-border bg-ios-surface-2/50 text-ios-subtext shadow-sm sm:text-sm px-4 py-3 cursor-not-allowed focus:ring-0 focus:border-ios-border"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-ios-text mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="block w-full rounded-2xl border-ios-border bg-ios-surface text-ios-text shadow-sm focus:border-ios-blue focus:ring-ios-blue sm:text-sm px-4 py-3 transition-colors placeholder-ios-subtext/50"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success'
                                ? 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300 border border-green-200 dark:border-green-500/20'
                                : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-300 border border-red-200 dark:border-red-500/20'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <div className="pt-2 flex justify-end">
                            <button
                                onClick={updateProfile}
                                disabled={loading}
                                className="btn-ios-primary"
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
