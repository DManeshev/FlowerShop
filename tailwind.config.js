/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx}',
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			screens: {
				sm: '500px',
				md: '767px',
				lg: '991px',
				xl: '1280px'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			fontFamily: {
				Pacifico: ['Pacifico', 'cursive'],
				Lora: ['Lora', 'serif']
			},
			borderRadius: {
				'5': '20px',
				'8': '32px'
			}
		}
	},
	plugins: [],
	variants: {
		margin: ['last']
	}
}
