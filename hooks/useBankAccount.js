'use client'

import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db, isFirebaseConfigured } from '@/lib/firebase'

const emptyBankAccount = {
    upi: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    ifsc: '',
}

function normalizeAccount(account) {
    return {
        id: account.id || '',
        upi: account.upi || account.upiId || '',
        bankName: account.bankName || account.bank || '',
        accountName: account.accountName || account.name || account.holderName || '',
        accountNumber: account.accountNumber || account.registeredAccountNumber || '',
        ifsc: account.ifsc || account.ifscCode || '',
        isActive: account.isActive,
        updatedAt: account.updatedAt,
        createdAt: account.createdAt,
    }
}

function getMillis(value) {
    if (!value) return 0
    if (value.toMillis) return value.toMillis()
    if (value.toDate) return value.toDate().getTime()
    const parsed = new Date(value).getTime()
    return Number.isNaN(parsed) ? 0 : parsed
}

function pickPrimaryAccount(accounts) {
    const normalizedAccounts = accounts.map(normalizeAccount)
    return normalizedAccounts.find((account) => account.isActive === true)
        || normalizedAccounts.sort((first, second) => getMillis(second.updatedAt || second.createdAt) - getMillis(first.updatedAt || first.createdAt))[0]
        || emptyBankAccount
}

export function useBankAccount() {
    const [bankAccount, setBankAccount] = useState(emptyBankAccount)
    const [loadingBankAccount, setLoadingBankAccount] = useState(true)

    useEffect(() => {
        let cancelled = false

        async function loadFallbackAccount() {
            try {
                const response = await fetch('/api/payment-account', { cache: 'no-store' })
                if (!response.ok) return
                const account = await response.json()
                if (!cancelled) {
                    setBankAccount(normalizeAccount(account))
                }
            } catch (error) {
                if (!cancelled) {
                    setBankAccount(emptyBankAccount)
                }
            } finally {
                if (!cancelled) {
                    setLoadingBankAccount(false)
                }
            }
        }

        if (!isFirebaseConfigured) {
            loadFallbackAccount()
            return () => {
                cancelled = true
            }
        }

        const unsubscribe = onSnapshot(
            collection(db, 'bankAccounts'),
            (snapshot) => {
                if (snapshot.empty) {
                    loadFallbackAccount()
                    return
                }

                if (cancelled) return
                setBankAccount(pickPrimaryAccount(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))))
                setLoadingBankAccount(false)
            },
            () => {
                loadFallbackAccount()
            }
        )

        return () => {
            cancelled = true
            unsubscribe()
        }
    }, [])

    return { bankAccount, loadingBankAccount }
}
