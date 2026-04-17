// Simple in-memory data store for demo purposes
// In production, replace with a proper database

// In-memory storage
export const users = []
export const contactMessages = []

// Helper functions
export const findUserByEmail = (email) => {
    return users.find(user => user.email === email)
}

export const findUserById = (id) => {
    return users.find(user => user.id === id)
}

export const createUser = (userData) => {
    const user = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date()
    }
    users.push(user)
    return user
}

export const createContactMessage = (messageData) => {
    const message = {
        ...messageData,
        id: Date.now().toString(),
        createdAt: new Date()
    }
    contactMessages.push(message)
    return message
}