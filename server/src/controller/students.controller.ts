import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { GlobalServiceInterface } from "../interfaces/GlobalService.interface";
import { StudentService } from "../services/students.service";
import { createStudentSchema, getStudentByIdSchema } from "../schemas/student.schema";
import { validatePayload } from "../middlewares/payloadValidation.middleware";
import { Student } from "@prisma/client";

const service: GlobalServiceInterface = new StudentService();

export function StudentController(app: FastifyInstance) {

    app.post(
        '/students', 
        { preHandler: validatePayload(createStudentSchema, "body") },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await service.save(request.body);
                reply.status(201).send(request.body);
            } catch (error) {
                reply.status(500).send(error);
            }
        }
    )

    app.get('/students', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const students = await service.getAll();
            return await reply.send(students);
        } catch (error) {
            reply.status(404).send(error);
        }
    })

    app.get(
        '/students/:id', 
        { preHandler: validatePayload(getStudentByIdSchema, "body") },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const student = await service.getById(request.params as string);
                return reply.send(student);
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

    app.put(
        '/students/:id', 
        { 
            preHandler: [ 
                validatePayload(getStudentByIdSchema, "params"), 
                validatePayload(createStudentSchema, "body")
            ] 
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const id = (request.params as { id: string }).id;
                const { name, cpf, supportLevel } = request.body as Student;
                await service.update({ id, name, cpf, supportLevel });
                reply.status(204).send();
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

    app.delete('/students/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = paramsSchema.parse(request.params);

            await service.delete(id);

            reply.status(204).send();

        } catch (error) {
            reply.status(404).send(error);
        }
    })

}