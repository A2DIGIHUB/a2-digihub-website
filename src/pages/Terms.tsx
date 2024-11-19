import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, ScaleIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

const Terms: React.FC = () => {
  const sections = [
    {
      title: 'Terms and Conditions',
      icon: DocumentTextIcon,
      content: `These terms and conditions outline the rules and regulations for the use of A2-DIGIHUB's services and website.`,
    },
    {
      title: 'Acceptance of Terms',
      icon: ScaleIcon,
      content: `By accessing this website and using our services, you accept these terms and conditions in full. Do not continue to use A2-DIGIHUB's website if you do not accept all of the terms and conditions stated on this page.`,
    },
    {
      title: 'Privacy and Data Protection',
      icon: ShieldCheckIcon,
      content: `We are committed to protecting your privacy. Any information provided will be handled in accordance with our Privacy Policy.`,
    },
    {
      title: 'Service Updates',
      icon: ClockIcon,
      content: `We reserve the right to update or change our Terms of Service at any time. Continued use of our services following any changes constitutes acceptance of those changes.`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Terms of Service
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-blue-100"
            >
              Please read these terms carefully before using our services
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <section.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detailed Terms */}
          <div className="mt-16 space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="prose prose-blue max-w-none"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. License to Use Website</h3>
              <p className="text-gray-600 mb-6">
                Unless otherwise stated, A2-DIGIHUB and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Restrictions</h3>
              <p className="text-gray-600 mb-6">
                You are specifically restricted from all of the following:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-6">
                <li>Publishing any website material in any other media</li>
                <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
                <li>Publicly performing and/or showing any website material</li>
                <li>Using this website in any way that is or may be damaging to this website</li>
                <li>Using this website contrary to applicable laws and regulations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Your Content</h3>
              <p className="text-gray-600 mb-6">
                In these terms and conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this website. By displaying Your Content, you grant A2-DIGIHUB a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. No Warranties</h3>
              <p className="text-gray-600 mb-6">
                This website is provided "as is," with all faults, and A2-DIGIHUB express no representations or warranties, of any kind related to this website or the materials contained on this website.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Limitation of Liability</h3>
              <p className="text-gray-600 mb-6">
                In no event shall A2-DIGIHUB, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website.
              </p>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-blue-50 rounded-2xl p-8 mt-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About our Terms?</h2>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• Email: legal@a2digihub.com</li>
                <li>• Phone: +123 456 7890</li>
                <li>• Address: 123 Digital Hub Street, Tech City, TC 12345</li>
              </ul>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-gray-500 mt-12"
            >
              <p>Last updated: {new Date().toLocaleDateString()}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Terms;
