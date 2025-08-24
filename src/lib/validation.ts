// app/lib/validation.ts
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isStrongPassword = (password: string): boolean => {
  return password.length >= 8
}
