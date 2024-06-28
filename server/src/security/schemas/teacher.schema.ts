import { z } from "zod";
import { DegreeLevel, UserType } from "../../types/enums.enum";

export const createTeacherSchema = z.object({
    degreeLevel: z.nativeEnum(DegreeLevel),
    user: z.object({
      name: z.string(),
      cpf: z.string(),
      email: z.string().email(),
      password: z.string(),
      userType: z.nativeEnum(UserType)
    })
});

export const getTeacherByIdSchema = z.object({
    id: z.string().uuid()
});