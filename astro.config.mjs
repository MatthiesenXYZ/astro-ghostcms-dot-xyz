import { defineConfig, squooshImageService } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import robotsTxt from 'astro-robots-txt';
import starlightBlog from 'starlight-blog';
import starlightLinksValidator from 'starlight-links-validator'
import houston from './src/styles/houston.json'

// https://astro.build/config
export default defineConfig({
	site: 'https://astro-ghostcms.xyz',
	image: {
		service: squooshImageService(),
	},
	integrations: [
		starlight({
			title: 'Astro-GhostCMS',
			description: 'Easily migrate your Ghost Site to Astro, an Astro Integration & API that turns your Ghost server into a Headless CMS',
			logo: {
				src: './src/assets/spaceghost.png',
				alt: "Spaceghost"
			},
			editLink: { 
				baseUrl: 'https://github.com/MatthiesenXYZ/astro-ghostcms-dot-xyz/edit/main/' 
			},
			lastUpdated: true,
			favicon: 'spaceghost.png',
			customCss: [ './src/styles/tailwind.css' ],
			components: {
				SiteTitle: './src/components/starlight/SiteTitle.astro',
				ThemeSelect: './src/components/starlight/ThemeSelect.astro',
				Head: './src/components/starlight/Head.astro'
			},
			expressiveCode: { 
				themes: [ houston, 'starlight-light' ],
				defaultProps: {
					wrap: true,
				},
			},
			plugins: [
				starlightBlog({
					title: 'Blog',
					postCount: 15,
					recentPostCount: 30,
					authors: { adam: {
						name: 'Adam Matthiesen',
						title: 'Core Maintainer',
						picture: './authors/adam.jpg',
						url: 'https://github.com/AdamMatthiesen',
				}}}),
				starlightLinksValidator({
					errorOnFallbackPages:  false,
					errorOnInconsistentLocale: false,
					errorOnRelativeLinks: true,
				})
			],
			social: {
				discord: 'https://discord.gg/u7NZqUyeAR',
				github: 'https://github.com/MatthiesenXYZ/astro-ghostcms',
				gitlab: 'https://gitlab.com/matthiesenxyz/astro-ghostcms',
			},
			sidebar: [ 
				{ label: 'Introduction', 
					items: [
					{ label: 'Getting Started', link: '/intro' },
					{ label: 'Main Integration', 
						autogenerate: { 
							directory: '/intro/integration-mode' 
						}, },
					{ label: 'Starlight Plugin', 
						badge: { 
							text: 'NEW', 
							variant: 'success' 
						}, 
						autogenerate: { 
							directory: '/intro/starlight' 
						} } ] }, 
				{ label: 'Advanced Usage', 
					badge: { 
						text: 'Coming Soon', 
						variant: 'caution' 
					}, 
					autogenerate: { 
						directory: '/advanced' 
					} }, 
				{ label: 'Themes', 
					items: [
						{ label: 'Default Theme', 
							collapsed: true, 
							autogenerate: { 
								directory: '/themes/default' 
							} },
						{ label: 'Catppuccin', 
							collapsed: true, 
							autogenerate: { 
								directory: '/themes/catppuccin' 
							} },
						{ label: 'Brutal by Elian',	
							collapsed: true, 
							autogenerate: {	
								directory: '/themes/brutal'	
							} } ] }, 
				{ label: 'Tools & Extras',
					items: [
						{ label: 'Ghost Render Util', 
							badge: { 
								text: 'Deprecated', 
								variant: 'danger' 
							}, 
							collapsed: true, 
							autogenerate: { 
								directory: '/tools/contentrender' 
							} } ] }, 
				{ label: 'Changelogs', 
					autogenerate: { 
						directory: '/changelogs' 
					} 
				},
			],
		}),
		tailwind({
			applyBaseStyles: false,
			nesting: true,
		}),
		robotsTxt(),
	],
});
