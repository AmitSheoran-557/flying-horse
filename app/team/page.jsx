'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Award, Users } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TeamPage() {
    const teamMembers = [
        {
            id: 1,
            name: 'Karmjeet',
            role: 'Founder & CEO',
            image: 'https://res.cloudinary.com/dw0lrectk/image/upload/q_auto/f_auto/v1773299140/fl-img_f7bozp.jpg',
            email: 'enquiry.flyhousevisaservices@gmail.com',
            phone: '+91 9992067200',
            linkedin: '#',
            specialization: 'Visa Consultation & Business Development',
            experience: '5+ years'
        },
        {
            id: 2,
            name: 'Ajay',
            role: 'MD',
            image: 'https://res.cloudinary.com/dw0lrectk/image/upload/q_auto/f_auto/v1776230763/wb-1_v4m7zx.jpg',
            email: 'enquiry.flyhousevisaservices@gmail.com',
            phone: '+91 9518002746',
            linkedin: '#',
            specialization: 'Administration',
            experience: ' '
        },
        {
            id: 3,
            name: 'Aarti',
            role: 'Senior Visa Consultant, Head of Training',
            image: 'https://res.cloudinary.com/dw0lrectk/image/upload/q_auto/f_auto/v1776231042/wb-2_h9ridj.jpg',
            email: 'enquiry.flyhousevisaservices@gmail.com',
            phone: '+91 9992067300',
            linkedin: '#',
            specialization: 'Student & Work Visa Processing',
            experience: ''
        },
    ]

    return (
        <div className="min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center space-x-2 text-blue-100 mb-4">
                            <Users className="h-6 w-6" />
                            <span className="uppercase text-sm tracking-wider font-semibold">Our Team</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Meet Our Expert Team</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Dedicated professionals committed to helping you achieve your dreams of studying and working abroad
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Team Stats */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Team Members', value: '10+' },
                            { label: 'Years Experience', value: '5+' },
                            { label: 'Success Rate', value: '98%' },
                            { label: 'Happy Students', value: '5000+' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                                <div className="text-gray-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Members Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="card overflow-hidden group"
                            >
                                {/* Image Container */}
                                <div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none'
                                            const fallback = e.currentTarget.nextElementSibling
                                            if (fallback) {
                                                fallback.classList.remove('hidden')
                                                fallback.classList.add('flex')
                                            }
                                        }}
                                    />
                                    {/* Fallback */}
                                    <div className="hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-primary-400 to-primary-600">
                                        <Users className="h-24 w-24 text-white opacity-50" />
                                    </div>

                                    {/* Experience Badge */}
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg">
                                        <div className="flex items-center space-x-1">
                                            <Award className="h-4 w-4 text-primary-600" />
                                            <span className="text-sm font-semibold text-gray-900">{member.experience}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                    <p className="text-primary-600 font-semibold mb-4">{member.role}</p>

                                    <div className="mb-4 pb-4 border-b border-gray-200">
                                        <p className="text-sm text-gray-600 mb-1">Specialization:</p>
                                        <p className="text-gray-900 font-medium">{member.specialization}</p>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2 mb-4">
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                        >
                                            <Mail className="h-4 w-4 mr-2" />
                                            {member.email}
                                        </a>
                                        <a
                                            href={`tel:${member.phone}`}
                                            className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
                                        >
                                            <Phone className="h-4 w-4 mr-2" />
                                            {member.phone}
                                        </a>
                                    </div>

                                    {/* Social Link
                                    <a
                                        href={member.linkedin}
                                        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
                                    >
                                        <Linkedin className="h-5 w-5 mr-2" />
                                        Connect on LinkedIn
                                    </a> */}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to Join Our Team?</h2>
                        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                            We're always looking for passionate professionals to join our growing team
                        </p>
                        <a
                            href="/contact"
                            className="btn-secondary inline-block"
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
