/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    
    /* 
    fontSize: {
      '4xl': '4rem',
    },

    borderRadius: {
      'xl': '10px',
      '3xl': '20px',
    },

    width: {
      '86': '345px',
    },

    boxShadow: {
      'flat': '0px 8px 18px 0px rgba(0, 0, 0, 0.08)'
    }, */

    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        'darkest': "rgb(29, 27, 27)",
        'primary': 'rgb(50, 205, 50)',
        'primary-dark': 'rgb(34, 71, 33)',
        'dark-grey': 'rgb(82, 82, 82)',
        'light-grey': 'rgb(243, 243, 243)',
        'light-red': 'rgb(255, 0, 0)',
      }
    },
  },
  plugins: [],
}
