import { prisma } from "../../prisma/prisma";
import { Teacher } from "../types/teacher.type";
import { UserService } from "./user.service";

const userService = new UserService();

export class TeacherService { 

    async save(teacher: Teacher) {
        const newUser = await userService.save(teacher.user);
        await prisma.teacher.create({
            data: {
                userId: newUser.id,
                degreeLevel: teacher.degreeLevel,
            }
        });
    };

    async getAll() {
        const teachers = await prisma.teacher.findMany({
            include: {
                user: true,
            }
        });
        if (!teachers) {
            throw new Error('No teachers found');
        }
        return teachers;
    };

    async getById(id: string) {
        const teacher = await prisma.teacher.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        })
        if (!teacher) {
            throw new Error('Teacher not found')
        }
        return teacher;
    };

    async delete(id: string) {
        const hasTeacherSaved = await prisma.teacher.findUnique({
            where: { id }
        })
        if (!hasTeacherSaved) {
            throw new Error('Teacher not found')
        }

        await prisma.teacher.delete({
            where: { id }
        })
    };

    async update(teacher: Teacher) {
        await userService.update(teacher.user);
        const teacherUpdated = await prisma.teacher.update({
            where: { 
                id: teacher.id
            }, 
            data: {
                degreeLevel: teacher.degreeLevel
            },
        });
        return teacherUpdated;
    };

}