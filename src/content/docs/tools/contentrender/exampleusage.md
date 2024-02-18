---
title: Example Usage
description: Render remote GhostCMS HTML in Astro with Full control over the output
sidebar:
  order: 2
---

The Following examples are taken out of a working environment [BrutalbyElian](https://github.com/MatthiesenXYZ/astro-ghostcms/tree/main/packages/astro-ghostcms-brutalbyelian/src/components/ghostrender)

```astro frame="code" title="[slug].astro"
---
import { GhostRender } from "@matthiesenxyz/astro-ghostcms-rendercontent";
import * as C from "../components/ghostrender";

export async function getStaticPaths() {
  const [posts, pages, settings] = await Promise.all([getAllPosts(), await getAllPages(), await getSettings()]);
  const allPosts = [...posts, ...pages];
  return allPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post, posts, settings },
  }));
}

export type Props = InferGetStaticPropsType<typeof getStaticPaths>;
const {post, posts, settings} = Astro.props as Props;
invariant(settings, "Settings are required");
---
...other content
    <GhostRender 
      content={post.html} 
      components={{ 
        h1: C.H1,
        h2: C.H2,
        h3: C.H3,
        h4: C.H4,
        h5: C.H5,
        h6: C.H6,
        pre: C.CodeSlot,
        p: C.Paragraph,
        astrocard: C.astrocard,
      }}
    />
...rest of slug
```

```ts frame="code" title="../components/ghostrender/index.ts"
export { default as H1 } from "./H1.astro"
export { default as H2 } from "./H2.astro"
export { default as H3 } from "./H3.astro"
export { default as H4 } from "./H4.astro"
export { default as H5 } from "./H5.astro"
export { default as H6 } from "./H6.astro"
export { default as CodeSlot } from "./CodeSlot.astro"
export { default as Paragraph } from "./Paragraph.astro"
export { default as astrocard } from "./astrocard.astro"
```

```astro frame="code" title="../components/ghostrender/H1.astro"
---
---
<h1 class="righteous text-4xl">
    <slot />
</h1>
```

```astro frame="code" title="../components/ghostrender/CodeSlot.astro"
---
import { Code } from "astro/components"
import { parse } from "ultrahtml"
import { querySelector } from "ultrahtml/selector"

const html = await Astro.slots.render("default")
const ast = await parse(html)
const codetag = querySelector(ast,'code')
const { children } = codetag
const code = children[0].value
---
<Code code={code} lang={"sh"} theme={"monokai"}/>
```

```astro frame="code" title="../components/ghostrender/astrocard.astro"
---
import { Card } from "@eliancodes/brutal-ui";
---
<div class="my-10">
    <Card>
        <slot />
    </Card>
</div>
```

```astro frame="code" title="../components/ghostrender/Paragraph.astro"
---
---
<p class="my-5 text-base"><slot /></p>

<style is:inline>
    #ghost p a {
        color: rgb(0, 123, 247);
    }
    #ghost ul li a {
        color: rgb(0, 123, 247);
    }
    #ghost ul li {
        padding-top: 0.5rem;
        margin-left: 2rem;
        list-style: circle;
    }
    #ghost ul {
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>
```