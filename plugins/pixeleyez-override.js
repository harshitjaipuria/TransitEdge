const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    ".active-date": {
      "@apply bg-primary-500 text-primary-50 border-primary-500": {},
      p: {
        "@apply text-primary-200": {},
      },
    },
    ".css-13cymwt-control": {
      "@apply border-gray-200 dark:border-dark-800": {},
    },
  });

  addComponents({
    ".dropdown": {
      "@apply relative inline-block": {},
      ".dropdown-menu": {
        "@apply fixed z-10 w-40 bg-white rounded-md shadow-md dark:bg-dark-900 shadow-gray-200 dark:shadow-dark-800":
          {},
      },
    },
  });
});
