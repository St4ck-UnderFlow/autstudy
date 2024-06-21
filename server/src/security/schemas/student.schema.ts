import { z } from "zod";
import { SupportLevel, UserType } from "../../types/enums.enum";

export const createStudentSchema = z.object({
    supportLevel: z.nativeEnum(SupportLevel),
    user: z.object({
      name: z.string(),
      cpf: z.string(),
      email: z.string().email(),
      password: z.string(),
      userType: z.nativeEnum(UserType)
    })
});

export const getStudentByIdSchema = z.object({
    id: z.string().uuid()
});