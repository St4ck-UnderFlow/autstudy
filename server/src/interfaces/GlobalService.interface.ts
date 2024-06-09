import { Student } from "@prisma/client";

export interface GlobalServiceInterface {
    save(data: any): Promise<Student>;
    getAll(): Promise<Student[]>;
    getById(id: string): Promise<Student>;
    delete(id: string): Promise<void>;
    update(data: Student): Promise<void>;
}