import { z } from "zod";

export const createRoomSchema = z.object({
    title: z.string(),
});

export const getRoomByIdSchema = z.object({
    id: z.string().uuid()
});