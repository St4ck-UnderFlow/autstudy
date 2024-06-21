import { prisma } from "../../prisma/prisma";
import { UserType } from "../types/enums.enum";

export class RoleService {

    getUserRoles(userType: UserType) {
        return prisma.role.findMany({
            where: {
                userTypes: userType,
            }
        });
    }

}