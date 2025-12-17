import React, { useState, useEffect } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { SwatchIcon, GlobeAltIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const SiteSettings: React.FC = () => {
    const { isAdmin, loading: authLoading } = useAuth();
    const { settings, updateSettings, loading: contentLoading } = useContent();
    const [formData, setFormData] = useState({ ...settings });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Sync form data when settings load
    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('social_')) {
            const socialKey = name.replace('social_', '');
            setFormData(prev => ({
                ...prev,
                social_links: {
                    ...prev.social_links,
                    [socialKey]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            await updateSettings(formData);
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Failed to update settings.' });
        } finally {
            setSaving(false);
        }
    };

    if (authLoading || contentLoading) return <div>Loading...</div>;
    if (!isAdmin) return <Navigate to="/dashboard" replace />;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Configuration</h1>

            {message && (
                <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* General Info */}
                <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <GlobeAltIcon className="w-5 h-5 text-blue-500" /> General Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Site Name</label>
                            <input
                                type="text"
                                name="site_name"
                                value={formData.site_name}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={1}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 px-3 py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Theme Configuration */}
                <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <SwatchIcon className="w-5 h-5 text-purple-500" /> Appearance
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Primary Color</label>
                        <div className="mt-1 flex items-center gap-3">
                            <input
                                type="color"
                                name="primary_color"
                                value={formData.primary_color || '#2563EB'}
                                onChange={handleChange}
                                className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer"
                            />
                            <span className="text-sm text-gray-500">{formData.primary_color}</span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">This will affect buttons, links, and main branding elements.</p>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <MapPinIcon className="w-5 h-5 text-green-500" /> Contact Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                <EnvelopeIcon className="w-4 h-4" /> Email
                            </label>
                            <input
                                type="email"
                                name="contact_email"
                                value={formData.contact_email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 px-3 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                <PhoneIcon className="w-4 h-4" /> Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 px-3 py-2"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 px-3 py-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-6 space-y-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Social Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                            <div key={social}>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{social} URL</label>
                                <input
                                    type="text"
                                    name={`social_${social}`}
                                    value={formData.social_links?.[social as keyof typeof formData.social_links] || ''}
                                    onChange={handleChange}
                                    placeholder={`https://${social}.com/...`}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-slate-600 dark:bg-slate-700 px-3 py-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSettings;
