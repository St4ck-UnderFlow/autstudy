import { HashService } from "../../src/security/hash.service";
import { UserType } from "../../src/types/enums.enum";
import { prisma } from "../prisma";

const mockUsers = [
    {
        name: "Alice Johnson",
        cpf: "123.456.789-00",
        email: "alice.johnson@example.com",
        password: "password123",
        userType: "TEACHER"
    },
    {
        name: "Bob Smith",
        cpf: "987.654.321-00",
        email: "bob.smith@example.com",
        password: "password123",
        userType: "TEACHER"
    },
    {
        name: "Carol Williams",
        cpf: "456.789.123-00",
        email: "carol.williams@example.com",
        password: "password123",
        userType: "TEACHER"
    },
    {
        name: "David Brown",
        cpf: "321.654.987-00",
        email: "david.brown@example.com",
        password: "password123",
        userType: "TEACHER"
    },
    {
        name: "Emma Davis",
        cpf: "789.123.456-00",
        email: "emma.davis@example.com",
        password: "password123",
        userType: "TEACHER"
    },
    {
        name: "Frank Miller",
        cpf: "654.321.789-00",
        email: "frank.miller@example.com",
        password: "password123",
        userType: "STUDENT"
    },
    {
        name: "Grace Wilson",
        cpf: "147.258.369-00",
        email: "grace.wilson@example.com",
        password: "password123",
        userType: "STUDENT"
    },
    {
        name: "Henry Moore",
        cpf: "963.852.741-00",
        email: "henry.moore@example.com",
        password: "password123",
        userType: "STUDENT"
    },
    {
        name: "Isabella Taylor",
        cpf: "852.741.963-00",
        email: "isabella.taylor@example.com",
        password: "password123",
        userType: "STUDENT"
    },
    {
        name: "Jack Anderson",
        cpf: "741.963.852-00",
        email: "jack.anderson@example.com",
        password: "password123",
        userType: "STUDENT"
    }
];

export async function UserSeed() {
    const users = await prisma.user.findMany();
    const hasUsers = users.length > 1;

    if (hasUsers) {
        console.log('USER SEED (SKIPED)');
        return;
    }

    const hashService = new HashService();

    const userCreationPromises = mockUsers.map(async user => {
        const hashedPassword = hashService.hashPassword(user.password);

        const userRoles = await prisma.role.findMany({
            where: {
                userTypes: {
                    has: user.userType as UserType
                }
            }
        });

        await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
                roles: {
                    connect: userRoles.map(role => ({ id: role.id }))
                }
            } as any
        });
    });

    await Promise.all(userCreationPromises);

    console.log('USER SEED (EXECUTED)');
}