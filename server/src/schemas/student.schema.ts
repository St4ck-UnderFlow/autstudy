import { z } from "zod";

export const createStudentSchema = z.object({
    name: z.string(),
    cpf: z.string(),
    supportLevel: z.string()
});

export const getStudentByIdSchema = z.object({
    id: z.string().uuid()
});