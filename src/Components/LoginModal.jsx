import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbyAM1uSscNggqKBbK73Gfgi3s5m0DVM_O60Z0fP1Uh7pygaqNmET-xhb7Kbf6XcYkTT/exec';

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Clear stale message and reset form every time modal opens
  useEffect(() => {
    if (isOpen) {
      setMessage('');
      setFormData({ name: '', email: '', phone: '' });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Use GET with query params — the only reliable way to call Apps Script from a browser
      // without a backend proxy. no-cors on GET requests works and the body reaches the script.
      const params = new URLSearchParams({
        name:  formData.name,
        email: formData.email,
        phone: formData.phone,
        type:  'login',
      });

      await fetch(`${GOOGLE_SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      // no-cors gives opaque response — treat completed fetch as success
      setMessage('✓ Thank you! Your information has been saved.');
      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', phone: '' });
      }, 1500);
    } catch (error) {
      console.error('Submission error:', error);
      setMessage('Failed to connect. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#800000]">Join Our Community</h2>
          <p className="text-gray-500 text-sm mt-2">Enter your details to connect with us</p>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm ${
              message.includes('Thank you')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#b31b1b] hover:bg-[#8a1515] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Please wait...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
