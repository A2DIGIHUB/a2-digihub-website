import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
export const initEmailJS = () => {
  emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'TMZ3gcGdHzZ8h6yiV');
};

// Email service configuration
export const EMAIL_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_e33lw7a';
export const EMAIL_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_z8d78wt';
