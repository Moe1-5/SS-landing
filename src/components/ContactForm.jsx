// src/components/ContactForm.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

function ContactForm({ defaultSubject = '', onSuccess }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '', // Added phone number field
        subject: defaultSubject,
        message: ''
    });
    const [formStatus, setFormStatus] = useState(''); // e.g., 'Success', 'Error: ...', ''
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Clear status message when user starts typing again
        if (formStatus) {
            setFormStatus('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormStatus(''); // Clear previous status

        try {
            // --- Replace with your actual API endpoint ---
            // const response = await fetch('/api/contact-inquiry', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData),
            // });
            // const result = await response.json();

            // --- MOCK API CALL FOR DEMO ---
            console.log('Submitting form data:', formData);
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
            const mockResponse = { ok: true }; // Simulate success
            // const mockResponse = { ok: false, error: 'Invalid email format (mock error)' }; // Simulate failure
            // --- END MOCK ---

            if (mockResponse.ok) { // Change to response.ok for real API
                setFormStatus('Success: Your inquiry has been sent!');
                setFormData({ name: '', email: '', phone: '', subject: defaultSubject, message: '' }); // Clear form
                if (onSuccess) {
                    onSuccess(); // Call the callback provided by the parent
                }
            } else {
                setFormStatus(`Error: ${mockResponse.error || 'Failed to send inquiry. Please try again.'}`); // Change to result.error for real API
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormStatus('Error: Could not submit form. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 w-full max-w-2xl mx-auto"
        >
            <h3 className="text-2xl font-semibold text-indigo-800 mb-6 text-center">
                Tell Us About Your Project
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Jane Doe"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="e.g., jane.doe@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>
                </div>

                {/* Phone Number */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., +1 555 123 4567 (Optional)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    />
                </div>


                {/* Subject */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Briefly describe your need"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    />
                </div>

                {/* Message */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Please provide as much detail as possible about your requirements, goals, and any existing systems."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    />
                </div>

                {/* Status Message */}
                {formStatus && (
                    <p className={`text-sm text-center font-medium ${formStatus.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
                        {formStatus}
                    </p>
                )}

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Inquiry <FaPaperPlane className="ml-2" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}

// Add prop-types for better component documentation and error checking
ContactForm.propTypes = {
    defaultSubject: PropTypes.string,
    onSuccess: PropTypes.func, // Callback function for successful submission
};


export default ContactForm;
