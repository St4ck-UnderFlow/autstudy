import { prisma } from "../../prisma/prisma";
import { HashService } from "../security/hash.service";
import { Role } from "../types/role.type";
import { User } from "../types/user.type";

const hashService = new HashService();

export class UserService {

    async authenticate(params: { email: string, password: string }) {
        const user = await prisma.user.findUnique({
            where: {
                email: params.email
            }
        })

        if (!user) {
            throw new Error("User not found");
        }

        // TODO: ...
    }

    async register(data: User) {
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const hashedPassword = hashService.hashPassword(data.password);

        const userRoles = await prisma.role.findMany({
            where: {
                userType: {
                    has: data.userType
                },
            }
        });

        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                cpf: data.cpf,
                email: data.email,
                password: hashedPassword,
                userType: data.userType,
                roles: {
                    connect: userRoles.map(role => ({ id: role.id }))
                }
            }
        });

        return newUser;
    }

}