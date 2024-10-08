import { prisma } from "../prisma";

let roomRoles = [
    {
        name: 'room.create',
        userTypes: ['TEACHER']
    },
    {
        name: 'room.list',
        userTypes: ['TEACHER', 'STUDENT']
    },
    {
        name: 'room.update',
        userTypes: ['TEACHER']
    },
    {
        name: 'room.delete',
        userTypes: ['TEACHER']
    },
    {
        name: 'room.join',
        userTypes: ['TEACHER', 'STUDENT']
    },
]

let studentRoles = [
    {
        name: 'student.update',
        userTypes: ['STUDENT']
    },
    {
        name: 'student.delete',
        userTypes: ['STUDENT']
    },
]

let teacherRoles = [
    {
        name: 'teacher.update',
        userTypes: ['TEACHER']
    },
    {
        name: 'teacher.delete',
        userTypes: ['TEACHER']
    },
]


export async function RoleSeed() {
    const roles = await prisma.role.findMany();
    const hasRoles = roles.length > 1;

    if (hasRoles) {
        console.log('ROLE SEED (SKIPED)');
        return;
    }

    await prisma.role.createMany({
       data: [...roomRoles, ...studentRoles, ...teacherRoles] as any
    });

    console.log('ROLE SEED (EXECUTED)');
}