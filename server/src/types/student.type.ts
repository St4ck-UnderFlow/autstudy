import { SupportLevel } from "./enums.enum";
import { User } from "./user.type";

export type Student = {
    id?: string;
    supportLevel: SupportLevel;
    user: User
}