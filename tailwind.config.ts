import type { Config } from 'tailwindcss'
// @ts-ignore
import preset from 'pixeleyezui/tailwind.config'
const variablesConfig = require('./variables-confing')
const colorsConfig = require('./config-colors')
const colors = require('tailwindcss/colors')
const _ = require('lodash')
const pixeleyezui = require('pixeleyezui')

const defaultConfig: Config = {
  presets: [preset],
  // Customizations specific to this project would go here
  content: [
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/simplebar-react/**/*',
    './node_modules/apexcharts/**/*',
    './node_modules/react-select/**/*',
    './node_modules/@fullcalendar/**/*',
    './node_modules/prismjs/**/*',
    './node_modules/react-flatpickr/**/*',
    './node_modules/flatpickr/**/*',
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['"Roboto Slab", sans-serif'],
      },
      spacing: {
        sidebar: 'var(--spacing-sidebar)',
        'sidebar-medium': 'var(--spacing-sidebar-medium)',
        'sidebar-small': 'var(--spacing-sidebar-small)',
        'sidebar-boxed': 'var(--spacing-sidebar-boxed)',
        topbar: 'var(--spacing-topbar)',
        'sidebar-icon': '4.375rem',
      },
      colors: {
        sidebar: 'var(--colors-sidebar)',
        'sidebar-border': 'var(--colors-sidebar-border)',
        'menu-title': 'var(--colors-menu-title)',
        'sidebar-text': 'var(--colors-sidebar-text)',
        'sidebar-bg': 'var(--colors-sidebar-bg)',
        'sidebar-text-hover': 'var(--colors-sidebar-text-hover)',
        'sidebar-bg-hover': 'var(--colors-sidebar-bg-hover)',
        'sidebar-text-active': 'var(--colors-sidebar-text-active)',
        'sidebar-bg-active': 'var(--colors-sidebar-bg-active)',
        effect: 'var(--colors-effect)',
        topbar: 'var(--colors-topbar)',
        body: colors.white,
        ...colorsConfig,
      },
      backgroundImage: {
        auth: "url('../images/others/auth.jpg')",
      },
      order: {
        '13': '13',
      },
    },
    ...variablesConfig,
  },
  plugins: [
    ...pixeleyezui,
    //layouts
    require('./plugins/layouts/sidebar'),
    require('./plugins/layouts/topbar'),
    require('./plugins/layouts/others'),
    require('./plugins/layouts/footer'),
    require('./plugins/layouts/horizontal'),
    require('./plugins/layouts/boxed'),
    require('./plugins/layouts/semibox'),
    require('./plugins/layouts/page-heading'),
    require('./plugins/layouts/galaxy'),
    //theme-colors
    require('./plugins/theme-colors/root'),

    //plugins
    require('./plugins/custom-calendar'),
    require('./plugins/invoice-landing'),
    require('./plugins/navbar'),
    require('./plugins/pixeleyez-override'),
  ],
}

const configMerged = _.merge({}, preset, defaultConfig)

module.exports = configMerged
