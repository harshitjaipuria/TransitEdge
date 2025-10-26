export interface Station {
    id: number
    station_code: string
    station_name: string
    address: string
    city: string
    zip_code: number
    country: string
    display_name: string
    telephone: string | null
    email_id: string
    contact_person: string
    activity_1: number
    activity_2: number
    activity_3: number
    activity_4: number
    activity_5: number
    activity_6: number
    created_at: string
}

export interface StationFormData {
    station_code: string
    station_name: string
    address: string
    city: string
    zip_code: string
    country: string
    display_name: string
    telephone: string
    email_id: string
    contact_person: string
    activity_1: boolean
    activity_2: boolean
    activity_3: boolean
    activity_4: boolean
    activity_5: boolean
    activity_6: boolean
}

export interface StationListResponse {
    data: Station[]
    total: number
    page: number
    limit: number
}
