export default class LocalStorage {
  // get data from local storage
  static getItem(key: string) {
    if (typeof window === 'undefined') {
      return null
    }
    return localStorage.getItem(key)
  }

  // set data in local storage
  static setItem(key: string, value: string) {
    if (typeof window === 'undefined') {
      return null
    }
    return localStorage.setItem(key, value)
  }

  // remove data from local storage
  static removeItem(key: string) {
    if (typeof window === 'undefined') {
      return null
    }
    return localStorage.removeItem(key)
  }
}
