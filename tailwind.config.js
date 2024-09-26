/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
      },

      scrollbarWidth: {
        none: 'none', 
      },
      scrollbar: {
        none: 'hidden', 
      },
      colors: {
        customBlue: '#1e40', 
        customGreen: '#3A5B22', 
        customGrey: '#D9D9D9',
        customOrange: 'hsl(33, 100%, 50%)',
        customSaffron: "#FF671F",
        customBlue: "#081028",
        customPurple:"#CB3CFF",
        customSidebar:"#0B1739",
        customErrorGreen:"#8AC732",
        customCardGreenText:"#14CA74",
        customCardRedText:"#FF5A65",
        customIndigo:"#00C2FF",
        CustomLightBlue:"#0E43FB",
        CustomSuccessGreen:"#05C168",
        CustomBgSuccessGreen:"#05C16833",
        CustomDangerRed:"#FF5A65",
        CustomBgDangerRed:"#FF5A6533",
        CustomYellow:"#FDB52A",
        CustomBgYellow:"#FDB52A33",

      },
      backgroundImage:{
        'leaf': "url('/halfground.png')",
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          '.scrollbar-hidden': {
            'scrollbar-width': 'none', 
          },
          '.scrollbar-hidden::-webkit-scrollbar': {
            display: 'none', 
          },
        },
        ['responsive', 'hover']
      );
    },
  ],
}

