import starlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = { 
	200: '#e9b4e6', 
	600: '#af00b0', 
	900: '#530954', 
	950: '#390f39' 
};
const gray = { 
	100: '#f2f6ff', 
	200: '#e6eeff', 
	300: '#b5c2de', 
	400: '#748abf', 
	500: '#425687', 
	700: '#243563', 
	800: '#13234f', 
	900: '#0f172b' 
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
		},
	},
	plugins: [starlightPlugin()],
};