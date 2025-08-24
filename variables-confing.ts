const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')
module.exports = {
  variables: {
    DEFAULT: {
      spacing: {
        sidebar: '15rem',
        'sidebar-medium': '10rem',
        'sidebar-small': '4.6875rem',
        'sidebar-boxed': '2rem',
        topbar: '4.6875rem',
      },
      colors: {
        sidebar: colors.white,
        'sidebar-border': colors.gray[200],
        'menu-title': colors.gray[600],
        'sidebar-text': colors.gray[500],
        'sidebar-bg': 'var(--colors-primary-500)',
        'sidebar-text-hover': 'var(--colors-primary-500)',
        'sidebar-bg-hover': 'var(--colors-primary-500)',
        'sidebar-text-active': 'var(--colors-primary-500)',
        'sidebar-bg-active': 'var(--colors-primary-500-rgb)',
        effect: colors.gray[100],
        topbar: colors.gray[500],
      },
      //Define your custom style variables here.
    },
  },
}
