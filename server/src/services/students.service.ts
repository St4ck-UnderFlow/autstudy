import { prisma } from "../../prisma/prisma";
import { Student } from "../types/student.type";
import { UserService } from "./user.service";

const userService = new UserService();

export class StudentService { 

    async save(student: Student) {
        const newUser = await userService.save(student.user);
        await prisma.student.create({
            data: {
                userId: newUser.id,
                supportLevel: student.supportLevel
            }
        });
    };

    async getAll() {
        const students = await prisma.student.findMany({
            include: {
                user: true,
            }
        });
        if (!students) {
            throw new Error('No students found');
        }
        return students;
    };

    async getById(id: string) {
        const student = await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        })
        if (!student) {
            throw new Error('Student not found')
        }
        return student;
    };

    async delete(id: string) {
        const hasStudentSaved = await prisma.student.findUnique({
            where: { id }
        })
        if (!hasStudentSaved) {
            throw new Error('Student not found')
        }

        await prisma.student.delete({
            where: { id }
        })
    };

    async update(student: Student) {
        await userService.update(student.user);
        const studentUpdated = await prisma.student.update({
            where: { 
                id: student.id
            }, 
            data: {
                supportLevel: student.supportLevel
            },
        });
        return studentUpdated;
    };

}