// --- START OF FILE: src/pages/ExploreSolutions.jsx ---

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaQrcode, FaStore, FaCogs, FaArrowRight } from 'react-icons/fa';
import ContactForm from './components/ContactForm'; // Make sure this path is correct

function ExploreSolutions() {
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState(null); // 'ecommerce' or 'custom' or null

    const services = [
        {
            key: 'qr',
            title: 'QR Order System',
            icon: FaQrcode,
            description: 'Streamline your restaurant or venue operations with our efficient contactless QR code ordering and payment solution.',
            actionText: 'Go to Registration',
            action: () => navigate('/qr-register'), // Assumes this route exists
            color: 'blue', // Kept for button/icon color reference
        },
        {
            key: 'ecommerce',
            title: 'E-commerce / Build Your Site',
            icon: FaStore,
            description: 'Launch your online store or establish a powerful web presence. We build custom, responsive, and SEO-friendly websites.',
            actionText: 'Get a Quote',
            action: () => setSelectedService('ecommerce'),
            color: 'green',
        },
        {
            key: 'custom',
            title: 'Specialized Custom Systems',
            icon: FaCogs,
            description: 'Need a unique software solution? We develop tailored systems for inventory, CRM, management, analytics, and more.',
            actionText: 'Discuss Your Project',
            action: () => setSelectedService('custom'),
            color: 'purple',
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    };

    const handleFormSuccess = () => {
        setTimeout(() => {
            setSelectedService(null); // Hide form
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
        }, 2000); // Delay to show success message
    };

    return (
        // Use a gradient background
        <div className="bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen pt-28 pb-20 px-4 sm:px-6"> {/* Increased pt for logo space */}
            <div className="container mx-auto">
                {/* Centered Logo Section - Shown only when grid is visible */}
                {!selectedService && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center mb-12 sm:mb-16" // Margin below logo
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold inline-block">
                            <span className="text-blue-300">Smart</span>
                            <span className="text-white [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:#000]"> {/* Use hex for blue-300 */}
                                {/* Alternative using theme(): <span className="text-white [-webkit-text-stroke-width:1px] [-webkit-text-stroke-color:theme(colors.blue.300)]"> */}
                                Swipe
                            </span>
                        </h2>
                    </motion.div>
                )}


                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-900 mb-4 py-6">Explore Our Solutions</h1>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto py-5">
                        Choose the service that best fits your business needs, or let us know if you require a custom-built solution.
                    </p>
                </motion.div>

                {/* Service Options Grid - Shown only when no form is selected */}
                {!selectedService && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start md:mt-32 lg:mt-[180px]" // items-start allows vertical offset
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={service.key}
                                variants={itemVariants}
                                whileHover={{ y: -6, scale: 1.03, boxShadow: "0px 12px 25px rgba(0, 0, 0, 0.12)" }}
                                className={`
                                    bg-white rounded-xl shadow-lg p-6 py-12 pt-8 flex flex-col
                                    transition-all duration-300 cursor-pointer h-full
                                    min-h-[500px]  
                                    ${index === 1 ? 'md:mt-6 lg:mt-8' : ''}
                                `} // No top border color
                                onClick={service.action} // Click anywhere on card triggers action
                            >
                                {/* Icon */}
                                <div className={`text-${service.color}-600 mx-auto mb-5`}>
                                    <service.icon size={52} />
                                </div>
                                {/* Title */}
                                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{service.title}</h2>
                                {/* Description */}
                                <p className="text-gray-600 text-center mb-6 flex-grow px-2">{service.description}</p>
                                {/* Action Button */}
                                {/* <div className="mt-auto text-center pt-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent card's onClick if button is clicked
                                            service.action();
                                        }}
                                        className={`inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-${service.color}-600 hover:bg-${service.color}-700 transition duration-150 ease-in-out shadow-sm hover:shadow-md`}
                                    >
                                        {service.actionText} <FaArrowRight className="ml-2 text-sm" />
                                    </button>
                                </div> */}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Conditionally Rendered Contact Form */}
                {/* Renders when selectedService is 'ecommerce' */}
                {selectedService === 'ecommerce' && (
                    <ContactForm
                        key="ecommerce-form" // Key ensures component remounts if type changes
                        defaultSubject="E-commerce / Website Inquiry"
                        onSuccess={handleFormSuccess}
                    />
                )}
                {/* Renders when selectedService is 'custom' */}
                {selectedService === 'custom' && (
                    <ContactForm
                        key="custom-form"
                        defaultSubject="Custom System Inquiry"
                        onSuccess={handleFormSuccess}
                    />
                )}

            </div>
        </div>
    );
}

export default ExploreSolutions;

// --- END OF FILE: src/pages/ExploreSolutions.jsx ---
