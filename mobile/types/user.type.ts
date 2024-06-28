import { SupportLevel } from "./student.type";
import { DeggreeLevel } from "./teacher.type";

export type SignInUser = {
    email: string, 
    password: string
}

export type SignUpUser = {
    deggreeLevel?: DeggreeLevel,
    supportLevel?: SupportLevel,
    user:{
        name: string;
        cpf: string;
        email: string;
        password: string;
        userType: string;
    }
}

export type UserType = "TEACHER" | "STUDENT"