---
title: Configuration Options
description: Configuration Options
sidebar:
  order: 3
---

Theme config option in `astro.config.ts` looks like this:

```ts frame="code" title="astro.config.ts"
import { defineConfig } from "astro/config";
import GhostCMS from '@matthiesenxyz/astro-ghostcms';

export default defineConfig({
  site: "https://YOUR-DOMAIN-HERE.com",
  integrations: [
    GhostCMS({
        // You can either set your ghostURL here or as a `.env`/environment variable
			  ghostURL: "https://ghostdemo.matthiesen.xyz",
        // Disables default 404 page route
			  disable404: false,
        // Disables default RSS page route and @astrojs/rss integration
			  disableRSS: false,
        // Disables default satori OpenGraph generation
        disableSatoriOG: false,
        // *OPTIONAL* THIS Option allows the user to disable default route
        // injections, disabling the default layout and theme all together.
        // Allowing the user to still use integration features while building
        // off of the included API functions
        disableRouteInjection: false, // DEFAULT VALUE
        // *OPTIONAL* Setting this to true will disable the extra info logs
        disableConsoleOutput: false, // DEFAULT VALUE
        // *OPTIONAL* THIS IS THE DEFAULT VALUE
        theme: '@matthiesenxyz/astro-ghostcms-theme-default',
        // THIS IS TO SHOW SUPPORTED FEATURES FOR MORE INFO SEE
        // npm:@astrojs/sitemap package README
        sitemap: {
          customPages: // OPTIONAL - string[]
          entryLimit: // OPTIONAL - number
        }
        // THIS IS TO SHOW SUPPORTED FEATURES FOR MORE INFO SEE
        // npm:astro-robots-txt package README
        robotstxt: {
          host: // OPTIONAL - string
          sitemap: // OPTIONAL - string
          sitemapBaseFileName: // OPTIONAL - string
          policy: { // OPTIONAL
            userAgent: // REQUIRED IF POLICY IS PRESENT - string
            allow: // OPTIONAL - string
            disallow: //OPTIONAL - string
            cleanParam: //OPTIONAL - string
            crawlDelay: //OPTIONAL - number
          }
        }
    }),
  ],
});
```