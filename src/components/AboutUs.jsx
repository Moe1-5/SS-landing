import React, { useEffect, useRef, useState } from 'react';

const pages = [
    { id: 1, text: 'Our Mission', position: 'left' },
    { id: 2, text: 'Our Vision', position: 'right' },
    { id: 3, text: 'Our Values', position: 'left' },
];

const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.";

function AboutUs() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScrollLocked, setIsScrollLocked] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (isScrollLocked) return;

            const scrollPosition = container.scrollTop;
            const pageHeight = container.clientHeight;
            const newIndex = Math.round(scrollPosition / pageHeight);
            const clampedIndex = Math.max(0, Math.min(newIndex, pages.length - 1));

            if (activeIndex !== clampedIndex) {
                setActiveIndex(clampedIndex);
                setIsScrollLocked(true);

                // Shorter pause - just 800ms
                setTimeout(() => {
                    setIsScrollLocked(false);
                }, 800);
            }
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [activeIndex, isScrollLocked]);

    return (
        <>
            <style>{`
                @keyframes fadeInUp {
                  0% { opacity: 0; transform: translateY(30px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInRight {
                  0% { opacity: 0; transform: translateX(-30px); }
                  100% { opacity: 1; transform: translateX(0); }
                }
                @keyframes pulse {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.05); }
                }
                .animate-fadeInUp {
                  animation: fadeInUp 0.6s ease-out forwards;
                }
                .animate-fadeInRight {
                  animation: fadeInRight 0.6s ease-out forwards;
                }
                .animate-pulse {
                  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>

            {/* Main container */}
            <div
                ref={containerRef}
                className={`h-screen overflow-y-auto ${isScrollLocked ? 'overflow-hidden' : ''}`}
                style={{
                    willChange: 'scroll-position',
                    position: 'relative'
                }}
            >
                {/* Content pages */}
                {pages.map((page, index) => (
                    <div
                        key={page.id}
                        className="h-screen relative"
                    >
                        {/* Desktop Layout - Hidden on small screens */}
                        <div className="hidden md:flex h-full items-center justify-center relative">
                            {/* Text Section - Positioned left or right with bottom-to-top animation */}
                            {activeIndex === index && (
                                <div
                                    className={`absolute w-2/5 ${page.position === 'left'
                                        ? 'left-8 text-right pr-8'
                                        : 'right-8 text-left pl-8'}`}
                                >
                                    <div className="animate-fadeInUp">
                                        <h2 className="text-2xl font-bold mb-4 text-blue-600">{page.text}</h2>
                                        <p className="text-gray-700">{loremText}</p>
                                    </div>
                                </div>
                            )}

                            {/* Center Circle and Line Design */}
                            <div className="flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                                {/* Circle Design */}
                                <div
                                    className={`
                                        ${activeIndex === index
                                            ? 'w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center animate-pulse'
                                            : 'w-8 h-8 rounded-full bg-blue-500 opacity-30'}
                                    `}
                                >
                                    {activeIndex === index && (
                                        <div className="w-8 h-8 rounded-full bg-blue-500" />
                                    )}
                                </div>

                                {/* Circle label */}
                                {activeIndex === index && (
                                    <p className="mt-4 text-blue-500 font-semibold text-lg text-center animate-fadeInUp">
                                        {page.text}
                                    </p>
                                )}

                                {/* Connecting Line: Full height line for all except the last page */}
                                {index !== pages.length - 1 && (
                                    <div
                                        className="absolute w-1 bg-blue-500 opacity-30"
                                        style={{
                                            top: '100%',
                                            height: 'calc(100vh - 6rem)',
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Mobile Layout - Only visible on small screens */}
                        <div className="md:hidden h-full flex flex-row">
                            {/* Left timeline */}
                            <div className="w-16 relative flex justify-center">
                                {/* Vertical line */}
                                <div className="absolute h-full w-1 bg-blue-500 opacity-30" />
                                
                                {/* Circle */}
                                <div className="absolute top-1/2 transform -translate-y-1/2">
                                    <div
                                        className={`
                                            ${activeIndex === index
                                                ? 'w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center animate-pulse'
                                                : 'w-6 h-6 rounded-full bg-blue-500 opacity-30'}
                                        `}
                                    >
                                        {activeIndex === index && (
                                            <div className="w-6 h-6 rounded-full bg-blue-500" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right content */}
                            <div className="flex-1 flex items-center pr-4">
                                {activeIndex === index && (
                                    <div className="animate-fadeInRight">
                                        <h2 className="text-xl font-bold mb-2 text-blue-600">{page.text}</h2>
                                        <p className="text-sm text-gray-700">{loremText}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default AboutUs;
