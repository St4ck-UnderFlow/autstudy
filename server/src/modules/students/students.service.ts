import { Prisma, Student } from "@prisma/client";
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

        await prisma.student.create({data: { ...student }});
    };

    getAll(): void {
        
    };

    getById(): void {

    };

    delete(): void {

    };

    update(): void {

    };

}