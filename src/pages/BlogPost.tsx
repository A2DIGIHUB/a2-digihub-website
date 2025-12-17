import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import Footer from '../components/Footer';
import ReactMarkdown from 'react-markdown'; // Assuming we might want markdown support, but basic text for now if lib not installed

interface BlogPost {
    id: string;
    title: string;
    content: string;
    cover_image: string;
    created_at: string;
    author_id: string; // Could fetch profile if needed
}

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            try {
                const { data, error } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setPost(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (loading) return <div className="min-h-screen grid place-items-center">Loading...</div>;
    if (!post) return <div className="min-h-screen grid place-items-center">Post not found.</div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="relative h-[400px]">
                <div className="absolute inset-0">
                    {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full bg-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end pb-16">
                    <div className="mx-auto max-w-3xl px-6 w-full text-white">
                        <Link to="/blog" className="inline-flex items-center text-sm hover:text-blue-300 mb-6 transition-colors">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Insights
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
                        <div className="flex items-center text-sm text-gray-300">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-6 py-16">
                <article className="prose prose-lg prose-blue max-w-none text-gray-700">
                    {/* Simple line break rendering if not using a markdown renderer, 
                        or use a library like react-markdown if available in dependencies. 
                        For now, simply rendering text with basic line preservation. 
                    */}
                    {post.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4">{paragraph}</p>
                    ))}
                </article>
            </div>

            <Footer />
        </div>
    );
};

export default BlogPost;
