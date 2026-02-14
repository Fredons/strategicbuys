import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  excerpt: z.string().max(500).nullable().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().max(500).nullable().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  categoryId: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  metaTitle: z.string().max(70).nullable().optional(),
  metaDescription: z.string().max(160).nullable().optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
