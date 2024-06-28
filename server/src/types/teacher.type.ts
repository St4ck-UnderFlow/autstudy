import { DegreeLevel } from "./enums.enum";
import { User } from "./user.type";

export type Teacher = {
    id?: string;
    degreeLevel: DegreeLevel;
    user: User
}