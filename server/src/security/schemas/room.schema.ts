import { z } from "zod";
import { SupportLevel } from "../../types/enums.enum";

export const createRoomSchema = z.object({
    title: z.string(),
    classSupportLevel: z.nativeEnum(SupportLevel)
});

export const getRoomByIdSchema = z.object({
    id: z.string().uuid()
});