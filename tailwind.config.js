/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts, css, scss}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/aspect-ratio')
        , require('@tailwindcss/forms')
        , require('@tailwindcss/line-clamp')
        , require('@tailwindcss/typography')
    ],
    daisyui: {
        themes: [
            {
                customTheme: {
                    "primary": "#f45c5c",
                    "secondary": "#0c2c54",
                    "success": "#1BAFA2",
                    "warning": "#FFF248",
                    "danger": "#F37E89",
                    "text-danger": "#F37E89",
                    "dark-25": "#0c2c54",
                    "accent": "#37cdbe",
                    "neutral": "#ffffff",
                    "base-100": "#ffffff",
                },
            },
        ],
    },
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//     content: [
//         "./src/**/*.{html,ts}",
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [
//         require('daisyui'),
//     ],
//
// }


