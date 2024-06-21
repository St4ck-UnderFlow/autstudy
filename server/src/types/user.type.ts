import { Role } from "@prisma/client";
import { UserType } from "./enums.enum";

export type User = {
    id?: string;
    name: string;
    createdAt?: Date;
    cpf: string;
    email: string;
    password: string;
    userType: UserType;
    roles?: Role[];
};
