"use client"

import { z } from "zod"

export const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  })
})

export const createSchema = z.object({
  title: z.string().min(1).max(100),
})

