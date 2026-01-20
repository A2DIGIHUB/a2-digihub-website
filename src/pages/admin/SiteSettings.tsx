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
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-ios-text">Site Configuration</h1>

            {message && (
                <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success'
                    ? 'bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-300 border border-green-200 dark:border-green-500/20'
                    : 'bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-300 border border-red-200 dark:border-red-500/20'
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* General Info */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-ios-text flex items-center gap-2 mb-6">
                        <GlobeAltIcon className="w-5 h-5 text-ios-blue" /> General Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-ios-subtext mb-1.5">Site Name</label>
                            <input
                                type="text"
                                name="site_name"
                                value={formData.site_name}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border-ios-border bg-ios-surface-2 text-ios-text shadow-sm focus:border-ios-blue focus:ring-ios-blue sm:text-sm px-4 py-2.5 transition-colors placeholder-ios-subtext/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ios-subtext mb-1.5">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={1}
                                className="block w-full rounded-2xl border-ios-border bg-ios-surface-2 text-ios-text shadow-sm focus:border-ios-blue focus:ring-ios-blue sm:text-sm px-4 py-2.5 transition-colors placeholder-ios-subtext/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Theme Configuration */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-ios-text flex items-center gap-2 mb-6">
                        <SwatchIcon className="w-5 h-5 text-purple-500" /> Appearance
                    </h2>
                    <div>
                        <label className="block text-sm font-medium text-ios-subtext mb-1.5">Primary Color</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="color"
                                name="primary_color"
                                value={formData.primary_color || '#2563EB'}
                                onChange={handleChange}
                                className="h-10 w-20 p-1 rounded-lg border border-ios-border bg-ios-surface cursor-pointer"
                            />
                            <span className="text-sm font-medium text-ios-text font-mono">{formData.primary_color}</span>
                        </div>
                        <p className="mt-2 text-xs text-ios-subtext">This will affect buttons, links, and main branding elements.</p>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-ios-text flex items-center gap-2 mb-6">
                        <MapPinIcon className="w-5 h-5 text-green-500" /> Contact Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-ios-subtext flex items-center gap-1 mb-1.5">
                                <EnvelopeIcon className="w-4 h-4" /> Email
                            </label>
                            <input
                                type="email"
                                name="contact_email"
                                value={formData.contact_email}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border-ios-border bg-ios-surface-2 text-ios-text shadow-sm focus:border-ios-blue focus:ring-ios-blue sm:text-sm px-4 py-2.5 transition-colors placeholder-ios-subtext/50"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-ios-subtext flex items-center gap-1 mb-1.5">
                                <PhoneIcon className="w-4 h-4" /> Phone
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border-ios-border bg-ios-surface-2 text-ios-text shadow-sm focus:border-ios-blue focus:ring-ios-blue sm:text-sm px-4 py-2.5 transition-colors placeholder-ios-subtext/50"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-ios-subtext mb-1.5">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="block w-full rounded-2xl border-ios-border bg-ios-surface-2 text-ios-text shadow-sm focus:border-ios-blue focus:ring-ios-blue sm:text-sm px-4 py-2.5 transition-colors placeholder-ios-subtext/50"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="glass-card p-6">
                    <h2 className="text-lg font-semibold text-ios-text mb-6">Social Media</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                            <div key={social}>
                                <label className="block text-sm font-medium text-ios-subtext capitalize mb-1.5">{social} URL</label>
                                <input
                                    type="text"
                                    name={`social_${social}`}
                                    value={formData.social_links?.[social as keyof typeof formData.social_links] || ''}
                                    onChange={handleChange}
                                    placeholder={`https://${social}.com/...`}
                                    className="block w-full rounded-2xl border-ios-border bg-ios-surface-2 text-ios-text shadow-sm focus:border-ios-blue focus:ring-ios-blue sm:text-sm px-4 py-2.5 transition-colors placeholder-ios-subtext/50"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4 sticky bottom-6 z-10">
                    <button
                        type="submit"
                        disabled={saving}
                        className="btn-ios-primary shadow-lg shadow-blue-500/20"
                    >
                        {saving ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SiteSettings;
