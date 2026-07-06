import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      author: z.string(),
      date: z.date(),
      cover: image(),
      description: z.string(),
      readingTime: z.number().optional(),
      tags: z.array(z.string()).default([]),
      sources: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string(),
      type: z.enum(["كتاب", "فيلم"]),
      cover: image(),
      description: z.string(),
      year: z.number(),
      link: z.string().url().optional(),
    }),
});

export const collections = { blog, projects };
