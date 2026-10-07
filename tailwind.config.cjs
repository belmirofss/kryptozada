const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['"Bricolage Grotesque"', ...defaultTheme.fontFamily.sans],
				mono: ['"DM Mono"', ...defaultTheme.fontFamily.mono]
			},
			colors: {
				primary: '#FFBD59',
				ink: '#111111',
				paper: '#F4F2EC',
				muted: '#4A4A4A',
				up: { DEFAULT: '#0A6B37', soft: '#CFF3DC', bar: '#2BA864' },
				down: { DEFAULT: '#B42318', soft: '#FFE0DB', bar: '#E5533F' }
			},
			boxShadow: {
				'brutal-sm': '4px 4px 0 #111111',
				brutal: '6px 6px 0 #111111',
				'brutal-lg': '10px 10px 0 #111111',
				'brutal-primary': '6px 6px 0 #FFBD59'
			}
		}
	},
	plugins: []
};
