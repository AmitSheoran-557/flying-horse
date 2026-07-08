import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), '.data')
const storePath = path.join(dataDir, 'store.json')

function readStore() {
    try {
        if (!fs.existsSync(storePath)) {
            return { users: [], contactMessages: [] }
        }

        const raw = fs.readFileSync(storePath, 'utf8')
        const parsed = JSON.parse(raw)

        return {
            users: Array.isArray(parsed.users) ? parsed.users : [],
            contactMessages: Array.isArray(parsed.contactMessages) ? parsed.contactMessages : [],
        }
    } catch (error) {
        return { users: [], contactMessages: [] }
    }
}

function writeStore(store) {
    fs.mkdirSync(dataDir, { recursive: true })
    fs.writeFileSync(storePath, JSON.stringify(store, null, 2))
}

export const findUserByEmail = (email) => {
    const normalizedEmail = String(email || '').trim().toLowerCase()
    return readStore().users.find((user) => user.email === normalizedEmail)
}

export const findUserById = (id) => {
    return readStore().users.find((user) => user.id === id)
}

export const createUser = (userData) => {
    const store = readStore()
    const user = {
        ...userData,
        email: String(userData.email || '').trim().toLowerCase(),
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    }

    store.users.push(user)
    writeStore(store)
    return user
}

export const createContactMessage = (messageData) => {
    const store = readStore()
    const message = {
        ...messageData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    }

    store.contactMessages.push(message)
    writeStore(store)
    return message
}
