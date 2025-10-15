type PersonalInfo = {
    location: string
    title: string
    birthday: string
    phoneNumber: string
    dialCode: string
    address: string
    postcode: string
    city: string
    country: string
    facebook: string
    twitter: string
    pinterest: string
    linkedIn: string
}

export type GetLorriesListResponse = {
    list: Lorry[]
    total: number
}

export type Filter = {
    lorryName: string
    status: Array<string>
}

export type Lorry = {
    id: string
    name: string
    registrationNumber: string
    make?: string
    model?: string
    year?: number
    capacityKg?: number
    status: string
    img?: string
    lastServiceDate?: string
    insuranceExpiry?: string
    personalInfo?: PersonalInfo
}


