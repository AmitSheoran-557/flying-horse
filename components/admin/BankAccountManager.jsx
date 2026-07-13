'use client'

import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { CreditCard, Pencil, Plus, Save, Trash2, X } from 'lucide-react'
import { db, isFirebaseConfigured } from '@/lib/firebase'

const emptyForm = {
    accountName: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upi: '',
    isActive: true,
}

function ActionIconButton({ label, icon: Icon, tone = 'default', ...props }) {
    const toneClass = tone === 'danger'
        ? 'border-red-200 text-red-600 hover:bg-red-50'
        : tone === 'primary'
            ? 'border-primary-200 text-primary-700 hover:bg-primary-50'
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

export default function BankAccountManager() {
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [editingId, setEditingId] = useState('')
    const [form, setForm] = useState(emptyForm)

    useEffect(() => {
        if (!isFirebaseConfigured) {
            setLoading(false)
            return undefined
        }

        const unsubscribe = onSnapshot(
            collection(db, 'bankAccounts'),
            (snapshot) => {
                setAccounts(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
                setLoading(false)
            },
            () => {
                toast.error('Could not load bank accounts.')
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [])

    const sortedAccounts = useMemo(() => {
        return [...accounts].sort((first, second) => Number(second.isActive === true) - Number(first.isActive === true))
    }, [accounts])

    function updateField(name, value) {
        setForm((current) => ({ ...current, [name]: value }))
    }

    function startCreate() {
        setEditingId('')
        setForm(emptyForm)
    }

    function startEdit(account) {
        setEditingId(account.id)
        setForm({
            accountName: account.accountName || '',
            bankName: account.bankName || '',
            accountNumber: account.accountNumber || '',
            ifsc: account.ifsc || '',
            upi: account.upi || '',
            isActive: account.isActive !== false,
        })
    }

    async function handleSave(event) {
        event.preventDefault()

        if (!form.accountName.trim() || !form.bankName.trim() || !form.accountNumber.trim() || !form.ifsc.trim()) {
            toast.error('Please fill account name, bank name, account number, and IFSC.')
            return
        }

        setSaving(true)
        try {
            const payload = {
                accountName: form.accountName.trim(),
                bankName: form.bankName.trim(),
                accountNumber: form.accountNumber.trim(),
                ifsc: form.ifsc.trim(),
                upi: form.upi.trim(),
                isActive: form.isActive,
                updatedAt: serverTimestamp(),
            }

            if (editingId) {
                await setDoc(doc(db, 'bankAccounts', editingId), payload, { merge: true })
            } else {
                await addDoc(collection(db, 'bankAccounts'), {
                    ...payload,
                    createdAt: serverTimestamp(),
                })
            }

            toast.success('Bank account saved.')
            startCreate()
        } catch (error) {
            toast.error(error?.message || 'Could not save bank account.')
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(accountId) {
        const confirmed = window.confirm('Delete this bank account?')
        if (!confirmed) return

        try {
            await deleteDoc(doc(db, 'bankAccounts', accountId))
            toast.success('Bank account deleted.')
            if (editingId === accountId) startCreate()
        } catch (error) {
            toast.error(error?.message || 'Could not delete bank account.')
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <p className="font-semibold text-primary-600">Admin panel</p>
                        <h1 className="text-3xl font-bold text-gray-950">Bank Account</h1>
                    </div>
                    <button onClick={startCreate} className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 font-semibold text-white transition hover:bg-primary-700">
                        <Plus className="mr-2 h-5 w-5" /> Add account
                    </button>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-950">Saved accounts</h2>
                        <div className="mt-4 space-y-3">
                            {loading ? <p className="text-gray-600">Loading accounts...</p> : null}
                            {!loading && !sortedAccounts.length ? <p className="text-gray-600">No bank account has been added yet.</p> : null}
                            {sortedAccounts.map((account) => (
                                <article key={account.id} className="rounded-xl border border-gray-200 p-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-5 w-5 text-primary-600" />
                                                <h3 className="font-bold text-gray-950">{account.accountName || 'Bank account'}</h3>
                                                {account.isActive !== false ? <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">Active</span> : null}
                                            </div>
                                            <p className="mt-2 text-sm text-gray-600">{account.bankName}</p>
                                            <p className="text-sm font-semibold text-gray-950">{account.accountNumber}</p>
                                            <p className="text-sm text-gray-600">IFSC: {account.ifsc}</p>
                                            {account.upi ? <p className="text-sm text-gray-600">UPI: {account.upi}</p> : null}
                                        </div>
                                        <div className="flex flex-none gap-2">
                                            <ActionIconButton label="Edit account" icon={Pencil} tone="primary" onClick={() => startEdit(account)} />
                                            <ActionIconButton label="Delete account" icon={Trash2} tone="danger" onClick={() => handleDelete(account.id)} />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <form onSubmit={handleSave} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-xl font-bold text-gray-950">{editingId ? 'Edit bank account' : 'Add bank account'}</h2>
                            {editingId ? <ActionIconButton label="Cancel edit" icon={X} onClick={startCreate} /> : null}
                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Account name</span>
                                <input className="input-field mt-1" value={form.accountName} onChange={(event) => updateField('accountName', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Bank name</span>
                                <input className="input-field mt-1" value={form.bankName} onChange={(event) => updateField('bankName', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">Account number</span>
                                <input className="input-field mt-1" value={form.accountNumber} onChange={(event) => updateField('accountNumber', event.target.value)} required />
                            </label>
                            <label>
                                <span className="text-sm font-semibold text-gray-700">IFSC</span>
                                <input className="input-field mt-1" value={form.ifsc} onChange={(event) => updateField('ifsc', event.target.value)} required />
                            </label>
                            <label className="md:col-span-2">
                                <span className="text-sm font-semibold text-gray-700">UPI ID</span>
                                <input className="input-field mt-1" value={form.upi} onChange={(event) => updateField('upi', event.target.value)} />
                            </label>
                            <label className="flex items-center gap-3 md:col-span-2">
                                <input type="checkbox" checked={form.isActive} onChange={(event) => updateField('isActive', event.target.checked)} className="h-4 w-4 rounded border-gray-300 text-primary-600" />
                                <span className="text-sm font-semibold text-gray-700">Use this account on the website</span>
                            </label>
                        </div>

                        <button disabled={saving} className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-gray-950 px-5 py-3 font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70">
                            <Save className="mr-2 h-5 w-5" /> {saving ? 'Saving...' : 'Save changes'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}
