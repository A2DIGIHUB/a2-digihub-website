import React from 'react';
import { motion } from 'framer-motion';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12"
    >
      <div className="max-w-md w-full space-y-6 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <div className="space-y-4">
            <button
              onClick={resetErrorBoundary}
              className="w-full px-4 py-2 bg-ios-blue text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full px-4 py-2 border border-ios-blue text-ios-blue rounded-md hover:bg-purple-50 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorFallback;
