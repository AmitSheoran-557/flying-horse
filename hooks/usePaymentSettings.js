'use client'

import { useEffect, useMemo, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '@/lib/firebase'
import { useBankAccount } from '@/hooks/useBankAccount'

const defaultInstructions = [
    'Pay the selected course fee by UPI or bank transfer before submitting this form.',
    'Enter the exact UTR, transaction ID, or reference number from your payment receipt.',
    'Your payment will be reviewed by the admin after submission.',
]

const defaultSettings = {
    title: 'Manual payment instructions',
    subtitle: 'Complete your payment outside the app, then submit the details for admin approval.',
    upi: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    ifsc: '',
    instructions: defaultInstructions,
}

function normalizeInstructions(value) {
    if (Array.isArray(value)) {
        return value.map((item) => String(item || '').trim()).filter(Boolean)
    }

    if (typeof value === 'string') {
        return value.split('\n').map((item) => item.trim()).filter(Boolean)
    }

    return defaultInstructions
}

export function usePaymentSettings() {
    const { bankAccount, loadingBankAccount } = useBankAccount()
    const [settings, setSettings] = useState({})
    const [loadingSettings, setLoadingSettings] = useState(true)

    useEffect(() => {
        if (!isFirebaseConfigured) {
            setLoadingSettings(false)
            return undefined
        }

        const unsubscribe = onSnapshot(
            doc(db, 'settings', 'payment'),
            (snapshot) => {
                setSettings(snapshot.exists() ? snapshot.data() : {})
                setLoadingSettings(false)
            },
            () => {
                setSettings({})
                setLoadingSettings(false)
            }
        )

        return () => unsubscribe()
    }, [])

    const paymentSettings = useMemo(() => {
        return {
            ...defaultSettings,
            ...bankAccount,
            ...settings,
            instructions: normalizeInstructions(settings.instructions),
        }
    }, [bankAccount, settings])

    return {
        paymentSettings,
        loadingPaymentSettings: loadingSettings || loadingBankAccount,
    }
}

export { defaultInstructions, defaultSettings }
