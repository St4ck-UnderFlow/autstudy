import { Student } from "@prisma/client";
import { Service } from "../../interfaces/Service.interface";
import { prisma } from "../../../prisma/prisma";

export class StudentService implements Service { 

    async save(student: Student) {
        const alreadySaved = await prisma.student.findUnique({
            where: {
                cpf: student.cpf
            }
        })
        if (alreadySaved) {
            throw new Error('Student Already Saved');
        }
        return await prisma.student.create({
            data: student,
        });
    };

    async getAll() {
        const students = await prisma.student.findMany();
        if (!students) {
            throw new Error('No students found');
        }
        return students;
    };

    async getById(id: string) {
        const student = await prisma.student.findUnique({
            where: {
                id
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
        const hasStudentSaved = await prisma.student.findUnique({
            where: { id: student.id }
        })
        if (!hasStudentSaved) {
            throw new Error('Student not found')
        }
        await prisma.student.update({
            where: { id: student.id }, 
            data: {
                name: student.name,
                cpf: student.cpf,
                supportLevel: student.supportLevel
            },
        })
    };

}