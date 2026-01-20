import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';

interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string;
    created_at: string;
}

const Blogs: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('is_published', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setBlogs(data || []);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-ios-bg">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-900 py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/grid.svg')" }} />
                </div>
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Latest Insights</h1>
                    <p className="mt-6 text-lg leading-8 text-blue-100 max-w-2xl mx-auto">
                        Discover the latest trends, tutorials, and updates from the world of digital technology.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                {loading ? (
                    <div className="text-center py-12 text-ios-subtext">Loading articles...</div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12 text-ios-subtext">No articles published yet. Check back soon!</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <motion.article
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex flex-col glass-card overflow-hidden group hover:bg-ios-surface-2 transition-all duration-300"
                            >
                                <div className="relative h-48 w-full bg-ios-surface-2 overflow-hidden">
                                    {blog.cover_image ? (
                                        <img
                                            src={blog.cover_image}
                                            alt={blog.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-ios-surface text-ios-subtext/30">
                                            <span>No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col flex-1 p-6">
                                    <div className="flex items-center gap-x-4 text-xs text-ios-subtext mb-4">
                                        <time dateTime={blog.created_at} className="flex items-center">
                                            <CalendarIcon className="h-4 w-4 mr-1 text-ios-blue" />
                                            {new Date(blog.created_at).toLocaleDateString()}
                                        </time>
                                    </div>
                                    <div className="group relative">
                                        <h3 className="text-lg font-bold leading-6 text-ios-text group-hover:text-ios-blue transition-colors">
                                            <Link to={`/blog/${blog.slug}`}>
                                                <span className="absolute inset-0" />
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ios-subtext">
                                            {blog.excerpt}
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-6 flex items-center text-sm font-medium text-ios-blue">
                                        Read more <span aria-hidden="true" className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Blogs;
