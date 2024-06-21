import { UserType } from "./enums.enum";

export type Role = {
    id: string;
    name: string;
    userTypes: UserType;
};