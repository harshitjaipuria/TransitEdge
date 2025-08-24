import { StaticImageData } from 'next/image'

// doctor - landing ===============================

// health service
export interface HealthServiceData {
  id: number
  icon: string
  iconColor: string
  iconBg: string
  iconBgColor: string
  title: string
  desc: string
}

// expert doctor
export interface ExpertDoctorData {
  id: number
  rating: string
  image: StaticImageData
  name: string
  dutyPlace: string
  specialist: string
}

//  guenon patient
export interface PatientData {
  id: number
  name: string
  home: string
  image: StaticImageData
  comment: string
}

// school - landing ===============================
// students review
export interface StudentsReviewData {
  image: StaticImageData
  title: string
  text: string
  rating: number
}

// ecommerce - landing =============================
// products
export interface EcommerceLandingProduct {
  id: number
  name: string
  price: string
  image: StaticImageData
  category: string
}
