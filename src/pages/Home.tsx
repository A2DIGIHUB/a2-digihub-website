import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronDownIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  CloudIcon,
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import FloatingElement from '../components/graphics/FloatingElement';
import GradientText from '../components/graphics/GradientText';
import Footer from '../components/Footer';
import PortfolioSection from '../components/sections/PortfolioSection';
import { supabase } from '../lib/supabase';
import { useContent } from '../contexts/ContentContext';

const Home: React.FC = () => {
  const { settings } = useContent();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [activeBlogIndex, setActiveBlogIndex] = useState(0);

  useEffect(() => {
    fetchLatestBlogs();
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data } = await supabase
      .from('partners')
      .select('id, name, logo_url, website_url')
      .eq('active', true)
      .order('created_at', { ascending: true });
    setPartners(data || []);
  };

  const fetchLatestBlogs = async () => {
    const { data } = await supabase
      .from('blogs')
      .select('id, title, excerpt, slug, cover_image, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3);
    setBlogs(data || []);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden max-w-[100vw]">
      {/* Hero Section - Clean & Minimal */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950 pt-12 pb-16 lg:pt-16 lg:pb-24">

        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-50 dark:bg-orange-950/10 rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Main content */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left: Clear messaging */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                {/* Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  The Cultural Architect
                </div>

                {/* Headline - Clear & Direct */}
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
                  Technology that
                  <span className="block text-orange-600 dark:text-orange-500">honors heritage</span>
                </h1>

                {/* Clear value proposition */}
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                  We build digital solutions that empower African communities, preserve cultural identity, and create sustainable impact.
                </p>

                {/* Clear CTAs */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/contact"
                    className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Start a Project
                  </Link>
                  <Link
                    to="/portfolio"
                    className="px-8 py-4 border-2 border-gray-300 dark:border-gray-700 hover:border-orange-600 dark:hover:border-orange-500 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    View Our Work
                  </Link>
                </div>

                {/* Quick stats - Instant credibility */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Communities</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">200+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">5</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Languages</div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Visual clarity - What we do */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Clear service cards */}
                {[
                  {
                    icon: '🏛️',
                    title: 'Heritage Preservation',
                    desc: 'Digitizing cultural assets for future generations'
                  },
                  {
                    icon: '🌍',
                    title: 'Community Solutions',
                    desc: 'Tools that serve local needs and create opportunities'
                  },
                  {
                    icon: '🎨',
                    title: 'Identity Amplification',
                    desc: 'Celebrating uniqueness in the digital space'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-950 rounded-lg text-2xl border border-gray-200 dark:border-gray-800">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>

            {/* Trust indicators - Quick understanding */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800"
            >
              <p className="text-center text-sm text-gray-500 dark:text-gray-500 mb-8">
                Trusted by organizations across Africa
              </p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
                {/* Client logos */}
                {partners.length > 0 ? (
                  partners.map((partner) => (
                    <a
                      key={partner.id}
                      href={partner.website_url || '#'}
                      target={partner.website_url ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="group grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                      title={partner.name}
                    >
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-12 w-auto object-contain max-w-[120px]"
                      />
                    </a>
                  ))
                ) : (
                  /* Placeholder if no partners */
                  [1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-24 h-12 bg-gray-200 dark:bg-gray-800 rounded opacity-30"></div>
                  ))
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Cultural Impact Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Our Impact in Numbers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Real results from communities we've empowered and heritage we've preserved
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: '50+', label: 'Communities Served', icon: '🌍' },
              { value: '200+', label: 'Cultural Projects', icon: '🎨' },
              { value: '5', label: 'Languages Supported', icon: '🗣️' },
              { value: '10K+', label: 'Heritage Items Digitized', icon: '📚' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Our Cultural Impact
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Transforming communities through technology that honors heritage, empowers people, and amplifies cultural identity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <RocketLaunchIcon className="w-8 h-8" />,
                title: 'Heritage Preservation',
                description: 'Digitizing and protecting cultural heritage for future generations through innovative technology.'
              },
              {
                icon: <CpuChipIcon className="w-8 h-8" />,
                title: 'Community Empowerment',
                description: 'Building digital tools that serve local needs and create sustainable economic opportunities.'
              },
              {
                icon: <CloudIcon className="w-8 h-8" />,
                title: 'Identity Amplification',
                description: 'Creating solutions that celebrate uniqueness and amplify cultural voices in the digital space.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors"
              >
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 rounded-lg flex items-center justify-center mb-4 text-orange-600 dark:text-orange-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              How We Work
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Our proven process ensures your project succeeds from concept to launch
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Discovery Call',
                  description: 'We discuss your vision, goals, and requirements to understand your needs.',
                  icon: '🎯'
                },
                {
                  step: '02',
                  title: 'Strategy & Planning',
                  description: 'We create a detailed roadmap with timelines, milestones, and deliverables.',
                  icon: '📋'
                },
                {
                  step: '03',
                  title: 'Development & Testing',
                  description: 'Our team builds your solution with regular updates and quality assurance.',
                  icon: '⚡'
                },
                {
                  step: '04',
                  title: 'Launch & Support',
                  description: 'We deploy your project and provide ongoing support and maintenance.',
                  icon: '🚀'
                }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-6 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-orange-500 dark:hover:border-orange-500 transition-colors relative"
                >
                  <div className="text-4xl opacity-10 font-bold text-orange-600 absolute top-4 right-4">
                    {process.step}
                  </div>
                  <div className="text-3xl mb-3">{process.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {process.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {process.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3"
            >
              Our Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 dark:text-gray-400"
            >
              Discover how we've helped businesses transform and succeed in the digital age
            </motion.p>
          </div>

          {/* Use PortfolioSection component which will be updated to carousel */}
          <PortfolioSection showAll={false} />

          {/* View All Link */}
          <div className="text-center mt-8">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 hover:border-orange-600 dark:hover:border-orange-500 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors duration-200"
            >
              View All Projects
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Insights (Blogs) - Grid */}
      {blogs.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Latest Insights</h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Updates from our team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {blogs.slice(0, 3).map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="group block"
                  >
                    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden h-full flex flex-col hover:border-orange-500 dark:hover:border-orange-500 transition-colors">
                      <div className="h-48 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                        {blog.cover_image && (
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                          <span className="text-orange-600 dark:text-orange-500 font-medium group-hover:underline">Read more →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 hover:border-orange-600 dark:hover:border-orange-500 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors duration-200"
              >
                View All Posts
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Got questions? We've got answers
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: 'How long does a typical project take?',
                answer: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex web applications can take 2-3 months. We provide detailed timelines during the planning phase.'
              },
              {
                question: 'What technologies do you use?',
                answer: 'We use modern, industry-standard technologies including React, TypeScript, Node.js, Python, and cloud platforms like AWS and Azure. We choose the best tech stack for your specific needs.'
              },
              {
                question: 'Do you offer support after launch?',
                answer: 'Yes! We provide ongoing support and maintenance packages. This includes bug fixes, updates, security patches, and feature enhancements to keep your solution running smoothly.'
              },
              {
                question: 'What is your pricing model?',
                answer: 'We offer flexible pricing based on project scope. Options include fixed-price projects, hourly rates, or monthly retainers. Contact us for a custom quote tailored to your needs.'
              },
              {
                question: 'Can you work with our existing systems?',
                answer: 'Absolutely! We specialize in integrating with existing systems, APIs, and databases. We ensure seamless compatibility and data migration when needed.'
              },
              {
                question: 'Do you provide training for our team?',
                answer: 'Yes, we offer comprehensive training and documentation for your team to effectively use and manage the solutions we build. Training can be conducted remotely or on-site.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <details className="p-6 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg group cursor-pointer hover:border-orange-500 dark:hover:border-orange-500 transition-colors">
                  <summary className="flex justify-between items-center font-semibold text-gray-900 dark:text-white list-none">
                    <span className="text-lg">{faq.question}</span>
                    <ChevronDownIcon className="w-5 h-5 text-orange-600 dark:text-orange-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg text-center"
            >
              <div className="mb-6">
                <span className="text-4xl mb-4 block">📬</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Stay Updated with Tech Insights
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                  Get weekly tips on AI, web development, and digital transformation delivered to your inbox
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLFormElement).email.value;
                  // TODO: Integrate with your email service (EmailJS, Mailchimp, etc.)
                  alert(`Thanks for subscribing! We'll send updates to ${email}`);
                  (e.target as HTMLFormElement).reset();
                }}
                className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
