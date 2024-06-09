import { prisma } from "../../prisma/prisma";

export class RoleService {

    getUserRoles(userType: string) {
        return prisma.role.findMany({
            where: {
                userTypes: {
                    has: userType
                },
            }
        });
    }

}