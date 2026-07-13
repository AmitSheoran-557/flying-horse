'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { CheckCircle, CreditCard, Plus, Save, Trash2 } from 'lucide-react'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import { defaultSettings } from '@/hooks/usePaymentSettings'

function normalizeForm(data = {}) {
    return {
        title: data.title || defaultSettings.title,
        subtitle: data.subtitle || defaultSettings.subtitle,
        upi: data.upi || '',
        bankName: data.bankName || '',
        accountName: data.accountName || '',
        accountNumber: data.accountNumber || '',
        ifsc: data.ifsc || '',
        instructions: Array.isArray(data.instructions) && data.instructions.length
            ? data.instructions
            : defaultSettings.instructions,
    }
}

function ActionIconButton({ label, icon: Icon, tone = 'default', ...props }) {
    const toneClass = tone === 'danger'
        ? 'border-red-200 text-red-600 hover:bg-red-50'
        : 'border-gray-200 text-gray-700 hover:bg-gray-50'

    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border transition disabled:cursor-not-allowed disabled:opacity-50 ${toneClass}`}
            {...props}
        >
            <Icon className="h-5 w-5" />
        </button>
    )
}

export default function PaymentSettingsManager() {
    const [form, setForm] = useState(defaultSettings)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        async function loadSettings() {
            if (!isFirebaseConfigured) {
                setLoading(false)
                return
            }

            try {
                const snapshot = await getDoc(doc(db, 'settings', 'payment'))
                setForm(normalizeForm(snapshot.exists() ? snapshot.data() : {}))
            } catch (error) {
                toast.error('Could not load payment settings.')
            } finally {
                setLoading(false)
            }
        }

        loadSettings()
    }, [])

    function updateField(name, value) {
        setForm((current) => ({ ...current, [name]: value }))
    }

    function updateInstruction(index, value) {
        setForm((current) => ({
            ...current,
            instructions: current.instructions.map((item, itemIndex) => itemIndex === index ? value : item),
        }))
    }

    function addInstruction() {
        setForm((current) => ({
            ...current,
            instructions: [...current.instructions, ''],
        }))
    }

    function removeInstruction(index) {
        setForm((current) => ({
            ...current,
            instructions: current.instructions.filter((_, itemIndex) => itemIndex !== index),
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const instructions = form.instructions.map((item) => item.trim()).filter(Boolean)
        if (!form.title.trim() || !form.subtitle.trim() || !form.upi.trim() || !form.bankName.trim() || !form.accountName.trim() || !form.accountNumber.trim() || !form.ifsc.trim() || !instructions.length) {
            toast.error('Please fill all payment setting fields.')
            return
        }

        setSaving(true)
        try {
            const payload = {
                title: form.title.trim(),
                subtitle: form.subtitle.trim(),
                upi: form.upi.trim(),
                bankName: form.bankName.trim(),
                accountName: form.accountName.trim(),
                accountNumber: form.accountNumber.trim(),
                ifsc: form.ifsc.trim(),
                instructions,
                updatedAt: serverTimestamp(),
            }

            await setDoc(doc(db, 'settings', 'payment'), payload, { merge: true })
            await setDoc(doc(db, 'bankAccounts', 'primary'), {
                upi: payload.upi,
                bankName: payload.bankName,
                accountName: payload.accountName,
                accountNumber: payload.accountNumber,
                ifsc: payload.ifsc,
                isActive: true,
                updatedAt: serverTimestamp(),
            }, { merge: true })

            setForm(normalizeForm(payload))
            toast.success('Payment settings saved.')
        } catch (error) {
            toast.error(error?.message || 'Could not save payment settings.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <main className="px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-950">Settings</h1>
                <p className="mt-2 text-slate-600">Update payment details shown on the website.</p>

                <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <CreditCard className="h-8 w-8 text-primary-600" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-950">Manual payment instructions</h2>
                                <p className="text-sm text-gray-500">These fields control the payment card shown on the website.</p>
                            </div>
                        </div>

                        {loading ? <p className="mt-5 text-gray-600">Loading settings...</p> : null}

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <label className="md:col-span-2">
                                <span className="text-sm font-semibold text-gray-700">Card title</span>
                                <input className="input-field mt-1" value={form.title} onChange={(event) => updateField('title', event.target.value)} required />
                            </label>
                            <label className="md:col-span-2">
                                <span className="text-sm font-semibold text-gray-700">Description</span>
                                <textarea className="input-field mt-1 min-h-[92px]" value={form.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">UPI</span>
                                <input className="input-field mt-1" value={form.upi} onChange={(event) => updateField('upi', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Bank</span>
                                <input className="input-field mt-1" value={form.bankName} onChange={(event) => updateField('bankName', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Account</span>
                                <input className="input-field mt-1" value={form.accountName} onChange={(event) => updateField('accountName', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Registered A/C No</span>
                                <input className="input-field mt-1" value={form.accountNumber} onChange={(event) => updateField('accountNumber', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">IFSC</span>
                                <input className="input-field mt-1" value={form.ifsc} onChange={(event) => updateField('ifsc', event.target.value)} required />
                            </label>
                        </div>

                        <div className="mt-5">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-gray-700">Instruction lines</span>
                                <button type="button" onClick={addInstruction} className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                                    <Plus className="mr-2 h-4 w-4" /> Add line
                                </button>
                            </div>
                            <div className="mt-3 space-y-3">
                                {form.instructions.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input className="input-field" value={item} onChange={(event) => updateInstruction(index, event.target.value)} required />
                                        <ActionIconButton label="Delete instruction" icon={Trash2} tone="danger" onClick={() => removeInstruction(index)} disabled={form.instructions.length === 1} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button disabled={saving || loading} className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70">
                            <Save className="mr-2 h-5 w-5" /> {saving ? 'Saving...' : 'Save settings'}
                        </button>
                    </form>

                    <aside className="rounded-2xl bg-gray-950 p-6 text-white shadow-xl">
                        <CreditCard className="h-10 w-10 text-primary-300" />
                        <h2 className="mt-4 text-3xl font-bold">{form.title}</h2>
                        <p className="mt-3 text-gray-300">{form.subtitle}</p>
                        <div className="mt-6 space-y-3 rounded-xl bg-white/10 p-4">
                            <p><span className="text-gray-300">UPI:</span> {form.upi || 'your-upi-id@bank'}</p>
                            <p><span className="text-gray-300">Bank:</span> {form.bankName || 'Your Bank Name'}</p>
                            <p><span className="text-gray-300">Account:</span> {form.accountName || 'Flying Horse LMS'}</p>
                            <p><span className="text-gray-300">Registered A/C No:</span> {form.accountNumber || '000000000000'}</p>
                            <p><span className="text-gray-300">IFSC:</span> {form.ifsc || 'IFSC0000000'}</p>
                        </div>
                        <div className="mt-6 space-y-3">
                            {form.instructions.filter(Boolean).map((item) => (
                                <div key={item} className="flex gap-3 text-sm text-gray-200">
                                    <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-green-300" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}
