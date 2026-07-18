import { SITE } from "@config";
import { defineCollection, z, type SchemaContext } from "astro:content";

const postSchema = ({ image }: SchemaContext) =>
  z.object({
    author: z.string().default(SITE.author),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    title: z.string(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["others"]),
    ogImage: image()
      .refine(img => img.width >= 1200 && img.height >= 630, {
        message: "OpenGraph image must be at least 1200 X 630 pixels!",
      })
      .or(z.string())
      .optional(),
    description: z.string(),
    canonicalURL: z.string().optional(),
  });

const blog = defineCollection({
  type: "content",
  schema: postSchema,
});

const posts = defineCollection({
  type: "content",
  schema: postSchema,
});

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDatetime: z.date(),
    modDatetime: z.date().optional().nullable(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["notes"]),
    description: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDatetime: z.date().optional(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["projects"]),
      stack: z.array(z.string()).default([]),
      status: z
        .enum(["idea", "building", "launched", "archived"])
        .default("building"),
      repoURL: z.string().url().optional(),
      demoURL: z.string().url().optional(),
      cover: image().or(z.string()).optional(),
    }),
});

const experiences = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    organization: z.string(),
    role: z.string().optional(),
    location: z.string().optional(),
    startDate: z.date(),
    endDate: z.date().optional().nullable(),
    current: z.boolean().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default(["experience"]),
    description: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().optional(),
    updatedDatetime: z.date().optional().nullable(),
  }),
});

export const collections = { blog, posts, notes, projects, experiences, pages };
