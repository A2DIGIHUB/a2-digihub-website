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
        setFormData({}); // Reset form
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
        const table = activeTab === 0 ? 'courses' : activeTab === 1 ? 'projects_portfolio' : 'blogs';

        try {
            let error;
            if (editingItem) {
                const { error: updateError } = await supabase
                    .from(table)
                    .update(formData)
                    .eq('id', editingItem.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from(table)
                    .insert([formData]);
                error = insertError;
            }

            if (error) throw error;

            addNotification('success', `Item ${editingItem ? 'updated' : 'created'} successfully`);
            setIsModalOpen(false);
            fetchContent();
        } catch (error: any) {
            addNotification('error', `Operation failed: ${error.message}`);
        }
    };

    const renderFormFields = () => {
        const inputClass = "w-full rounded-lg border-gray-300 border px-4 py-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all";
        const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

        // Helper to render image upload field
        const renderImageUpload = (field: string) => (
            <div className="col-span-full">
                <label className={labelClass}>Cover Image</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}>
                    <div className="text-center">
                        {formData[field] ? (
                            <div className="relative">
                                <img src={formData[field]} alt="Preview" className="mx-auto h-48 object-cover rounded-lg shadow-sm" />
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setFormData({ ...formData, [field]: '' }); }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <>
                                {uploadingImage ? (
                                    <div className="animate-pulse flex flex-col items-center">
                                        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-blue-400" />
                                        <span className="mt-2 text-sm text-gray-500">Uploading...</span>
                                    </div>
                                ) : (
                                    <>
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                            <span className="relative rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                                <span>Upload a file</span>
                                            </span>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
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
                        <div className="flex items-center pt-6">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" checked={formData.active !== false} onChange={e => setFormData({ ...formData, active: e.target.checked })} />
                                <span className="ml-2 text-sm font-medium text-gray-700">Active Course</span>
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
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" checked={formData.featured === true} onChange={e => setFormData({ ...formData, featured: e.target.checked })} />
                            <span className="ml-2 text-sm font-medium text-gray-700">Featured Project (Show on Home)</span>
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
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500" checked={formData.is_published === true} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} />
                            <span className="ml-2 text-sm font-medium text-gray-700">Publish Immediately</span>
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
                    <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage your courses, portfolio items, and blog posts</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Add New
                </button>
            </div>

            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/10 p-1 max-w-lg">
                    {tabs.map((tab) => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                 ${selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'
                                }`
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
                        {loading ? (
                            <div className="flex justify-center items-center h-64 text-gray-500">
                                <span className="animate-pulse">Loading content...</span>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {/* Render active list based on tab */}
                                {(activeTab === 0 ? courses : activeTab === 1 ? portfolio : blogs).map((item: any) => (
                                    <li key={item.id} className="group hover:bg-gray-50 transition-colors p-4 sm:px-6">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                                    {(item.image_url || item.cover_image) ? (
                                                        <img src={item.image_url || item.cover_image} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <PhotoIcon className="h-full w-full p-2 text-gray-400" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">{item.title}</p>
                                                    <p className="text-sm text-gray-500 truncate">
                                                        {activeTab === 0 ? `₦${item.price} • ${item.level}` :
                                                            activeTab === 1 ? item.category :
                                                                new Date(item.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id, activeTab === 0 ? 'courses' : activeTab === 1 ? 'projects_portfolio' : 'blogs')}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                {(activeTab === 0 ? courses : activeTab === 1 ? portfolio : blogs).length === 0 && (
                                    <div className="text-center py-20 text-gray-400">
                                        No items found. Click "Add New" to create one.
                                    </div>
                                )}
                            </ul>
                        )}
                    </div>
                </Tab.Panels>
            </Tab.Group>

            {/* Edit/Create Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <Dialog.Title className="text-lg font-bold text-gray-900">
                                {editingItem ? 'Edit Item' : 'Create New Item'}
                            </Dialog.Title>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {renderFormFields()}

                            <div className="mt-8 flex justify-end gap-3 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploadingImage}
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
