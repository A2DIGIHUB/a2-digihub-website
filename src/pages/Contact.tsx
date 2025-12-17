import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useContent } from '../contexts/ContentContext';

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
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="relative isolate bg-slate-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Get in touch</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Ready to start your digital transformation? Contact us today for a consultation.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Contact Information</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              We're here to help you with any questions about our services or to discuss your next project.
            </p>
            <div className="mt-10 space-y-8">
              <div className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPinIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Our Office</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {settings.address || 'Loading address...'}
                  </p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Phone</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    <a href={`tel:${settings.phone}`} className="hover:text-blue-600">{settings.phone}</a>
                  </p>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Email</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    <a href={`mailto:${settings.contact_email}`} className="hover:text-blue-600">{settings.contact_email}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl shadow-sm">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
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
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
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
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
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
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
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
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 dark:text-white dark:bg-slate-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
