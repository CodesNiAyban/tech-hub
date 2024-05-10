"use client"

import { z } from "zod"

export const titleSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  })
})

export const descriptionSchema = z.object({
  description: z.string().min(1, {
    message: "Description is required",
  })
})

export const imageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  })
})

export const categoriesSchema = z.object({
  categories: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one framework."),
});

export const priceSchema = z.object({
  price: z
    .coerce
    .number()
    .refine((val) => val >= 0, {
      message: "Price must be non-negative",
      path: ["price"],
    }),
});

export const attachmentSchema = z.object({
  url: z.string().min(1, {
    message: "Attachment is required",
  })
})

export const chapterSchema = z.object({
  title: z.string().min(1),
})


export const createSchema = z.object({
  title: z.string().min(1).max(100),
})

