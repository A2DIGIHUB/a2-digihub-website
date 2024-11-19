import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: number;
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
  priceRange: string;
  deliveryTime: string;
  features: string[];
}

interface FormErrors {
  services?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
  name?: string;
  email?: string;
  phone?: string;
}

const ProjectBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const services: Service[] = [
    {
      id: 1,
      title: 'Digital Transformation',
      description: 'Complete digital overhaul of your business processes',
      priceRange: '$20,000 - $100,000+',
      deliveryTime: '3-6 months',
      features: [
        'Business Process Analysis',
        'Technology Stack Modernization',
        'Employee Training',
        'Digital Workflow Implementation'
      ]
    },
    {
      id: 2,
      title: 'Custom Software Development',
      description: 'Tailored software solutions for your specific needs',
      priceRange: '$15,000 - $75,000',
      deliveryTime: '2-4 months',
      features: [
        'Custom Application Development',
        'API Integration',
        'Database Design',
        'Testing & Quality Assurance'
      ]
    },
    {
      id: 3,
      title: 'Cloud Solutions',
      description: 'Modern cloud infrastructure and migration services',
      priceRange: '$10,000 - $50,000',
      deliveryTime: '1-3 months',
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
      priceRange: '$25,000 - $150,000',
      deliveryTime: '3-8 months',
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
        if (!budget) {
          newErrors.budget = 'Please select a budget range';
          isValid = false;
        }
        if (!timeline) {
          newErrors.timeline = 'Please select a timeline';
          isValid = false;
        }
        if (!requirements.trim()) {
          newErrors.requirements = 'Please describe your project requirements';
          isValid = false;
        }
        break;
      case 3:
        if (!contactInfo.name.trim()) {
          newErrors.name = 'Name is required';
          isValid = false;
        }
        if (!contactInfo.email.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(contactInfo.email)) {
          newErrors.email = 'Invalid email address';
          isValid = false;
        }
        if (!contactInfo.phone.trim()) {
          newErrors.phone = 'Phone number is required';
          isValid = false;
        }
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
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success
      setSubmitSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setSelectedServices([]);
        setBudget('');
        setTimeline('');
        setRequirements('');
        setContactInfo({
          name: '',
          email: '',
          phone: '',
          company: '',
        });
        setStep(1);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
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
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-colors ${
                    selectedServices.includes(service.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{service.priceRange}</span>
                    <span>{service.deliveryTime}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">Project Budget</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select budget range</option>
                  <option value="5-10k">$5,000 - $10,000</option>
                  <option value="10-25k">$10,000 - $25,000</option>
                  <option value="25-50k">$25,000 - $50,000</option>
                  <option value="50-100k">$50,000 - $100,000</option>
                  <option value="100k+">$100,000+</option>
                </select>
                {renderError(errors.budget)}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Preferred Timeline</label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select timeline</option>
                  <option value="1-2">1-2 months</option>
                  <option value="2-4">2-4 months</option>
                  <option value="4-6">4-6 months</option>
                  <option value="6+">6+ months</option>
                </select>
                {renderError(errors.timeline)}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Project Requirements</label>
                <textarea
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your project requirements and goals..."
                />
                {renderError(errors.requirements)}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            {...fadeInUp}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
                {renderError(errors.name)}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email"
                />
                {renderError(errors.email)}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your phone number"
                />
                {renderError(errors.phone)}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Company (Optional)</label>
                <input
                  type="text"
                  value={contactInfo.company}
                  onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Your company name"
                />
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
        <>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Project Builder</h2>
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      stepNumber === step
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
              <span className={step >= 3 ? 'text-blue-600' : ''}>Contact Info</span>
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
              {step < 3 ? (
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
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        </>
      )}
    </div>
  );
};

export default ProjectBuilder;
