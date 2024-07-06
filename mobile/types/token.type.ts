import { UserType } from "./user.type";

export type Token = {
    name: string,
    email: string,
    roles: string[],
    sub: string,
    userType: UserType,
    expiresIn: string
};