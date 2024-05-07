"use client"

import { z } from "zod"

export const createSchema = z.object({
  title: z.string().min(1).max(30),
})
