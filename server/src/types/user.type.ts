import { Role } from "@prisma/client";

export type User = {
    id?: string;
    name: string;
    createdAt?: Date;
    cpf: string;
    email: string;
    password: string;
    userType: string;
    roles?: Role[];
};
