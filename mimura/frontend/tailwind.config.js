/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
}


// module.exports = {
//   daisyui: {
//     themes: [
//       {
//         mytheme: {
        
// "primary": "#bd00ff",
        
// "secondary": "#009700",
        
// "accent": "#0058ff",
        
// "neutral": "#05161f",
        
// "base-100": "#f0feff",
        
// "info": "#22e8ff",
        
// "success": "#00c100",
        
// "warning": "#c76300",
        
// "error": "#ff6b89",
//         },
//       },
//     ],
//   },
//   plugins: [
//     require('daisyui'),
//   ],
//   //...
// }  