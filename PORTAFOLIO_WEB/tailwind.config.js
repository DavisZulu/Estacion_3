/** @type {import('tailwindcss').Config} */
export default {
  // 'class' permite alternar modo oscuro agregando/quitando la clase "dark" en <html>
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Paleta de colores del portafolio. Para cambiar el color principal
      // de toda la plantilla, solo edita los valores hexadecimales de aquí.
      // Ver README.md -> "Cómo cambiar los colores".
      colors: {
        primary: {
          DEFAULT: '#2563EB', // azul principal
          light: '#60A5FA',
          dark: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#0EA5E9',
          light: '#7DD3FC',
          dark: '#0369A1',
        },
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
