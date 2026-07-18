import { defineCollection, z, type SchemaContext } from 'astro:content'
import { glob } from 'astro/loaders'

function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  return Array.from(new Set(array.map((str) => str.toLowerCase())))
}

const blogSchema = ({ image }: SchemaContext) =>
  z.object({
    title: z.string().max(60),
    description: z.string().max(160),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z
      .object({
        src: image(),
        alt: z.string().optional(),
        inferSize: z.boolean().optional(),
        width: z.number().optional(),
        height: z.number().optional(),
        color: z.string().optional()
      })
      .optional(),
    tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
    ogImage: z.string().optional(),
    tocDepth: z.number().int().min(2).max(6).optional(),
    tocLabels: z.record(z.string(), z.string()).optional(),
    draft: z.boolean().default(false),
    comment: z.boolean().default(false)
  })

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: blogSchema
})

export const collections = { blog }
