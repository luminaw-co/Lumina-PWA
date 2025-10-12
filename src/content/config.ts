import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    ctas: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })).optional(),

    summary: z.object({
      cover: z.string(),
      note: z.string().optional(),
    }),

    briefTitle: z.string(),
    briefText: z.string(),
    stack: z.array(z.string()).default([]),
    valueBullets: z.array(z.string()).default([]),
    gallery: z.array(z.string()).default([]),

    href: z.string().url().optional(),

    links: z.object({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      behance: z.string().url().optional(),
    }).partial().optional(),

    published: z.boolean().default(true),

    objective: z.string().optional(),
    build: z.string().optional(),
    learnings: z.array(z.string()).optional(),
    roadmap: z.array(z.string()).optional(),
    techstack: z.string().optional(),
    results: z.string().optional(),
    images: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
        h3: z.string(),
        p: z.string(),
        class: z.string().optional(),
        imgClass: z.string().optional(),
      })
    ).optional(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };