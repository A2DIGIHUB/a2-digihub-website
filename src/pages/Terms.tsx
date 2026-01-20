import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, ScaleIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

const Terms: React.FC = () => {
  const sections = [
    {
      title: 'Terms and Conditions',
      icon: DocumentTextIcon,
      content: `These terms and conditions outline the rules and regulations for the use of Illumi-Labs' services and website.`,
    },
    {
      title: 'Acceptance of Terms',
      icon: ScaleIcon,
      content: `By accessing this website and using our services, you accept these terms and conditions in full. Do not continue to use Illumi-Labs' website if you do not accept all of the terms and conditions stated on this page.`,
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
      className="min-h-screen bg-ios-bg"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/grid.svg')" }} />
        <div className="container mx-auto px-4 py-20 relative z-10">
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
                className="glass-card p-8 group hover:bg-ios-surface-2 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <section.icon className="w-8 h-8 text-ios-blue" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-ios-text mb-4">{section.title}</h2>
                    <p className="text-ios-subtext leading-relaxed">{section.content}</p>
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
              className="glass-card p-10"
            >
              <h2 className="text-2xl font-bold text-ios-text mb-6">Detailed Terms</h2>

              <h3 className="text-xl font-bold text-ios-text mt-8 mb-4">1. License to Use Website</h3>
              <p className="text-ios-subtext mb-6 leading-relaxed">
                Unless otherwise stated, Illumi-Labs and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved.
              </p>

              <h3 className="text-xl font-bold text-ios-text mt-8 mb-4">2. Restrictions</h3>
              <p className="text-ios-subtext mb-6">
                You are specifically restricted from all of the following:
              </p>
              <ul className="list-disc pl-6 text-ios-subtext mb-6 space-y-2">
                <li>Publishing any website material in any other media</li>
                <li>Selling, sublicensing and/or otherwise commercializing any website material</li>
                <li>Publicly performing and/or showing any website material</li>
                <li>Using this website in any way that is or may be damaging to this website</li>
                <li>Using this website contrary to applicable laws and regulations</li>
              </ul>

              <h3 className="text-xl font-bold text-ios-text mt-8 mb-4">3. Your Content</h3>
              <p className="text-ios-subtext mb-6 leading-relaxed">
                In these terms and conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this website. By displaying Your Content, you grant Illumi-Labs a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.
              </p>

              <h3 className="text-xl font-bold text-ios-text mt-8 mb-4">4. No Warranties</h3>
              <p className="text-ios-subtext mb-6 leading-relaxed">
                This website is provided "as is," with all faults, and Illumi-Labs express no representations or warranties, of any kind related to this website or the materials contained on this website.
              </p>

              <h3 className="text-xl font-bold text-ios-text mt-8 mb-4">5. Limitation of Liability</h3>
              <p className="text-ios-subtext mb-6 leading-relaxed">
                In no event shall Illumi-Labs, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this website.
              </p>
            </motion.div>

            {/* Contact Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="glass-card bg-blue-500/10 border-blue-500/20 p-8 mt-12"
            >
              <h2 className="text-2xl font-bold text-ios-text mb-4">Questions About our Terms?</h2>
              <p className="text-ios-subtext mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <ul className="text-ios-subtext space-y-2">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ios-blue" /> Email: legal@illumi-labs.com</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ios-blue" /> Phone: +123 456 7890</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-ios-blue" /> Address: 123 Digital Hub Street, Tech City, TC 12345</li>
              </ul>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-ios-subtext/60 mt-12 text-sm"
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
