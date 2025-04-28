import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/animation.css';
import { FaDesktop, FaMobileAlt, FaQrcode, FaBars, FaTimes, FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Home() {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const testimonialsRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [formStatus, setFormStatus] = useState('');
    const [isFormLoading, setIsFormLoading] = useState(false);

    const projects = [
        {
            id: 1,
            title: "RestaurantQR",
            description: "A QR code ordering system that helped Bella Italia increase table turnover by 28% and reduce staff overhead by 15%.",
            image: "https://source.unsplash.com/random/800x600/?restaurant"
        },
        {
            id: 2,
            title: "Swift Commerce",
            description: "An e-commerce platform with integrated payment processing that boosted Sunrise Bakery's online sales by 45% in just 3 months.",
            image: "https://source.unsplash.com/random/800x600/?ecommerce"
        },
        {
            id: 3,
            title: "MedConnect",
            description: "A patient management system that streamlined appointment scheduling for Highland Medical, reducing no-shows by 32%.",
            image: "https://source.unsplash.com/random/800x600/?healthcare"
        }
    ];



    // Improved project carousel with smooth transitions
    const nextProject = () => {
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
            setIsFlipping(false);
        }, 500);
    };

    const prevProject = () => {
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1));
            setIsFlipping(false);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextProject();
        }, 8000); // Change project every 8 seconds (increased from 5 for better readability)

        return () => clearInterval(interval);
    }, [projects.length]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        script.onload = () => setIsScriptLoaded(true);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    function handleDirectBtn(route) {
        navigate(route);
        setMobileMenuOpen(false);
    }

    // Close mobile menu when window resizes to desktop width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);


    const handleFormChange = (e) => {
        // Updates state whenever an input field changes
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        // Runs when the form is submitted
        e.preventDefault(); // Prevent default page reload
        setIsFormLoading(true); // Set loading state
        setFormStatus(''); // Clear previous status messages

        try {
            // Send data to the Vercel serverless function endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert state data to JSON string
            });

            // Get the response back from the serverless function
            const result = await response.json();

            if (response.ok) {
                // If the API call was successful (status 2xx)
                setFormStatus('Success: Message sent successfully!');
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear the form fields
            } else {
                // If the API call failed (status 4xx or 5xx)
                setFormStatus(`Error: ${result.error || 'Failed to send message. Please check details.'}`);
            }
        } catch (error) {
            // If there was a network error or other issue with the fetch call itself
            console.error('Form submission error:', error);
            setFormStatus('Error: Could not submit form. Please check your connection and try again.');
        } finally {
            // Runs whether the submission succeeded or failed
            setIsFormLoading(false); // Reset loading state
        }
    };

    return (
        <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
            {/* Navbar - Improved gradient and alignment */}
            <nav className="bg-gradient-to-r from-blue-800 to-indigo-900 shadow-lg fixed w-full top-0 z-50">
                <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <a href="#" className="text-xl sm:text-2xl font-bold text-white flex items-center">
                        <span className="text-blue-300 mr-1">Smart</span>Swipe
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white focus:outline-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <a href="#hero" className="relative text-white font-medium after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full">Home</a>
                        <a href="#services" className="relative text-white font-medium after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full">Services</a>
                        <a href="#projects" className="relative text-white font-medium after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full">Projects</a>
                        <a href="#about" className="relative text-white font-medium after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full">About Us</a>
                        <a href="#contact" className="relative text-white font-medium after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-300 after:transition-all after:duration-300 hover:after:w-full">Contact</a>
                    </div>

                    {/* Desktop Buttons - Improved styling and consistency */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="bg-transparent border-2 border-blue-300 text-blue-300 px-5 py-2 rounded-lg font-medium hover:bg-blue-300 hover:text-indigo-900 transition duration-300" onClick={() => handleDirectBtn('/services')}>
                            Our Services
                        </button>
                        <button className="bg-blue-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-600 transition duration-300 flex items-center" onClick={() => handleDirectBtn('/contact-us')}>
                            Get Started <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Improved animation */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-indigo-900 py-6 px-6 shadow-lg"
                    >
                        <div className="flex flex-col space-y-4">
                            <a href="#hero" className="text-white text-lg hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Home</a>
                            <a href="#services" className="text-white text-lg hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Services</a>
                            <a href="#projects" className="text-white text-lg hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                            <a href="#about" className="text-white text-lg hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>About Us</a>
                            <a href="#contact" className="text-white text-lg hover:text-blue-300 transition" onClick={() => setMobileMenuOpen(false)}>Contact</a>

                            <div className="pt-4 flex flex-col space-y-3">
                                <button className="bg-transparent border-2 border-blue-300 text-blue-300 px-6 py-2 rounded-lg font-medium hover:bg-blue-300 hover:text-indigo-900 transition duration-300 w-full" onClick={() => handleDirectBtn('/services')}>
                                    Our Services
                                </button>
                                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:bg-blue-600 transition duration-300 w-full flex items-center justify-center" onClick={() => handleDirectBtn('/contact-us')}>
                                    Get Started <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section - Enhanced responsiveness */}
            <section id="hero" className="relative bg-gradient-to-r from-blue-800 to-indigo-900 pt-32 pb-24">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6">
                    {/* Text Content */}
                    <div className="md:w-1/2 text-center md:text-left z-10 mb-12 md:mb-0">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            Transforming Businesses <span className="text-blue-300 block sm:inline">With Intelligent Software</span>
                        </h1>
                        <p className="text-base sm:text-lg text-white/90 mt-6 max-w-lg mx-auto md:mx-0">
                            We create custom software solutions that streamline operations, enhance customer experiences, and drive growth for businesses of all sizes.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md font-medium hover:bg-blue-600 transition duration-300 flex items-center justify-center w-full sm:w-auto" onClick={() => handleDirectBtn('/services')}>
                                Explore Solutions <FaArrowRight className="ml-2" />
                            </button>
                            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition duration-300 w-full sm:w-auto" onClick={() => handleDirectBtn('/contact-us')}>
                                Schedule Demo
                            </button>
                        </div>
                    </div>

                    {/* Lottie Animation */}
                    <div className="md:w-1/2 flex justify-center relative">
                        {isScriptLoaded ? (
                            <dotlottie-player
                                src="https://lottie.host/f0f6ab18-3f73-4da7-8b6e-cb740b51fd59/bkCDTFY0To.lottie"
                                background="transparent"
                                speed="1"
                                style={{ width: "100%", maxWidth: "400px", height: "auto", aspectRatio: "1/1" }}
                                className="drop-shadow-2xl"
                                loop
                                autoplay
                            />
                        ) : (
                            <div className="w-full h-64 flex items-center justify-center">
                                <p className="text-white/70">Loading animation...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Curved SVG */}
                <div className="absolute bottom-0 left-0 w-full">
                    <svg viewBox="0 0 1440 200" className="w-full">
                        <path fill="#ffffff" fillOpacity="1"
                            d="M0,160L60,149.3C120,139,240,117,360,122.7C480,128,600,160,720,165.3C840,171,960,149,1080,133.3C1200,117,1320,107,1380,101.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            {/* Services Section - Enhanced cards and content */}
            <section id="services" className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4"> Our Services</h2>
                        <p className="text-gray-600">Delivering innovative software solutions to address your business challenges and boost efficiency.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Service Card 1 */}
                        <div className="relative flex flex-col bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm mt-12 sm:mt-14 transition-all duration-300 hover:shadow-md hover:border-blue-200 h-full">
                            {/* Icon Circle */}
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center rounded-full shadow-md">
                                <FaQrcode size={28} className="sm:text-3xl" title='QR Code Solutions' />
                            </div>
                            <h3 className="mt-8 sm:mt-12 text-xl font-bold text-center">QR Code Systems</h3>
                            <p className="mt-3 sm:mt-4 text-gray-600 text-center text-sm sm:text-base">
                                Streamline restaurant operations with our contactless ordering and payment systems. Enhance customer experience while reducing staff workload.
                            </p>
                            <ul className="mt-3 sm:mt-4 space-y-2 text-gray-600 text-sm sm:text-base">
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    Table-specific digital menus
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    Integrated payment processing
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    Real-time kitchen notifications
                                </li>
                            </ul>
                            <div className="mt-auto pt-4 sm:pt-6">
                                <a href="/qr-solutions" className="text-blue-600 font-medium hover:text-blue-800 transition flex items-center justify-center">
                                    Learn more <FaArrowRight className="ml-2 text-sm" />
                                </a>
                            </div>
                        </div>

                        {/* Service Card 2 */}
                        <div className="relative flex flex-col bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm mt-12 sm:mt-14 transition-all duration-300 hover:shadow-md hover:border-blue-200 h-full">
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center rounded-full shadow-md">
                                <FaDesktop size={28} className="sm:text-3xl" title='Web Development' />
                            </div>
                            <h3 className="mt-8 sm:mt-12 text-xl font-bold text-center">Custom Websites</h3>
                            <p className="mt-3 sm:mt-4 text-gray-600 text-center text-sm sm:text-base">
                                Establish a powerful online presence with our custom-designed, SEO-optimized websites that convert visitors into customers.
                            </p>
                            <ul className="mt-3 sm:mt-4 space-y-2 text-gray-600 text-sm sm:text-base">
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    Responsive design for all devices
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    E-commerce functionality
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    Content management systems
                                </li>
                            </ul>
                            <div className="mt-auto pt-4 sm:pt-6">
                                <a href="/web-development" className="text-blue-600 font-medium hover:text-blue-800 transition flex items-center justify-center">
                                    Learn more <FaArrowRight className="ml-2 text-sm" />
                                </a>
                            </div>
                        </div>

                        {/* Service Card 3 */}
                        <div className="relative flex flex-col bg-white border border-gray-200 p-6 sm:p-8 rounded-xl shadow-sm mt-12 sm:mt-14 transition-all duration-300 hover:shadow-md hover:border-blue-200 h-full">
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center rounded-full shadow-md">
                                <FaMobileAlt size={28} className="sm:text-3xl" title='Mobile Apps' />
                            </div>
                            <h3 className="mt-8 sm:mt-12 text-xl font-bold text-center">Specialized Systems</h3>
                            <p className="mt-3 sm:mt-4 text-gray-600 text-center text-sm sm:text-base">
                                Customize your business operations with tailored software solutions designed to address your specific challenges.
                            </p>
                            <ul className="mt-3 sm:mt-4 space-y-2 text-gray-600 text-sm sm:text-base">
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    Inventory management
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    Customer relationship tools
                                </li>
                                <li className="flex items-center">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                                    Business analytics dashboards
                                </li>
                            </ul>
                            <div className="mt-auto pt-4 sm:pt-6">
                                <a href="/specialized-systems" className="text-blue-600 font-medium hover:text-blue-800 transition flex items-center justify-center">
                                    Learn more <FaArrowRight className="ml-2 text-sm" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section - Improved responsive layout */}
            <section id="projects" className="bg-gradient-to-r from-blue-800 to-indigo-900 py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Success Stories</h2>
                        <p className="text-blue-100 max-w-2xl mx-auto">
                            Real projects, real results. See how our solutions have helped businesses transform their operations.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative h-[500px] xs:h-[450px] sm:h-[400px] mx-auto">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className={`absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 overflow-hidden
                                    ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                                    initial={false}
                                    animate={{
                                        rotateY: isFlipping ? (index === currentIndex ? "90deg" : "-90deg") : "0deg",
                                        opacity: index === currentIndex ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="h-full flex flex-col md:flex-row items-center gap-4 md:gap-6">
                                        <div className="w-full md:w-1/2 rounded-lg overflow-hidden h-40 sm:h-48 md:h-full bg-gray-800">
                                            <div className="w-full h-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 flex items-center justify-center">
                                                <p className="text-white text-base sm:text-lg font-medium">Project Image</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-4">{project.title}</h3>
                                            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
                                                {project.description}
                                            </p>
                                            <button className="bg-blue-500 text-white self-start px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center text-sm sm:text-base">
                                                View case study <FaArrowRight className="ml-2" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Project Navigation */}
                        <div className="flex justify-center mt-6 sm:mt-8 gap-3 sm:gap-4">
                            <button
                                onClick={prevProject}
                                className="bg-white/10 hover:bg-white/20 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition duration-300"
                                aria-label="Previous project"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {projects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsFlipping(true);
                                        setTimeout(() => {
                                            setCurrentIndex(index);
                                            setIsFlipping(false);
                                        }, 500);
                                    }}
                                    className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                                        }`}
                                    aria-label={`Go to project ${index + 1}`}
                                />
                            ))}

                            <button
                                onClick={nextProject}
                                className="bg-white/10 hover:bg-white/20 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition duration-300"
                                aria-label="Next project"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            {/* --- START: NEW About Us Section --- */}
            <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"> {/* Subtle gradient background */}
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Section Title and Intro */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }} // Animate when section scrolls into view
                            viewport={{ once: true, amount: 0.5 }} // Trigger animation once
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl sm:text-4xl font-bold text-indigo-900 mb-6">About SmartSwipe</h2>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </motion.div>

                        {/* Mission Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.2 }} // Staggered animation
                        >
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-10">
                                <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.
                                </p>
                            </div>
                        </motion.div>

                        {/* Vision Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.4 }} // Staggered animation
                        >
                            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                                <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Vision</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.
                                </p>
                            </div>
                        </motion.div>

                        {/* Optional Placeholder for future content */}
                        {/*
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                         >
                            <div className="mt-16">
                                <p className="text-gray-500">More about our team and values coming soon...</p>
                            </div>
                         </motion.div>
                         */}
                    </div>
                </div>
            </section>
            {/* --- END: NEW About Us Section --- */}

            <section id="contact" className="py-20 bg-gradient-to-b from-indigo-900 to-blue-900 text-center px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* ... (heading text remains the same) ... */}
                    <div className="mb-12">
                        <h2 className="text-3xl sm:text-4xl text-white font-bold mb-4">Ready to Transform Your Business?</h2>
                        <p className="text-blue-100 text-lg">
                            Let's discuss how our software solutions can address your specific needs and help you achieve your business goals.
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-xl p-8 sm:p-10">
                        {/* --- START: Update Form Element --- */}
                        {/* Add the onSubmit handler to the form tag */}
                        <form className="space-y-6" onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700 text-left">Your Name</label>
                                    <input
                                        id="name"
                                        name="name" // Add name attribute (should match state key)
                                        type="text"
                                        placeholder="John Smith"
                                        className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        value={formData.name} // Bind input value to state
                                        onChange={handleFormChange} // Add onChange handler
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700 text-left">Your Email</label>
                                    <input
                                        id="email"
                                        name="email" // Add name attribute
                                        type="email"
                                        placeholder="johnsmith@example.com"
                                        className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        value={formData.email} // Bind input value to state
                                        onChange={handleFormChange} // Add onChange handler
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="subject" className="mb-2 text-sm font-medium text-gray-700 text-left">Subject</label>
                                <input
                                    id="subject"
                                    name="subject" // Add name attribute
                                    type="text"
                                    placeholder="Inquiry about custom software solutions"
                                    className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={formData.subject} // Bind input value to state
                                    onChange={handleFormChange} // Add onChange handler
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="message" className="mb-2 text-sm font-medium text-gray-700 text-left">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message" // Add name attribute
                                    rows="5"
                                    placeholder="Tell us about your business needs..."
                                    className="w-full bg-gray-50 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    value={formData.message} // Bind input value to state
                                    onChange={handleFormChange} // Add onChange handler
                                    required
                                />
                            </div>

                            {formStatus && (
                                <p className={`text-sm mt-4 ${formStatus.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
                                    {formStatus}
                                </p>
                            )}
                            <button
                                type="submit"
                                // Add conditional styling/disabling based on loading state
                                className={`w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all ${isFormLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isFormLoading}
                            >
                                {isFormLoading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home;
