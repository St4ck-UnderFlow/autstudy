import { prisma } from "../../prisma/prisma";
import { HashService } from "../security/services/hash.service";
import { JwtService } from "../security/services/jwt.service";
import { User } from "../types/user.type";
import { RoleService } from "./role.service";

const hashService = new HashService();
const roleService = new RoleService();
const jwtService = new JwtService();

export class UserService {

    async authenticate(params: { email: string, password: string }) {
        const user = await prisma.user.findUnique({
            where: {
                email: params.email
            }
        })

        const userPassword = user?.password || '';

        const invalidCreadentials = !user || !hashService.comparePassword(params.password, userPassword);

        if (invalidCreadentials) {
            throw new Error("Invalid credentials");
        }

        const token = await jwtService.generateToken(user as any);
        return token;
    }

    async save(user: User) {
        const emailAlreadyInUse = await prisma.user.findUnique({
            where: {
                email: user.email,
            }
        });

        if (emailAlreadyInUse) {
            throw new Error("Email already in use");
        }

        const cpfAlreadyInUse = await prisma.user.findUnique({
            where: {
                cpf: user.cpf
            }
        });

        if (cpfAlreadyInUse) {
            throw new Error("CPF already in use");
        }

        const hashedPassword = hashService.hashPassword(user.password);
        const userRoles = await roleService.getUserRoles(user.userType);

        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                cpf: user.cpf,
                email: user.email,
                password: hashedPassword,
                userType: user.userType,
                roles: {
                    connect: userRoles.map(role => ({ id: role.id }))
                }
            }
        });

        return newUser;
    }

    async getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    async update(user: User) {
        const hasUserSaved = await prisma.user.findFirst({
            where: { 
                id: user.id
            }
        });
        if (!hasUserSaved) {
            throw new Error('User not found')
        };
        const userUpdated = await prisma.user.update({
            where: { 
                id: user.id,
                cpf: user.cpf,
                email: user.email
            }, 
            data: {
                name: user.name,
                cpf: user.cpf,
                email: user.email
            }
        });
        return userUpdated;
    }

    async delete(id: string) {
        const hasUserSaved = await prisma.user.findUnique({
            where: { id }
        });
        if (!hasUserSaved) {
            throw new Error('Student not found')
        };
        await prisma.user.delete({
            where: { id }
        });
    }

}