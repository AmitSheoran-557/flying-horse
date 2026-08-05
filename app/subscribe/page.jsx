'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { addDoc, collection, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import { ArrowLeft, BadgeIndianRupee, CheckCircle, CreditCard } from 'lucide-react'
import { auth, db, isFirebaseConfigured } from '@/lib/firebase'
import { usePaymentSettings } from '@/hooks/usePaymentSettings'

const MIN_AMOUNT = 1
const MAX_AMOUNT = 1000000

function SubscribeForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedCourse = searchParams.get('course')
    const [batches, setBatches] = useState([])
    const [loadingBatches, setLoadingBatches] = useState(true)
    const { paymentSettings, loadingPaymentSettings } = usePaymentSettings()
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        batchId: '',
        amount: '',
        utrNumber: '',
        password: '',
    })

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
                console.error('Failed to load batches.', {
                    code: error.code,
                    message: error.message,
                    projectId: db.app.options.projectId,
                })
                setBatches([])
            } finally {
                setLoadingBatches(false)
            }
        }

        loadBatches()
    }, [])

    const batchOptions = useMemo(() => {
        if (batches.length) {
            return batches
                .map((batch) => ({
                    id: String(batch.id || '').trim(),
                    name: String(batch.name || batch.title || batch.courseName || '').trim(),
                    amount: String(batch.amount || batch.price || batch.fee || '').trim(),
                    description: String(batch.description || batch.summary || batch.highlight || '').trim(),
                }))
                // Existing batch documents do not include an amount field, so do not
                // hide otherwise valid batches from the picker.
                .filter((batch) => batch.id && batch.name)
        }

        return []
    }, [batches])

    useEffect(() => {
        if (!batchOptions.length) return

        setForm((current) => {
            const currentBatch = batchOptions.find((batch) => batch.id === current.batchId)
            if (currentBatch) {
                return {
                    ...current,
                    amount: current.amount || currentBatch.amount,
                }
            }

            const queryBatch = batchOptions.find((batch) => batch.id === selectedCourse)
            if (queryBatch) {
                return {
                    ...current,
                    batchId: queryBatch.id,
                    amount: queryBatch.amount,
                }
            }

            return {
                ...current,
                batchId: '',
                amount: '',
            }
        })
    }, [batchOptions, selectedCourse])

    const selectedBatch = batchOptions.find((batch) => batch.id === form.batchId)
    const selectedBatchName = selectedBatch?.name || ''

    function updateField(name, value) {
        if (name === 'batchId') {
            const selected = batchOptions.find((batch) => batch.id === value)
            if (!selected) {
                setForm((current) => ({
                    ...current,
                    batchId: '',
                    amount: '',
                }))
                return
            }

            setForm((current) => ({
                ...current,
                batchId: selected.id,
                amount: selected.amount,
            }))
            return
        }

        setForm((current) => ({ ...current, [name]: value }))
    }

    function updateAmount(value) {
        // A text input with inputMode="numeric" gives mobile users a numeric
        // keyboard, while this removes pasted letters, signs, decimals, and other
        // non-numeric characters that a type="number" input can still accept.
        const digitsOnly = value.replace(/\D/g, '')
        const amount = Number(digitsOnly)
        const safeValue = amount > MAX_AMOUNT ? String(MAX_AMOUNT) : digitsOnly
        setForm((current) => ({ ...current, amount: safeValue }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (!isFirebaseConfigured) {
            toast.error('Firebase environment variables are not configured.')
            return
        }

        const amount = Number(form.amount)
        if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !selectedBatch || !form.utrNumber.trim() || !form.password) {
            toast.error('Please fill all required fields.')
            return
        }

        if (!Number.isInteger(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
            toast.error(`Enter a whole-number amount between Rs. ${MIN_AMOUNT} and Rs. ${MAX_AMOUNT.toLocaleString()}.`)
            return
        }

        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters.')
            return
        }

        if (!paymentSettings.accountNumber) {
            toast.error('Payment account details are still loading. Please try again.')
            return
        }

        setSubmitting(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password)
            const uid = userCredential.user.uid
            await updateProfile(userCredential.user, { displayName: form.name.trim() })

            await setDoc(doc(db, 'users', uid), {
                role: 'student',
                email: form.email.trim(),
                displayName: form.name.trim(),
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            })

            await setDoc(doc(db, 'students', uid), {
                name: form.name.trim(),
                fullName: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                batchId: form.batchId,
                batchName: selectedBatchName,
                course: selectedBatchName,
                amount,
                utrNumber: form.utrNumber.trim(),
                joiningDate: new Date().toISOString().slice(0, 10),
                paymentMode: 'Online',
                paymentStatus: 'Pending',
                accountStatus: 'Blocked',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            })

            await addDoc(collection(db, 'paymentRequests'), {
                studentId: uid,
                studentName: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
                batchId: form.batchId,
                batchName: selectedBatchName,
                amount,
                utrNumber: form.utrNumber.trim(),
                registeredAccountNumber: paymentSettings.accountNumber,
                paymentMode: 'Online',
                status: 'Pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            })

            await addDoc(collection(db, 'notifications'), {
                type: 'payment',
                title: 'New payment request',
                message: `${form.name.trim()} submitted a payment request for Rs. ${amount}.`,
                read: false,
                createdAt: serverTimestamp(),
            })

            toast.success('Subscription submitted. Your payment is under review.')
            router.push('/student/dashboard')
        } catch (error) {
            const message = error?.code === 'auth/email-already-in-use'
                ? 'This email is already registered. Please log in or use another email.'
                : error?.message || 'Could not submit subscription.'
            toast.error(message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <Link href="/" className="inline-flex items-center text-sm font-semibold text-primary-700">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
                </Link>
                <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <aside className="rounded-2xl bg-gray-950 p-6 text-white shadow-xl">
                        <CreditCard className="h-10 w-10 text-primary-300" />
                        <h1 className="mt-4 text-3xl font-bold">{paymentSettings.title}</h1>
                        <p className="mt-3 text-gray-300">{paymentSettings.subtitle}</p>
                        <div className="mt-6 space-y-3 rounded-xl bg-white/10 p-4">
                            {loadingPaymentSettings ? (
                                <p className="text-gray-300">Loading registered account details...</p>
                            ) : (
                                <>
                                    <p><span className="text-gray-300">UPI:</span> {paymentSettings.upi || 'Not available'}</p>
                                    <p><span className="text-gray-300">Bank:</span> {paymentSettings.bankName || 'Not available'}</p>
                                    <p><span className="text-gray-300">Account:</span> {paymentSettings.accountName || 'Not available'}</p>
                                    <p><span className="text-gray-300">Registered A/C No:</span> {paymentSettings.accountNumber || 'Not available'}</p>
                                    <p><span className="text-gray-300">IFSC:</span> {paymentSettings.ifsc || 'Not available'}</p>
                                </>
                            )}
                        </div>
                        <div className="mt-6 space-y-3">
                            {paymentSettings.instructions.map((item) => (
                                <div key={item} className="flex gap-3 text-sm text-gray-200">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-green-300" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </aside>

                    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <BadgeIndianRupee className="h-8 w-8 text-primary-600" />
                            <div>
                                <h2 className="text-2xl font-bold text-gray-950">Subscribe to a course</h2>
                                <p className="text-sm text-gray-500">Your account activates after admin payment approval.</p>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <label className="md:col-span-2">
                                <span className="text-sm font-semibold text-gray-700">Full name</span>
                                <input className="input-field mt-1" value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Email</span>
                                <input type="email" className="input-field mt-1" value={form.email} onChange={(event) => updateField('email', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Phone</span>
                                <input className="input-field mt-1" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Selected batch/course</span>
                                <select className="input-field mt-1" value={selectedBatch ? form.batchId : ''} onChange={(event) => updateField('batchId', event.target.value)} disabled={loadingBatches} required>
                                    <option value="">{loadingBatches ? 'Loading batches...' : 'Select a batch'}</option>
                                    {batchOptions.map((batch) => (
                                        <option key={batch.id} value={batch.id}>{batch.name}</option>
                                    ))}
                                </select>
                                {!loadingBatches && !batchOptions.length ? (
                                    <p className="mt-1 text-sm text-red-600">No batches are available. Please contact admin.</p>
                                ) : null}
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Amount</span>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="input-field mt-1"
                                    value={form.amount}
                                    onChange={(event) => updateAmount(event.target.value)}
                                    placeholder={`Rs. ${MIN_AMOUNT} to Rs. ${MAX_AMOUNT.toLocaleString()}`}
                                    aria-describedby="amount-help"
                                    required
                                />
                                <p id="amount-help" className="mt-1 text-xs text-gray-500">
                                    Enter a whole amount from Rs. {MIN_AMOUNT} to Rs. {MAX_AMOUNT.toLocaleString()}. Selecting a batch fills its fee, which you can edit.
                                </p>
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">UTR / transaction number</span>
                                <input className="input-field mt-1" value={form.utrNumber} onChange={(event) => updateField('utrNumber', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Password for student login</span>
                                <input type="password" minLength={6} className="input-field mt-1" value={form.password} onChange={(event) => updateField('password', event.target.value)} required />
                            </label>
                        </div>

                        <button type="submit" disabled={submitting || loadingPaymentSettings} className="mt-6 w-full rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70">
                            {submitting ? 'Submitting...' : 'Submit Subscription'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default function SubscribePage() {
    return (
        <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50 text-gray-700">Loading subscription...</main>}>
            <SubscribeForm />
        </Suspense>
    )
}
