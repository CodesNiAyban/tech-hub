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

export const createSchema = z.object({
  title: z.string().min(1).max(100),
})

