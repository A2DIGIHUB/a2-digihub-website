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

    if (loading) return <div className="min-h-screen bg-ios-bg grid place-items-center text-ios-subtext">Loading...</div>;
    if (!post) return <div className="min-h-screen bg-ios-bg grid place-items-center text-ios-subtext">Post not found.</div>;

    return (
        <div className="min-h-screen bg-ios-bg">
            <div className="relative h-[50vh] min-h-[400px]">
                <div className="absolute inset-0">
                    {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full bg-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ios-bg via-slate-900/60 to-transparent" />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end pb-16">
                    <div className="mx-auto max-w-3xl px-6 w-full text-white">
                        <Link to="/blog" className="inline-flex items-center text-sm font-medium hover:text-ios-blue mb-8 transition-colors bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 w-fit">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to Insights
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>
                        <div className="flex items-center text-sm text-gray-300 font-medium bg-black/30 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                            <CalendarIcon className="w-4 h-4 mr-2 text-ios-blue" />
                            {new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-6 py-16">
                <div className="glass-card p-8 md:p-12">
                    <article className="prose prose-lg prose-invert max-w-none text-ios-text">
                        {/* Simple line break rendering if not using a markdown renderer, 
                            or use a library like react-markdown if available in dependencies. 
                            For now, simply rendering text with basic line preservation. 
                        */}
                        {post.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className="mb-6 leading-relaxed text-ios-subtext">{paragraph}</p>
                        ))}
                    </article>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BlogPost;
