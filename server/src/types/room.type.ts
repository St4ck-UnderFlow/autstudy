import { Student } from "@prisma/client";

export type Room = {
    id?: string;
    title: string;
    ownerId: string;
    students: Student[];
}