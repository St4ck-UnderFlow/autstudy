import { SupportLevelTypes } from "@prisma/client";

export interface NewStudent {
    name: string;
    supportLevel: SupportLevelTypes;
    cpf: string;
}