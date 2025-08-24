// rgbToHex Function
function rgbToHexa(rgb: string): string {
  const rgbArray = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
  if (!rgbArray) {
    return rgb // Return the original color if it's not in RGB format
  }

  const hex = (x: string): string => {
    return ('0' + parseInt(x).toString(16)).slice(-2)
  }

  return '#' + hex(rgbArray[1]) + hex(rgbArray[2]) + hex(rgbArray[3])
}
// mycolorcode.ts
export function getColorCodes(dataset: { chartColors: string; chartDarkColors: string }): string[] {
  if (typeof window === 'undefined') {
    // Ensure this function only runs on the client-side
    return []
  }

  const chartColors =
    document.documentElement.getAttribute('data-mode') === 'light'
      ? dataset.chartColors
      : dataset.chartDarkColors || dataset.chartColors
  const classNames = chartColors
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((c) => c.trim())
    .filter((c) => c.length > 0)
  const hashColorCodes: string[] = []

  classNames.forEach((className) => {
    if (!className) return // Skip empty class names

    const hasClass = document.querySelector(className)
    let backgroundColor: string

    if (hasClass) {
      backgroundColor = window.getComputedStyle(hasClass).backgroundColor
    } else {
      const divElement = document.createElement('div')
      divElement.className = className
      divElement.style.visibility = 'hidden'
      document.body.appendChild(divElement)

      const styles = window.getComputedStyle(divElement)
      backgroundColor = styles.backgroundColor

      document.body.removeChild(divElement)
    }

    const hexColor = backgroundColor.includes('rgb') ? rgbToHexa(backgroundColor) : backgroundColor
    hashColorCodes.push(hexColor)
  })

  return hashColorCodes
}
