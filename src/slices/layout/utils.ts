
/**
 * Changes the body attribute
 */
const changeHTMLAttribute = (attribute: string, value: string) => {
  if (document.documentElement) document.documentElement.setAttribute(attribute, value)
  return true
}

// Changes the body attribute
const changeBodyAttribute = (attribute: string, value: string) => {
  if (document.body) document.body.setAttribute(attribute, value)
  return true
}

const removeAttribute = (attribute: string) => {
  if (document.documentElement) document.documentElement.removeAttribute(attribute)
}

// get previous theme data
const getPreviousThemeData = (key: string): any | null => {
  try {
    const value = localStorage.getItem(key)
    return value ? value : null
  } catch (error) {
    console.error('Error accessing localStorage', error)
    return null
  }
}
const getPreviousSidebarColorData = (key: string): any | null => {
  try {
    const value = localStorage.getItem(key)
    return value ? value : null
  } catch (error) {
    console.error('Error accessing localStorage', error)
    return null
  }
}
// set new theme data
const setNewThemeData = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error('Error accessing localStorage', error)
  }
}

const appendDarkModeClass = (existingClass: any, darkModeClass: any): string => {
  // Check if the class is already present to avoid duplicates
  return !existingClass.includes(darkModeClass)
    ? `${existingClass} ${darkModeClass}`
    : existingClass
}

// remove existing theme data
const removeThemeData = (existingItem: string) => {
  try {
    localStorage.removeItem(existingItem)
  } catch (error) {
    console.error('Error accessing localStorage', error)
  }
}

export {
  changeHTMLAttribute,
  changeBodyAttribute,
  getPreviousThemeData,
  setNewThemeData,
  appendDarkModeClass,
  removeAttribute,
  removeThemeData,
  getPreviousSidebarColorData
}
