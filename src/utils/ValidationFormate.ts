import { StaticImageData } from 'next/image'
import { FieldValues, Path, UseFormSetError, UseFormSetValue } from 'react-hook-form'

// phone number validation
export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, '') // Remove any non-numeric characters
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]}`
  }
  return value
}

export const handleFileUpload = <T extends FieldValues>(
  file: File | null,
  setPreview: React.Dispatch<React.SetStateAction<string | null | StaticImageData>>,
  setValue: UseFormSetValue<T>,
  setError: UseFormSetError<T>,
  fieldName: Path<T>, // Dynamic field name based on the generic type
): boolean => {
  // Clear any previous errors
  setError(fieldName, { type: 'manual', message: '' })

  // Validate file presence
  if (!file) {
    setError(fieldName, { type: 'manual', message: 'File is required' })
    return false
  }

  // Validate file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
  if (!validTypes.includes(file.type)) {
    setError(fieldName, {
      type: 'manual',
      message: 'Invalid file type. Please select an image file (.png, .jpg, .jpeg)',
    })
    return false
  }

  // Read the file
  const reader = new FileReader()
  reader.onloadend = () => {
    setPreview(reader.result as string)
    setValue(fieldName, file as T[typeof fieldName]) // No casting needed here
  }
  reader.readAsDataURL(file)

  return true // No error occurred
}

// validate fields
export const validateField = (
  fieldName: string,
  type: 'email' | 'text' | 'phone' | 'date', // Added "date" type
  value: string,
) => {
  const validations: { required: string; pattern: string } = {
    required: `${fieldName} is required.`,
    pattern: '',
  }

  // Check for required field
  if (!value) {
    return validations
  }

  if (type === 'email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(value)) {
      validations.pattern = `Please enter a valid ${fieldName}.`
    }
  }

  if (type === 'phone') {
    const phoneRegex = /^\d{10}$/ // Check for exactly 10 digits
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      validations.pattern = `Please enter a valid ${fieldName}.`
    }
  }

  if (type === 'date') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // Check for YYYY-MM-DD format
    if (!dateRegex.test(value)) {
      validations.pattern = `Please enter a valid ${fieldName}.`
    }
  }

  return validations
}
