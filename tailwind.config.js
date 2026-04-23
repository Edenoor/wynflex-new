import tailwindcssAnimated from 'tailwindcss-animated';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{html,js}",
        "./components/**/*.{html,js}",
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
        },
        fontFamily: {
            'kanit': ['Kanit', 'sans-serif'],
        },
        extend: {
            colors: {
                'gray-light': '#D9D9D9',
                'white': '#F7F0F0',
                'gray': '#B3ACAC',
                'gray-dark': '#2A2929',
                'yellow-dark': '#B99D17',
                'yellow': '#F1D967',
                'green-light': '#6DB455'
            },
            padding: {
                'clamp': 'clamp(6rem, 25vw, 20rem)'
            },
            boxShadow: {
                'md': '0 0px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'lg': '0 0px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                'xl': '0 0px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 0px 50px -12px rgb(0 0 0 / 0.25)',
                'block-sm': '6px -6px 0px 0px',
                'block-md': '10px -10px 0px 0px'
            },
        },
    },
    plugins: [tailwindcssAnimated],
}

