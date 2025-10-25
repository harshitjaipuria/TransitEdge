'use server'
import type { SignInCredential } from '@/@types/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

const validateCredential = async (values: SignInCredential) => {
    const { email, password } = values

    if (!email || !password) {
        return null
    }

    const bcrypt = await import('bcryptjs')

    const existingUser = await prisma.users.findUnique({
        where: { email_id: email },
    })

    if (!existingUser) {
        return null
    }

    const isValid = await bcrypt.compare(password, existingUser.password)
    if (!isValid) {
        return null
    }

    console.log('validateCredential - user role from DB:', existingUser.role)
    
    return {
        id: String(existingUser.ID),
        userName: existingUser.name,
        email: existingUser.email_id,
        avatar: null,
        role: existingUser.role,
    }
}

export default validateCredential
