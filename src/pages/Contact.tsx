import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useContent } from '../contexts/ContentContext';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const { settings } = useContent();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-ios-bg transition-colors duration-300">
      <div className="relative isolate bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ backgroundImage: "url('/grid.svg')" }} />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Get in touch</h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Ready to start your digital transformation? Contact us today for a consultation.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ios-text">Contact Information</h2>
            <p className="mt-6 text-lg leading-8 text-ios-subtext">
              We're here to help you with any questions about our services or to discuss your next project.
            </p>
            <div className="mt-10 space-y-8">
              <div className="flex gap-x-4">
                <div className="flex-none p-2 bg-ios-surface rounded-lg border border-ios-border">
                  <span className="sr-only">Address</span>
                  <MapPinIcon className="h-6 w-6 text-ios-blue" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-ios-text">Our Office</h3>
                  <p className="mt-2 text-ios-subtext">
                    {settings.address || 'Loading address...'}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-none p-2 bg-ios-surface rounded-lg border border-ios-border">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon className="h-6 w-6 text-ios-blue" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-ios-text">Phone</h3>
                  <p className="mt-2 text-ios-subtext">
                    <a href={`tel:${settings.phone}`} className="hover:text-ios-blue transition-colors">{settings.phone}</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-none p-2 bg-ios-surface rounded-lg border border-ios-border">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon className="h-6 w-6 text-ios-blue" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-ios-text">Email</h3>
                  <p className="mt-2 text-ios-subtext">
                    <a href={`mailto:${settings.contact_email}`} className="hover:text-ios-blue transition-colors">{settings.contact_email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass-card p-8 sm:p-10">
            <h3 className="text-xl font-bold text-ios-text mb-8">Send us a message</h3>
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-ios-text">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-ios-text bg-ios-surface/50 backdrop-blur-sm shadow-sm ring-1 ring-inset ring-ios-border placeholder:text-ios-subtext focus:ring-2 focus:ring-inset focus:ring-ios-blue focus:bg-ios-surface transition-all sm:text-sm sm:leading-6"
                    placeholder="John"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-ios-text">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-ios-text bg-ios-surface shadow-sm ring-1 ring-inset ring-ios-border placeholder:text-ios-subtext focus:ring-2 focus:ring-inset focus:ring-ios-blue sm:text-sm sm:leading-6 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-ios-text">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-ios-text bg-ios-surface shadow-sm ring-1 ring-inset ring-ios-border placeholder:text-ios-subtext focus:ring-2 focus:ring-inset focus:ring-ios-blue sm:text-sm sm:leading-6 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-semibold leading-6 text-ios-text">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-ios-text bg-ios-surface shadow-sm ring-1 ring-inset ring-ios-border placeholder:text-ios-subtext focus:ring-2 focus:ring-inset focus:ring-ios-blue sm:text-sm sm:leading-6 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-ios-text">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-0 px-4 py-3 text-ios-text bg-ios-surface shadow-sm ring-1 ring-inset ring-ios-border placeholder:text-ios-subtext focus:ring-2 focus:ring-inset focus:ring-ios-blue sm:text-sm sm:leading-6 transition-all"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="block w-full rounded-xl bg-ios-blue px-3.5 py-3 text-center text-sm font-semibold text-white shadow-lg hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ios-blue transition-all active:scale-[0.98]"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
