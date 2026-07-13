'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle, Clock, CreditCard, GraduationCap, ShieldCheck, Users, Video } from 'lucide-react'
import { collection, getDocs } from 'firebase/firestore'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import { usePaymentSettings } from '@/hooks/usePaymentSettings'

export default function HomePage() {
    const [batches, setBatches] = useState([])
    const [loadingBatches, setLoadingBatches] = useState(true)
    const { paymentSettings } = usePaymentSettings()

    const highlights = [
        { icon: Video, title: 'Unlocked Video Lessons', text: 'Access batch videos and individual lessons after admin approval.' },
        { icon: Users, title: 'Batch-Based Learning', text: 'Join structured course batches with focused progress tracking.' },
        { icon: ShieldCheck, title: 'UTR Verification', text: 'Submit only your UTR number for admin review and activation.' },
    ]

    useEffect(() => {
        async function loadBatches() {
            if (!isFirebaseConfigured) {
                setBatches([])
                setLoadingBatches(false)
                return
            }

            try {
                const snapshot = await getDocs(collection(db, 'batches'))
                setBatches(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
            } catch (error) {
                setBatches([])
            } finally {
                setLoadingBatches(false)
            }
        }

        loadBatches()
    }, [])

    const batchOptions = useMemo(() => {
        return batches
            .map((batch) => ({
                id: String(batch.id || '').trim(),
                name: String(batch.name || batch.title || batch.courseName || '').trim(),
                amount: String(batch.amount || batch.price || batch.fee || '').trim(),
                duration: String(batch.duration || batch.batchDuration || '').trim(),
                highlight: String(batch.highlight || batch.description || batch.summary || '').trim(),
            }))
            .filter((batch) => batch.id && batch.name && batch.amount)
    }, [batches])

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <section className="bg-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
                    <div className="flex flex-col justify-center">
                        <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-700">
                            <GraduationCap className="h-4 w-4" />
                            Online Student LMS
                        </span>
                        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            Learn smarter with batch-wise online courses.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
                            Pay to the registered account shown here, submit your UTR number, and unlock the right videos as soon as your payment is approved.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/subscribe" className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-700">
                                Subscribe Now <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link href="/student/login" className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 transition hover:border-primary-500 hover:text-primary-700">
                                Student Login
                            </Link>
                        </div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-slate-900 p-5 text-white shadow-2xl">
                        <div className="rounded-xl bg-white p-4 text-gray-900">
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Student progress</p>
                                    <h2 className="text-xl font-bold">Course Dashboard</h2>
                                </div>
                                <BookOpen className="h-8 w-8 text-primary-600" />
                            </div>
                            <div className="mt-5 space-y-4">
                                {loadingBatches ? (
                                    <div className="rounded-lg border border-gray-200 p-4 text-sm font-semibold text-gray-500">
                                        Loading batches...
                                    </div>
                                ) : null}
                                {!loadingBatches && !batchOptions.length ? (
                                    <div className="rounded-lg border border-gray-200 p-4 text-sm font-semibold text-gray-500">
                                        No batches are available right now.
                                    </div>
                                ) : null}
                                {batchOptions.slice(0, 3).map((course, index) => (
                                    <div key={course.id} className="rounded-lg border border-gray-200 p-4">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <h3 className="font-semibold">{course.name}</h3>
                                                <p className="text-sm text-gray-500">{course.duration || 'Active batch'}</p>
                                            </div>
                                            <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                                                Rs. {course.amount}
                                            </span>
                                        </div>
                                        <div className="mt-3 h-2 rounded-full bg-gray-100">
                                            <div className="h-2 rounded-full bg-primary-600" style={{ width: `${58 + index * 14}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 rounded-xl bg-white/10 p-4 text-sm">
                            <div className="flex items-center gap-2 text-primary-100">
                                <CreditCard className="h-4 w-4" />
                                <span className="font-semibold">Registered payment account</span>
                            </div>
                            <div className="mt-3 grid gap-2 text-gray-100 sm:grid-cols-2">
                                <p><span className="text-gray-300">A/C No:</span> {paymentSettings.accountNumber || 'Loading...'}</p>
                                <p><span className="text-gray-300">IFSC:</span> {paymentSettings.ifsc || 'Loading...'}</p>
                                <p><span className="text-gray-300">UPI:</span> {paymentSettings.upi || 'Loading...'}</p>
                                <p><span className="text-gray-300">Bank:</span> {paymentSettings.bankName || 'Loading...'}</p>
                            </div>
                            <p className="mt-3 text-gray-300">No screenshot upload is required. Keep your UTR number ready after payment.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="grid gap-5 md:grid-cols-3">
                    {highlights.map((item) => (
                        <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <item.icon className="h-9 w-9 text-primary-600" />
                            <h2 className="mt-4 text-xl font-bold text-gray-950">{item.title}</h2>
                            <p className="mt-2 text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-white py-14">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <p className="font-semibold text-primary-600">Courses and subscriptions</p>
                            <h2 className="mt-2 text-3xl font-bold text-gray-950">Choose the batch that fits your goal.</h2>
                        </div>
                        <Link href="/subscribe" className="inline-flex items-center font-semibold text-primary-700">
                            Start subscription <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {loadingBatches ? (
                            <div className="rounded-xl border border-gray-200 p-6 text-gray-600 shadow-sm">
                                Loading batches...
                            </div>
                        ) : null}
                        {!loadingBatches && !batchOptions.length ? (
                            <div className="rounded-xl border border-gray-200 p-6 text-gray-600 shadow-sm">
                                No batches are available right now. Please check again later.
                            </div>
                        ) : null}
                        {batchOptions.map((course) => (
                            <div key={course.id} className="rounded-xl border border-gray-200 p-6 shadow-sm">
                                <div className="flex items-center gap-3 text-primary-700">
                                    <Clock className="h-5 w-5" />
                                    <span className="font-semibold">{course.duration || 'Active batch'}</span>
                                </div>
                                <h3 className="mt-4 text-2xl font-bold text-gray-950">{course.name}</h3>
                                <p className="mt-3 min-h-[72px] text-gray-600">{course.highlight || 'Course details are managed by admin.'}</p>
                                <div className="mt-5 flex items-end gap-2">
                                    <span className="text-3xl font-bold text-gray-950">Rs. {course.amount}</span>
                                    <span className="pb-1 text-gray-500">one-time</span>
                                </div>
                                <Link href={`/subscribe?course=${course.id}`} className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-950 px-4 py-3 font-semibold text-white transition hover:bg-primary-700">
                                    Subscribe
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-primary-700 px-6 py-10 text-white md:px-10">
                    <CheckCircle className="h-10 w-10" />
                    <h2 className="mt-4 text-3xl font-bold">Already subscribed?</h2>
                    <p className="mt-3 max-w-2xl text-primary-50">Log in to check your payment status and continue watching unlocked course videos after activation.</p>
                    <Link href="/student/login" className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 font-semibold text-primary-700 transition hover:bg-primary-50">
                        Student Login
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    )
}
