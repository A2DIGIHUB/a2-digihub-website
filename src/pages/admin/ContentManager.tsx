import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon,
    PhotoIcon,
    CloudArrowUpIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../../lib/supabase';
import { useNotifications } from '../../contexts/NotificationsContext';

interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: string;
    level: string;
    image_url: string;
    active: boolean;
}

interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    description: string;
    image_url: string;
    live_link: string;
    featured: boolean;
}

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    is_published: boolean;
}

const ContentManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [courses, setCourses] = useState<Course[]>([]);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [formData, setFormData] = useState<any>({});
    const { addNotification } = useNotifications();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const [coursesRes, portfolioRes, blogsRes] = await Promise.all([
                supabase.from('courses').select('*').order('created_at', { ascending: false }),
                supabase.from('projects_portfolio').select('*').order('created_at', { ascending: false }),
                supabase.from('blogs').select('*').order('created_at', { ascending: false })
            ]);

            if (coursesRes.error) throw coursesRes.error;
            if (portfolioRes.error) throw portfolioRes.error;
            if (blogsRes.error) throw blogsRes.error;

            setCourses(coursesRes.data || []);
            setPortfolio(portfolioRes.data || []);
            setBlogs(blogsRes.data || []);
        } catch (error: any) {
            addNotification('error', `Failed to load content: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({ ...item });
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingItem(null);
        // Initialize with default values based on active tab
        const defaultData = activeTab === 0
            ? { active: true, level: 'Beginner' } // Courses defaults
            : activeTab === 1
                ? { category: 'Web Development', featured: false } // Portfolio defaults
                : { is_published: false }; // Blog defaults

        setFormData(defaultData);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string, type: 'courses' | 'projects_portfolio' | 'blogs') => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const { error } = await supabase.from(type).delete().eq('id', id);
            if (error) throw error;
            addNotification('success', 'Item deleted successfully');
            fetchContent();
        } catch (error: any) {
            addNotification('error', `Failed to delete: ${error.message}`);
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            addNotification('error', 'File size must be less than 5MB');
            return;
        }

        setUploadingImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('content-images')
                .upload(filePath, file);

            if (uploadError) {
                // Provide more helpful error messages
                if (uploadError.message.includes('not found')) {
                    throw new Error('Storage bucket not configured. Please run storage_migration.sql in your Supabase project.');
                }
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('content-images')
                .getPublicUrl(filePath);

            const imageUrl = data.publicUrl;

            // Determine the correct field name based on active tab
            const imageField = activeTab === 2 ? 'cover_image' : 'image_url';
            setFormData({ ...formData, [imageField]: imageUrl });
            addNotification('success', 'Image uploaded successfully!');

        } catch (error: any) {
            console.error('Upload error:', error);
            addNotification('error', `Upload failed: ${error.message}`);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted!');
        console.log('Active Tab:', activeTab);
        console.log('Form Data:', formData);

        const table = activeTab === 0 ? 'courses' : activeTab === 1 ? 'projects_portfolio' : 'blogs';
        console.log('Target Table:', table);

        try {
            let error;
            if (editingItem) {
                console.log('Updating existing item:', editingItem.id);
                const { error: updateError } = await supabase
                    .from(table)
                    .update(formData)
                    .eq('id', editingItem.id);
                error = updateError;
            } else {
                console.log('Creating new item...');
                const { error: insertError, data } = await supabase
                    .from(table)
                    .insert([formData]);
                console.log('Insert result:', { error: insertError, data });
                error = insertError;
            }

            if (error) {
                console.error('Database error:', error);
                throw error;
            }

            console.log('Success! Closing modal and refreshing...');
            addNotification('success', `Item ${editingItem ? 'updated' : 'created'} successfully`);
            setIsModalOpen(false);
            fetchContent();
        } catch (error: any) {
            console.error('Submit error:', error);
            addNotification('error', `Operation failed: ${error.message}`);
        }
    };

    const renderFormFields = () => {
        const inputClass = "w-full rounded-xl border border-ios-border px-4 py-2.5 bg-ios-surface-2 text-ios-text shadow-sm focus:border-ios-blue focus:ring-2 focus:ring-ios-blue/20 outline-none transition-all placeholder-ios-subtext/50";
        const labelClass = "block text-sm font-semibold text-ios-subtext mb-1.5";

        // Helper to render image upload field
        const renderImageUpload = (field: string) => (
            <div className="col-span-full">
                <label className={labelClass}>Cover Image</label>
                <div className="mt-2 flex justify-center rounded-xl border border-dashed border-ios-border px-6 py-10 bg-ios-surface/50 hover:bg-ios-surface transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}>
                    <div className="text-center">
                        {formData[field] ? (
                            <div className="relative">
                                <img src={formData[field]} alt="Preview" className="mx-auto h-48 object-cover rounded-xl shadow-md border border-ios-border" />
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, [field]: '' }); }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition-colors"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                {uploadingImage ? (
                                    <div className="animate-pulse flex flex-col items-center">
                                        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-ios-blue" />
                                        <span className="mt-2 text-sm text-ios-subtext">Uploading...</span>
                                    </div>
                                ) : (
                                    <>
                                        <PhotoIcon className="mx-auto h-12 w-12 text-ios-subtext/50" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-ios-subtext justify-center">
                                            <span className="relative rounded-md font-semibold text-ios-blue hover:text-blue-500 transition-colors">
                                                <span>Upload a file</span>
                                            </span>
                                        </div>
                                        <p className="text-xs leading-5 text-ios-subtext/70 mt-1">PNG, JPG, GIF up to 5MB</p>
                                    </>
                                )}
                            </>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>
            </div>
        );

        if (activeTab === 0) { // Courses
            return (
                <div className="space-y-5">
                    <div>
                        <label className={labelClass}>Title</label>
                        <input type="text" required className={inputClass} value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Master Web Development" />
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea required rows={4} className={inputClass} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Detailed overview of the course..." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Price (Naira)</label>
                            <input type="number" required className={inputClass} value={formData.price || ''} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                        </div>
                        <div>
                            <label className={labelClass}>Duration</label>
                            <input type="text" required className={inputClass} value={formData.duration || ''} onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g. 4 Weeks" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Level</label>
                            <select className={inputClass} value={formData.level || 'Beginner'} onChange={e => setFormData({ ...formData, level: e.target.value })}>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <div className="flex items-center pt-8">
                            <label className="flex items-center cursor-pointer group">
                                <input type="checkbox" className="w-5 h-5 text-ios-blue rounded border-ios-border focus:ring-ios-blue bg-ios-surface" checked={formData.active !== false} onChange={e => setFormData({ ...formData, active: e.target.checked })} />
                                <span className="ml-3 text-sm font-medium text-ios-text group-hover:text-ios-blue transition-colors">Active Course</span>
                            </label>
                        </div>
                    </div>
                    {renderImageUpload('image_url')}
                </div>
            );
        } else if (activeTab === 1) { // Portfolio
            return (
                <div className="space-y-5">
                    <div>
                        <label className={labelClass}>Project Title</label>
                        <input type="text" required className={inputClass} value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Category</label>
                        <select className={inputClass} value={formData.category || 'Web Development'} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                            <option value="Web Development">Web Development</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Branding">Branding</option>
                            <option value="Cloud Solutions">Cloud Solutions</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea required rows={4} className={inputClass} value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Live Link (Optional)</label>
                        <input type="url" className={inputClass} value={formData.live_link || ''} onChange={e => setFormData({ ...formData, live_link: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 text-ios-blue rounded border-ios-border focus:ring-ios-blue bg-ios-surface" checked={formData.featured === true} onChange={e => setFormData({ ...formData, featured: e.target.checked })} />
                            <span className="ml-3 text-sm font-medium text-ios-text group-hover:text-ios-blue transition-colors">Featured Project (Show on Home)</span>
                        </label>
                    </div>
                    {renderImageUpload('image_url')}
                </div>
            );
        } else { // Blogs
            return (
                <div className="space-y-5">
                    <div>
                        <label className={labelClass}>Article Title</label>
                        <input type="text" required className={inputClass} value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div>
                        <label className={labelClass}>Slug (URL Friendly)</label>
                        <input type="text" required className={inputClass} value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} placeholder="my-awesome-article" />
                    </div>
                    <div>
                        <label className={labelClass}>Excerpt</label>
                        <textarea rows={2} required className={inputClass} value={formData.excerpt || ''} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} placeholder="Short summary..." />
                    </div>
                    <div>
                        <label className={labelClass}>Content (Markdown Supported)</label>
                        <textarea rows={10} required className={inputClass} value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="# Heading..." />
                    </div>
                    <div className="flex items-center">
                        <label className="flex items-center cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 text-ios-blue rounded border-ios-border focus:ring-ios-blue bg-ios-surface" checked={formData.is_published === true} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} />
                            <span className="ml-3 text-sm font-medium text-ios-text group-hover:text-ios-blue transition-colors">Publish Immediately</span>
                        </label>
                    </div>
                    {renderImageUpload('cover_image')}
                </div>
            );
        }
    };

    const tabs = ['Courses', 'Portfolio', 'Insights'];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-ios-text">Content Management</h1>
                    <p className="mt-1 text-sm text-ios-subtext">Manage your courses, portfolio items, and blog posts</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="btn-ios-primary flex items-center shadow-lg shadow-blue-500/20"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Add New
                </button>
            </div>

            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                <Tab.List className="flex space-x-2 rounded-2xl bg-ios-surface/50 p-1.5 max-w-lg shadow-inner">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                `w-full rounded-xl py-2.5 text-sm font-semibold leading-5 transition-all outline-none
                                ${selected
                                    ? 'bg-ios-surface shadow-sm text-ios-text ring-1 ring-ios-border'
                                    : 'text-ios-subtext hover:text-ios-text hover:bg-ios-surface/50'
                                }`
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-6">
                    <div className="glass-panel min-h-[400px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-64 text-ios-subtext">
                                <span className="animate-pulse flex items-center gap-2">
                                    <div className="w-2 h-2 bg-ios-blue rounded-full animate-bounce"></div>
                                    Loading content...
                                </span>
                            </div>
                        ) : (
                            <ul className="divide-y divide-ios-border">
                                {/* Render active list based on tab */}
                                {(activeTab === 0 ? courses : activeTab === 1 ? portfolio : blogs).map((item: any) => (
                                    <li key={item.id} className="group hover:bg-ios-blue/5 transition-colors p-4 sm:px-6">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="h-14 w-14 flex-shrink-0 rounded-xl bg-ios-surface-2 overflow-hidden border border-ios-border">
                                                    {(item.image_url || item.cover_image) ? (
                                                        <img src={item.image_url || item.cover_image} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <PhotoIcon className="h-full w-full p-3 text-ios-subtext" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-base font-semibold text-ios-text truncate">{item.title}</p>
                                                    <p className="text-sm text-ios-subtext truncate mt-0.5">
                                                        {activeTab === 0 ? `₦${item.price} • ${item.level}` :
                                                            activeTab === 1 ? item.category :
                                                                new Date(item.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-2 text-ios-subtext hover:text-ios-blue hover:bg-ios-blue/10 rounded-full transition-colors"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, activeTab === 0 ? 'courses' : activeTab === 1 ? 'projects_portfolio' : 'blogs')}
                                                    className="p-2 text-ios-subtext hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                {(activeTab === 0 ? courses : activeTab === 1 ? portfolio : blogs).length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-24 text-ios-subtext">
                                        <CloudArrowUpIcon className="h-16 w-16 mb-4 text-ios-subtext/50" />
                                        <p className="text-lg font-medium">No items found</p>
                                        <p className="text-sm">Click "Add New" to get started</p>
                                    </div>
                                )}
                            </ul>
                        )}
                    </div>
                </Tab.Panels>
            </Tab.Group>

            {/* Edit/Create Modal - Using standard opaque background for modal dialog */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#1C1C1E] p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-8">
                            <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                                {editingItem ? 'Edit Item' : 'Create New Item'}
                            </Dialog.Title>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {renderFormFields()}

                            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploadingImage}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 transition-all"
                                >
                                    {uploadingImage ? 'Uploading...' : editingItem ? 'Save Changes' : 'Create Item'}
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default ContentManager;
