import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma'
import { auth } from '@/auth'

const prisma = new PrismaClient()

// Function to generate station code
function generateStationCode(stationName: string, pincode: string): string {
    // Extract first 3 letters from station name (uppercase)
    const nameLetters = stationName
        .replace(/[^a-zA-Z]/g, '') // Remove non-alphabetic characters
        .substring(0, 3)
        .toUpperCase()
        .padEnd(3, 'X') // Pad with 'X' if less than 3 letters
    
    // Extract last 3 digits from pincode
    const pincodeDigits = pincode
        .replace(/\D/g, '') // Remove non-digit characters
        .slice(-3) // Take last 3 digits
        .padStart(3, '0') // Pad with '0' if less than 3 digits
    
    // Generate random special character
    const specialChars = '!@#$%^&*'
    const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)]
    
    return `${nameLetters}${pincodeDigits}${randomSpecialChar}`
}

// Function to check if station code is unique
async function isStationCodeUnique(stationCode: string): Promise<boolean> {
    const existingStation = await prisma.station.findFirst({
        where: {
            station_code: stationCode
        }
    })
    return !existingStation
}

// Function to generate unique station code
async function generateUniqueStationCode(stationName: string, pincode: string): Promise<string> {
    let stationCode = generateStationCode(stationName, pincode)
    let attempts = 0
    const maxAttempts = 10
    
    while (!(await isStationCodeUnique(stationCode)) && attempts < maxAttempts) {
        // Generate new code with different special character
        const nameLetters = stationName
            .replace(/[^a-zA-Z]/g, '')
            .substring(0, 3)
            .toUpperCase()
            .padEnd(3, 'X')
        
        const pincodeDigits = pincode
            .replace(/\D/g, '')
            .slice(-3)
            .padStart(3, '0')
        
        const specialChars = '!@#$%^&*'
        const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)]
        
        stationCode = `${nameLetters}${pincodeDigits}${randomSpecialChar}`
        attempts++
    }
    
    if (attempts >= maxAttempts) {
        throw new Error('Unable to generate unique station code after multiple attempts')
    }
    
    return stationCode
}

export async function POST(request: Request) {
    try {
        // Get the current user session
        const session = await auth()
        
        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized - Please log in' },
                { status: 401 }
            )
        }

        const body = await request.json()
        
        // Extract data from the request body
        const {
            stationName,
            displayName,
            email,
            dialCode,
            phoneNumber,
            country,
            address,
            city,
            zipCode,
            contactPerson,
            activity1,
            activity2,
            activity3,
            activity4,
            activity5,
            activity6,
        } = body

        // Validate required fields
        if (!stationName || !zipCode || !contactPerson) {
            return NextResponse.json(
                { message: 'Missing required fields: stationName, zipCode, and contactPerson are required' },
                { status: 400 }
            )
        }

        // Generate unique station code
        let stationCode
        try {
            stationCode = await generateUniqueStationCode(stationName, zipCode)
        } catch (error) {
            console.error('Station code generation failed:', error)
            return NextResponse.json(
                { message: 'Failed to generate station code. Please try again.' },
                { status: 500 }
            )
        }

        // Convert phone number to BigInt for database storage
        const fullPhoneNumber = dialCode ? `${dialCode}${phoneNumber}` : phoneNumber
        let phoneNumberBigInt = null
        
        try {
            const cleanPhoneNumber = fullPhoneNumber.replace(/\D/g, '')
            if (cleanPhoneNumber) {
                phoneNumberBigInt = BigInt(cleanPhoneNumber)
            }
        } catch (error) {
            return NextResponse.json(
                { message: 'Invalid phone number format' },
                { status: 400 }
            )
        }

        // Convert zip code to integer
        const zipCodeInt = parseInt(zipCode)
        if (isNaN(zipCodeInt) || zipCodeInt <= 0) {
            return NextResponse.json(
                { message: 'Invalid zip code. Please enter a valid numeric zip code.' },
                { status: 400 }
            )
        }

        // Convert activity checkboxes to integers (1 if checked, 0 if not)
        const activity1Int = activity1 ? 1 : 0
        const activity2Int = activity2 ? 1 : 0
        const activity3Int = activity3 ? 1 : 0
        const activity4Int = activity4 ? 1 : 0
        const activity5Int = activity5 ? 1 : 0
        const activity6Int = activity6 ? 1 : 0

        // Create station in database
        const station = await prisma.station.create({
            data: {
                station_code: stationCode,
                station_name: stationName,
                address: address || null,
                city: city || null,
                zip_code: zipCodeInt,
                country: country || 'India',
                display_name: displayName || stationName,
                telephone: phoneNumberBigInt,
                email_id: email || null,
                contact_person: contactPerson,
                activity_1: activity1Int,
                activity_2: activity2Int,
                activity_3: activity3Int,
                activity_4: activity4Int,
                activity_5: activity5Int,
                activity_6: activity6Int,
            },
        })

        return NextResponse.json(
            { 
                status: 'success', 
                message: 'Station created successfully', 
                data: {
                    id: station.id,
                    station_code: station.station_code,
                    station_name: station.station_name,
                    display_name: station.display_name,
                }
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Create station error:', error)
        
        // Handle specific database errors
        if (error instanceof Error) {
            if (error.message.includes('Unique constraint')) {
                return NextResponse.json(
                    { message: 'Station with this information already exists' },
                    { status: 409 }
                )
            }
            if (error.message.includes('Unable to generate unique station code')) {
                return NextResponse.json(
                    { message: 'Unable to generate unique station code. Please try again.' },
                    { status: 500 }
                )
            }
        }
        
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    } finally {
        await prisma.$disconnect()
    }
}
