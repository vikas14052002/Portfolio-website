import { init } from '@emailjs/browser';

// Initialize EmailJS with your user ID
// Get this from EmailJS Account page -> API Keys -> User ID
init('user_your_user_id');

export const EMAILJS_CONFIG = {
  // Get this from Email Services tab -> [Your Service] -> Service ID
  SERVICE_ID: 'service_08i57lr',
  
  // Get this from Email Templates tab -> [Your Template] -> Template ID
  TEMPLATE_ID: 'template_7qzv4fb',
  
  // Get this from Account page -> API Keys -> Public Key
  PUBLIC_KEY: '8m83pOwF9c0oSttvf'
}; 