'use client'

import { motion } from 'framer-motion'
import { Globe, Users, BookOpen } from 'lucide-react'

export default function WhyChooseUs() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* Main Image */}
                            <div className="col-span-2 relative">
                                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-xl">
                                    <img
                                        src="https://res.cloudinary.com/dw0lrectk/image/upload/v1773299675/fl-2_brexzb.jpg"
                                        alt="Founder - Flying Horse Visa Services"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to placeholder if image not found
                                            e.currentTarget.style.display = 'none';
                                            const fallback = e.currentTarget.nextElementSibling;
                                            if (fallback) {
                                                fallback.classList.remove('hidden');
                                                fallback.classList.add('flex');
                                            }
                                        }}
                                    />
                                </div>
                                {/* Experience Badge */}
                                <div className="absolute -bottom-4 -right-4 bg-primary-500 text-white rounded-2xl p-6 shadow-2xl">
                                    <div className="text-5xl font-bold">5</div>
                                    <div className="text-sm font-medium">Years OF</div>
                                    <div className="text-sm font-medium">Experience</div>
                                </div>
                            </div>

                            {/* Secondary Image */}
                            <div className="col-span-2 mt-8">
                                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-lg">

                                    <img
                                        src="https://res.cloudinary.com/dw0lrectk/image/upload/v1773299675/fl-1_jhcfs8.jpg"
                                        alt="Founder - Flying Horse Visa Services"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to placeholder if image not found
                                            e.currentTarget.style.display = 'none';
                                            const fallback = e.currentTarget.nextElementSibling;
                                            if (fallback) {
                                                fallback.classList.remove('hidden');
                                                fallback.classList.add('flex');
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Circular Badge */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                            <div className="w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-primary-100">
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-2 bg-primary-100 rounded-full flex items-center justify-center">
                                        <svg className="h-6 w-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-600">Trusted</div>
                                    <div className="text-xs font-semibold text-gray-600">Worldwide</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="mb-6">
                            <div className="inline-flex items-center space-x-2 text-primary-600 font-semibold mb-4">
                                <div className="w-8 h-0.5 bg-primary-600"></div>
                                <span className="uppercase text-sm tracking-wider">WHY CHOOSE US</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-normal">
                                Your Trusted Partner <br /> for a Seamless Visa Journey
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                At Flying Horse Visa Services, we bring over 5 years of expertise to guide you through every step of the visa process. Whether you're planning to study, work, or travel abroad, our dedicated team ensures a smooth, stress-free experience with a proven track record of success.
                            </p>
                        </div>

                        {/* Services Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {/* Passport Plus */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Globe className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Passport Plus</h3>
                                </div>
                                <ul className="space-y-2 ml-15">
                                    <li className="flex items-center text-gray-600">
                                        <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">Beyond Border Immigration</span>
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">Worldwide Visa Assistance</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Global Entry */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Global Entry</h3>
                                </div>
                                <ul className="space-y-2 ml-15">
                                    <li className="flex items-center text-gray-600">
                                        <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">GlobeTrot Visa Services</span>
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-sm">Infinity Visa Solutions</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="flex items-center space-x-6">
                            <a
                                href="/contact"
                                className="inline-flex items-center px-6 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300"
                            >
                                Read More
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>

                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Need Help?</div>
                                    <div className="text-lg font-bold text-gray-900">+91 9992067200</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}