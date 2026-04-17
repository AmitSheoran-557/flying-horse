'use client'

import { motion } from 'framer-motion'
import { Compass, GraduationCap, FileText, Globe, Briefcase, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function OurServicesSection() {
    const services = [
        {
            icon: <Compass className="h-8 w-8 text-primary-600" />,
            title: 'Career Counselling',
            description: 'Helping students choose the right career path based on interest and opportunities.'
        },
        {
            icon: <GraduationCap className="h-8 w-8 text-primary-600" />,
            title: 'College Selection',
            description: 'Guidance in selecting the best colleges and universities suited to your profile and goals.'
        },
        {
            icon: <FileText className="h-8 w-8 text-primary-600" />,
            title: 'Admission Assistance',
            description: 'Support with application, documentation and the complete admission process.'
        },
        {
            icon: <Globe className="h-8 w-8 text-primary-600" />,
            title: 'Visa Processing',
            description: 'End-to-end visa application support for student, work, tourist and Ausbildung visas.'
        },
        {
            icon: <BookOpen className="h-8 w-8 text-primary-600" />,
            title: 'Language Training',
            description: 'Expert coaching for IELTS, PTE and Spoken English to meet international requirements.'
        },
        {
            icon: <Briefcase className="h-8 w-8 text-primary-600" />,
            title: 'Job Placement',
            description: 'Connecting qualified candidates with employment opportunities abroad.'
        }
    ]

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center space-x-2 text-primary-600 font-semibold mb-3">
                        <div className="w-8 h-0.5 bg-primary-600"></div>
                        <span className="uppercase text-sm tracking-wider">What We Offer</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
                </motion.div>

                {/* Services Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-primary-200 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="mb-4">{service.icon}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* About Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - About Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 text-primary-600 font-semibold mb-3">
                            <div className="w-8 h-0.5 bg-primary-600"></div>
                            <span className="uppercase text-sm tracking-wider">Who We Are</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            About Flying Horse Visa Services
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">
                            Flying Horse Visa Services empowers students and professionals to make informed career and immigration choices in a rapidly changing global landscape.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            With over 5 years of experience, our team of certified consultants has helped thousands of individuals successfully obtain visas, secure admissions, and build careers abroad. We are based in Hisar, Haryana and serve clients across India.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors duration-300"
                        >
                            Talk to a Consultant
                        </Link>
                    </motion.div>

                    {/* Right - Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[
                            { value: '5+', label: 'Years of Experience' },
                            { value: '5000+', label: 'Successful Cases' },
                            { value: '98%', label: 'Visa Success Rate' },
                            { value: '20+', label: 'Countries Covered' }
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center"
                            >
                                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
