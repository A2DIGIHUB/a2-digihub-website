import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: number;
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
  priceRange: string;
  deliveryTime: string;
  features: string[];
  subOptions?: {
    id: string;
    title: string;
    description: string;
    basePrice: number;
    deliveryTime: string; // Added delivery estimate for specific package
    timelinePrices: {
      urgent: number;
      standard: number;
      flexible: number;
    };
    features: string[];
  }[];
}

interface FormErrors {
  services?: string;
  timeline?: string;
  requirements?: string;
  name?: string;
  email?: string;
  phone?: string;
}



const ProjectBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [requirements, setRequirements] = useState('');
  // Contact info state removed as user must be logged in
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');

  const services: Service[] = [
    {
      id: 1,
      title: 'Business Branding',
      description: 'Professional brand identity solutions to elevate your business presence',
      priceRange: '₦80,000 - ₦450,000',
      deliveryTime: '1-3 weeks',
      features: [
        'Logo Design & Brand Guidelines',
        'Social Media Branding Kit',
        'Business Card Design',
        'Email Signature',
        'Marketing Materials'
      ],
      subOptions: [
        {
          id: 'basic',
          title: 'Basic Branding Package',
          description: 'Essential branding elements for startups',
          basePrice: 80000,
          deliveryTime: '1 week',
          timelinePrices: {
            urgent: 120000,
            standard: 80000,
            flexible: 72000
          },
          features: [
            'Professional Logo Design',
            'Basic Brand Guidelines',
            'Business Card Design',
            'Email Signature',
            'Social Media Profile Images'
          ]
        },
        {
          id: 'standard',
          title: 'Standard Branding Package',
          description: 'Comprehensive branding for growing businesses',
          basePrice: 200000,
          deliveryTime: '2 weeks',
          timelinePrices: {
            urgent: 300000,
            standard: 200000,
            flexible: 180000
          },
          features: [
            'Professional Logo Design',
            'Detailed Brand Guidelines',
            'Business Card & Letterhead',
            'Email Signature',
            'Social Media Kit (Profile & Cover Images)',
            'Basic Marketing Materials',
            'Brand Color Palette'
          ]
        },
        {
          id: 'premium',
          title: 'Premium Branding Package',
          description: 'Complete brand identity system',
          basePrice: 450000,
          deliveryTime: '3 weeks',
          timelinePrices: {
            urgent: 675000,
            standard: 450000,
            flexible: 405000
          },
          features: [
            'Professional Logo Design with Multiple Concepts',
            'Comprehensive Brand Guidelines',
            'Complete Stationery Design',
            'Social Media Branding Kit',
            'Marketing Materials Design',
            'Brand Story Development',
            'Brand Voice Guidelines',
            'Typography Selection'
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Custom Software Development',
      description: 'Professional website and application development tailored to your needs',
      priceRange: '₦200,000 - ₦1,500,000+',
      deliveryTime: '2 weeks - 6 months',
      features: [
        'Responsive Design',
        'SEO Optimization',
        'Mobile-Friendly',
        'Custom Features'
      ],
      subOptions: [
        {
          id: 'personal',
          title: 'Personal Website',
          description: 'Perfect for individuals wanting to establish their online presence',
          basePrice: 200000,
          deliveryTime: '2-3 weeks',
          timelinePrices: {
            urgent: 300000,
            standard: 200000,
            flexible: 180000
          },
          features: [
            'About Me Section',
            'Contact Form',
            'Social Media Integration',
            'Basic SEO',
            'Mobile Responsive'
          ]
        },
        {
          id: 'ecommerce_lite',
          title: 'E-Commerce Lite (WhatsApp Store)',
          description: 'Simplified online store with WhatsApp checkout integration',
          basePrice: 300000,
          deliveryTime: '2-4 weeks',
          timelinePrices: {
            urgent: 450000,
            standard: 300000,
            flexible: 270000
          },
          features: [
            'Product Catalog (Up to 50 items)',
            'WhatsApp Checkout Integration',
            'Mobile Responsive Design',
            'Order Management Dashboard',
            'Social Media Links',
            'Search Functionality'
          ]
        },
        {
          id: 'ecommerce_pro',
          title: 'E-Commerce Pro (Full Store)',
          description: 'Complete online store with payment gateways and automation',
          basePrice: 750000,
          deliveryTime: '8-12 weeks',
          timelinePrices: {
            urgent: 1125000,
            standard: 750000,
            flexible: 675000
          },
          features: [
            'Unlimited Product Catalog',
            'Payment Gateways (Paystack/Flutterwave)',
            'Shopping Cart & Customer Accounts',
            'Inventory & Order Management',
            'Sales Analytics',
            'Email Notifications'
          ]
        },
        {
          id: 'realestate_lite',
          title: 'Real Estate Lite (Listings)',
          description: 'Essential property listing platform for agents',
          basePrice: 400000,
          deliveryTime: '4-6 weeks',
          timelinePrices: {
            urgent: 600000,
            standard: 400000,
            flexible: 360000
          },
          features: [
            'Property Listing Gallery',
            'Contact Agent Forms',
            'Basic Property Search',
            'Mobile Responsive',
            'Admin Dashboard',
            'Social Sharing'
          ]
        },
        {
          id: 'realestate_pro',
          title: 'Real Estate Pro (Portal)',
          description: 'Advanced real estate portal with extensive features',
          basePrice: 750000,
          deliveryTime: '10-14 weeks',
          timelinePrices: {
            urgent: 1125000,
            standard: 750000,
            flexible: 675000
          },
          features: [
            'Advanced Search & Filtering',
            'Map Integration & Virtual Tours',
            'Agent Profiles & Login',
            'User Favorites & Saved Searches',
            'Appointment Scheduling',
            'Mortgage Calculator'
          ]
        },
        {
          id: 'educational',
          title: 'Educational Website',
          description: 'Platform for educational institutions and learning programs',
          basePrice: 1000000, // Reduced from 1.2M
          deliveryTime: '10-14 weeks',
          timelinePrices: {
            urgent: 1500000,
            standard: 1000000,
            flexible: 900000
          },
          features: [
            'Course Management',
            'Student Profiles',
            'Learning Resources',
            'Progress Tracking',
            'Interactive Features'
          ]
        },
        {
          id: 'news',
          title: 'News/Magazine Website',
          description: 'Content-rich platform for articles and media',
          basePrice: 500000, // Reduced from 600k
          deliveryTime: '5-8 weeks',
          timelinePrices: {
            urgent: 750000,
            standard: 500000,
            flexible: 450000
          },
          features: [
            'Article Management',
            'Category System',
            'Search Functionality',
            'Media Gallery',
            'Comment System'
          ]
        },
        {
          id: 'portfolio',
          title: 'Portfolio Website',
          description: 'Showcase your work and achievements',
          basePrice: 450000, // Reduced from 500k
          deliveryTime: '4-6 weeks',
          timelinePrices: {
            urgent: 675000,
            standard: 450000,
            flexible: 405000
          },
          features: [
            'Project Gallery',
            'Work Categories',
            'Client Testimonials',
            'Achievement Showcase',
            'Contact Integration'
          ]
        },
        {
          id: 'social',
          title: 'Social Media Platform',
          description: 'Connect and engage with your community',
          basePrice: 1200000, // Reduced from 1.5M
          deliveryTime: '3-6 months',
          timelinePrices: {
            urgent: 1800000,
            standard: 1200000,
            flexible: 1080000
          },
          features: [
            'User Profiles',
            'News Feed',
            'Friend/Follow System',
            'Messaging',
            'Content Sharing'
          ]
        },
        {
          id: 'brochure',
          title: 'Brochure Website',
          description: 'Simple yet elegant business presence',
          basePrice: 200000, // Reduced from 250k
          deliveryTime: '2-3 weeks',
          timelinePrices: {
            urgent: 300000,
            standard: 200000,
            flexible: 180000
          },
          features: [
            'Company Info',
            'Service Listings',
            'Contact Information',
            'Image Gallery',
            'Basic SEO'
          ]
        },
        {
          id: 'business',
          title: 'Business Website',
          description: 'Professional corporate web presence',
          basePrice: 450000, // Reduced from 500k
          deliveryTime: '3-5 weeks',
          timelinePrices: {
            urgent: 675000,
            standard: 450000,
            flexible: 405000
          },
          features: [
            'Service Showcase',
            'Team Profiles',
            'Case Studies',
            'Blog Integration',
            'Analytics Integration'
          ]
        },
        {
          id: 'blog',
          title: 'Blog Website',
          description: 'Share your stories and content',
          basePrice: 200000, // Reduced from 250k
          deliveryTime: '2-4 weeks',
          timelinePrices: {
            urgent: 300000,
            standard: 200000,
            flexible: 180000
          },
          features: [
            'Blog Posts',
            'Categories & Tags',
            'Comments System',
            'Social Sharing',
            'RSS Feed'
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Cloud Solutions',
      description: 'Modern cloud infrastructure and migration services',
      priceRange: '₦500,000 - ₦4,000,000',
      deliveryTime: '1-6 months',
      features: [
        'Cloud Migration',
        'Infrastructure Setup',
        'Security Implementation',
        'Performance Optimization'
      ]
    },
    {
      id: 4,
      title: 'AI & Machine Learning',
      description: 'Intelligent automation and data analysis solutions',
      priceRange: '₦1,500,000 - ₦10,000,000',
      deliveryTime: '2-12 months',
      features: [
        'AI Model Development',
        'Data Analysis',
        'Process Automation',
        'Predictive Analytics'
      ]
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    switch (currentStep) {
      case 1:
        if (selectedServices.length === 0) {
          newErrors.services = 'Please select at least one service';
          isValid = false;
        }
        break;
      case 2:
        if (!timeline) {
          newErrors.timeline = 'Please select a timeline';
          isValid = false;
        }
        // Requirements are now optional
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    try {
      const user = (await supabase.auth.getUser()).data.user;

      if (!user) {
        alert("Please login to submit a quote.");
        window.location.href = '/login';
        return;
      }

      const { error } = await supabase.from('quotes').insert({
        user_id: user.id,
        service_type: services.find(s => selectedServices.includes(s.id))?.title || 'Unknown Service',
        package_type: selectedSubOptions.length > 0 ? selectedSubOptions[0] : null,
        estimated_price: estimatedPrice,
        timeline: timeline,
        status: 'pending',
        details: {
          requirements,
          selectedServices,
          selectedSubOptions
        }
      });

      if (error) throw error;

      setSubmitSuccess(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error: any) {
      console.error('Error submitting form:', error);
      alert(`Failed to submit quote: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (error?: string) => {
    if (!error) return null;
    return (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-sm mt-1"
      >
        {error}
      </motion.p>
    );
  };

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculatePrice = (selectedServices: number[], timelineValue: string) => {
    const timelineMultipliers: { [key: string]: number } = {
      'urgent': 1.5,    // 50% premium for urgent
      'standard': 1.0,  // standard rate
      'flexible': 0.9   // 10% discount for flexible
    };

    // Get the current multiplier
    const multiplier = timelineMultipliers[timelineValue] || 1;
    let total = 0;

    selectedServices.forEach(serviceId => {
      if (serviceId === 2) { // Custom Software Development
        const selectedWebsiteType = selectedSubOptions[0];
        if (selectedWebsiteType) {
          const service = services.find(s => s.id === 2);
          const websiteOption = service?.subOptions?.find(opt => opt.id === selectedWebsiteType);
          if (websiteOption) {
            // Use the specific pre-calculated timeline price (do not multiply again)
            total += websiteOption.timelinePrices[timelineValue] || websiteOption.basePrice;
          }
        }
      } else if (serviceId === 1) { // Business Branding
        const selectedBrandingPackage = selectedSubOptions[0];
        if (selectedBrandingPackage) {
          const service = services.find(s => s.id === 1);
          const brandingPackage = service?.subOptions?.find(opt => opt.id === selectedBrandingPackage);
          if (brandingPackage) {
            // Use the specific pre-calculated timeline price (do not multiply again)
            total += brandingPackage.timelinePrices[timelineValue] || brandingPackage.basePrice;
          }
        }
      } else {
        // For other services (Cloud, AI), use base price * multiplier
        const basePrices: { [key: number]: { min: number; max: number } } = {
          3: { min: 500000, max: 4000000 },    // Cloud Solutions (Reduced from 5M)
          4: { min: 1500000, max: 10000000 }    // AI & ML (Reduced from 2M/15M)
        };
        if (basePrices[serviceId]) {
          // Apply multiplier here for these services
          total += Math.round(basePrices[serviceId].min * multiplier);
        }
      }
    });

    // Note: We removed the global multiplier application here to avoid double-charging
    // for services that already have timeline-specific prices.

    return `₦${total.toLocaleString()}`;
  };

  const handleTimelineChange = (value: string) => {
    setTimeline(value);
    if (selectedServices.length > 0) {
      const newEstimate = calculatePrice(selectedServices, value);
      setEstimatedPrice(newEstimate);
    }
  };

  const handleServiceSelect = (serviceId: number) => {
    const newSelectedServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];

    setSelectedServices(newSelectedServices);
    if (newSelectedServices.length > 0 && timeline) {
      const newEstimate = calculatePrice(newSelectedServices, timeline);
      setEstimatedPrice(newEstimate);
    } else {
      setEstimatedPrice('');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            {...fadeInUp}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`p-6 border rounded-lg transition-all ${selectedServices.includes(service.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                    }`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="mb-4">
                    <p className="font-medium mb-2">Price Range:</p>
                    <p className="text-blue-600">{service.priceRange}</p>
                  </div>
                  <div className="mb-4">
                    <p className="font-medium mb-2">Delivery Time:</p>
                    <p>{service.deliveryTime}</p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Features:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            {renderError(errors.services)}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            {...fadeInUp}
            className="space-y-6"
          >
            <div className="space-y-6">
              {/* Project Details Summary (Sub-options) - Moved ABOVE Timeline */}
              {selectedServices.includes(2) && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Select Website Type</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.find(s => s.id === 2)?.subOptions?.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          const newSelection = [option.id]; // Single selection for simplicity in pricing
                          setSelectedSubOptions(newSelection);
                          if (timeline) {
                            const newEstimate = calculatePrice(selectedServices, timeline);
                            setEstimatedPrice(newEstimate);
                          }
                        }}
                        className={`w-full h-full p-4 border rounded-lg text-left hover:border-blue-500 transition-colors ${selectedSubOptions.includes(option.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                          }`}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex-grow">
                            <h4 className="font-semibold text-lg mb-1">{option.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                            <p className="text-sm text-blue-600 font-medium mb-3">Est. Time: {option.deliveryTime}</p>
                            <ul className="text-sm text-gray-600 space-y-1 mb-4">
                              {option.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <svg className="w-4 h-4 mr-2 text-blue-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-auto pt-4 border-t border-gray-200">
                            <div className="text-lg font-semibold text-blue-600">
                              From ₦{option.basePrice.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedServices.includes(1) && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Select Branding Package</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.find(s => s.id === 1)?.subOptions?.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          const newSelection = [option.id];
                          setSelectedSubOptions(newSelection);
                          if (timeline) {
                            const newEstimate = calculatePrice(selectedServices, timeline);
                            setEstimatedPrice(newEstimate);
                          }
                        }}
                        className={`w-full h-full p-4 border rounded-lg text-left hover:border-blue-500 transition-colors ${selectedSubOptions.includes(option.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                          }`}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex-grow">
                            <h4 className="font-semibold text-lg mb-1">{option.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                            <p className="text-sm text-blue-600 font-medium mb-3">Est. Time: {option.deliveryTime}</p>
                            <ul className="text-sm text-gray-600 space-y-1 mb-4">
                              {option.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <svg className="w-4 h-4 mr-2 text-blue-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-auto pt-4 border-t border-gray-200">
                            <div className="text-lg font-semibold text-blue-600">
                              From ₦{option.basePrice.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Timeline - Only show if options selected (for those with options) or if generic service */}
              {((selectedServices.includes(1) && selectedSubOptions.length > 0) ||
                (selectedServices.includes(2) && selectedSubOptions.length > 0) ||
                (!selectedServices.includes(1) && !selectedServices.includes(2))) && (
                  <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Delivery Speed
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => handleTimelineChange('urgent')}
                        className={`p-4 border rounded-lg text-left hover:border-blue-500 transition-colors ${timeline === 'urgent' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                      >
                        <h3 className="font-semibold mb-2">Accelerated Timeline</h3>
                        <p className="text-sm text-gray-600">Prioritized delivery</p>
                        <p className="text-sm text-blue-600 mt-2">50% premium</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTimelineChange('standard')}
                        className={`p-4 border rounded-lg text-left hover:border-blue-500 transition-colors ${timeline === 'standard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                      >
                        <h3 className="font-semibold mb-2">Standard Timeline</h3>
                        <p className="text-sm text-gray-600">Standard schedule</p>
                        <p className="text-sm text-blue-600 mt-2">Standard rate</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTimelineChange('flexible')}
                        className={`p-4 border rounded-lg text-left hover:border-blue-500 transition-colors ${timeline === 'flexible' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                      >
                        <h3 className="font-semibold mb-2">Flexible Timeline</h3>
                        <p className="text-sm text-gray-600">Extended schedule</p>
                        <p className="text-sm text-blue-600 mt-2">10% discount</p>
                      </button>
                    </div>
                    {estimatedPrice && (
                      <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-center font-bold text-xl border border-blue-200">
                        Estimated Total: {estimatedPrice}
                      </div>
                    )}
                  </div>
                )}

              {/* Selected Project Summary */}
              {selectedServices.includes(2) && selectedSubOptions[0] && timeline && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Project Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-blue-600">
                            {services.find(s => s.id === 2)?.subOptions?.find(opt => opt.id === selectedSubOptions[0])?.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 capitalize">{timeline} Delivery</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{estimatedPrice}</div>
                          <p className="text-sm text-gray-500">Final Price</p>
                          <p className="text-xs text-blue-600 mt-1">
                            Est. Time: {services.find(s => s.id === 2)?.subOptions?.find(opt => opt.id === selectedSubOptions[0])?.deliveryTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedServices.includes(1) && selectedSubOptions[0] && timeline && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Project Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-blue-600">
                            {services.find(s => s.id === 1)?.subOptions?.find(opt => opt.id === selectedSubOptions[0])?.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 capitalize">{timeline} Delivery</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{estimatedPrice}</div>
                          <p className="text-sm text-gray-500">Final Price</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-700 font-medium mb-2">Project Requirements (Optional)</label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Please describe your project requirements and any specific features you need..."
                ></textarea>
                {renderError(errors.requirements)}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl mx-auto">
      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Project Submitted Successfully!</h3>
          <p className="text-gray-600">
            Thank you for your interest. Our team will review your project details and contact you soon.
          </p>
        </motion.div>
      ) : (
        <div>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Project Builder</h2>
              <div className="flex items-center space-x-2">
                {[1, 2].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${stepNumber === step
                      ? 'bg-blue-500'
                      : stepNumber < step
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500">
              <span className={step >= 1 ? 'text-blue-600' : ''}>Select Services</span>
              <span className={step >= 2 ? 'text-blue-600' : ''}>Project Details</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>

            <motion.div
              className="mt-8 flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Back
                </button>
              )}
              {step < 2 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`ml-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-colors
                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Project'
                  )}
                </motion.button>
              )}
            </motion.div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectBuilder;
