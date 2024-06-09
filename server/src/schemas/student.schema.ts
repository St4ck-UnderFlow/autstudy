import { z } from "zod";

export const createStudentSchema = z.object({
    supportLevel: z.string(),
    user: z.any()
});

export const getStudentByIdSchema = z.object({
    id: z.string().uuid()
});