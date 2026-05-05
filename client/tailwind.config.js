/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Premium Indigo
        secondary: "#A855F7", // Premium Purple
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        background: "#09090B", // Darkest Zinc
        card: "#18181B", // Zinc 900
        accent: "#F4F4F5",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'premium-gradient': 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
      }
    },
  },
  plugins: [],
}
