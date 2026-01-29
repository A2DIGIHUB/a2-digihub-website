import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import {
    PlusIcon,
    TrashIcon,
    PencilIcon,
    PhotoIcon,
    LinkIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';

interface Partner {
    id: string;
    name: string;
    logo_url: string;
    website_url: string;
    active: boolean;
    created_at: string;
}

const AdminPartners: React.FC = () => {
    const { user, isAdmin } = useAuth();
    const [partners, setPartners] = useState<Partner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        website_url: '',
        logo_file: null as File | null
    });

    useEffect(() => {
        if (isAdmin) {
            fetchPartners();
        }
    }, [isAdmin]);

    const fetchPartners = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('partners')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPartners(data || []);
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, logo_file: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.logo_file) {
            alert('Please upload a logo');
            return;
        }

        try {
            setUploading(true);
            const file = formData.logo_file;
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload Image
            const { error: uploadError } = await supabase.storage
                .from('partners')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('partners')
                .getPublicUrl(filePath);

            // Save to DB
            const { error: dbError } = await supabase
                .from('partners')
                .insert({
                    name: formData.name,
                    website_url: formData.website_url,
                    logo_url: publicUrl,
                    active: true
                });

            if (dbError) throw dbError;

            setShowModal(false);
            setFormData({ name: '', website_url: '', logo_file: null });
            fetchPartners();
        } catch (error) {
            console.error('Error adding partner:', error);
            alert('Failed to add partner');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, logoUrl: string) => {
        if (!window.confirm('Are you sure you want to delete this partner?')) return;

        try {
            // Delete from DB
            const { error: dbError } = await supabase
                .from('partners')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;

            // Ideally delete from storage too, but parsing the path from URL is needed.
            // We skip storage delete for now to avoid complexity or errors.

            setPartners(partners.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting partner:', error);
            alert('Failed to delete partner');
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('partners')
                .update({ active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setPartners(partners.map(p => p.id === id ? { ...p, active: !currentStatus } : p));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Trusted Partners</h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Manage the logos displayed on the homepage
                    </p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Partner
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
            ) : partners.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400">No partners added yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {partners.map((partner) => (
                        <div key={partner.id} className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group hover:border-orange-500 dark:hover:border-orange-500 transition-colors">
                            <div className="h-40 bg-gray-50 dark:bg-gray-900 p-4 flex items-center justify-center relative">
                                <img src={partner.logo_url} alt={partner.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm p-1 rounded-lg">
                                    <button
                                        onClick={() => toggleActive(partner.id, partner.active)}
                                        className={`p-1.5 rounded-md ${partner.active ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'}`}
                                        title="Toggle Visibility"
                                    >
                                        {partner.active ? <ArrowPathIcon className="w-4 h-4" /> : <ArrowPathIcon className="w-4 h-4 grayscale" />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(partner.id, partner.logo_url)}
                                        className="p-1.5 rounded-md text-red-600 bg-red-50 hover:bg-red-100"
                                        title="Delete"
                                    >
                                        <TrashIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 dark:text-white truncate">{partner.name}</h3>
                                {partner.website_url && (
                                    <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className="text-xs text-orange-600 hover:underline flex items-center gap-1 mt-1 truncate">
                                        <LinkIcon className="w-3 h-3" />
                                        {partner.website_url.replace(/^https?:\/\//, '')}
                                    </a>
                                )}
                                <div className="mt-3 flex items-center gap-2">
                                    <span className={`inline-block w-2 h-2 rounded-full ${partner.active ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    <span className="text-xs text-gray-500">{partner.active ? 'Active' : 'Hidden'}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Partner Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-950 rounded-2xl w-full max-w-md p-6 border border-gray-200 dark:border-gray-800 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Partner</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                <span className="sr-only">Close</span>
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Partner Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="e.g. Acme Corp"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website URL (Optional)</label>
                                <input
                                    type="url"
                                    name="website_url"
                                    value={formData.website_url}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer relative">
                                    <div className="space-y-1 text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                                            <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                                                <span>Upload a file</span>
                                                <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, SVG up to 5MB</p>
                                        {formData.logo_file && (
                                            <p className="text-sm font-semibold text-green-600 mt-2">{formData.logo_file.name}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="flex-1 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                                >
                                    {uploading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Add Partner'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPartners;
