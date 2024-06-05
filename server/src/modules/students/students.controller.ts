import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Service } from "../../interfaces/Service.interface";
import { StudentService } from "./students.service";
import { z } from 'zod';

const service: Service = new StudentService();

export function StudentController(app: FastifyInstance) {

    app.post('/students', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const bodySchema = z.object({
                name: z.string(),
                cpf: z.string(),
                supportLevel: z.string()
            });

            const studentData = bodySchema.parse(request.body);

            await service.save(studentData);

            reply.status(201).send(studentData);

        } catch (error) {
            reply.status(500).send(error);
        }
    })

    app.get('/students', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const students = await service.getAll();

            return await reply.send(students);

        } catch (error) {
            reply.status(404).send(error);
        }
    })

    app.get('/students/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid()
            })

            const { id } = paramsSchema.parse(request.params);

            const student = await service.getById(id);

            return reply.send(student);

        } catch (error) {
            reply.status(404).send(error);
        }
    })

    app.put('/students/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = paramsSchema.parse(request.params);
    
            const bodySchema = z.object({
                name: z.string(),
                cpf: z.string(),
                supportLevel: z.string()
            });

            await service.update({ id, ...bodySchema.parse(request.body)});

            reply.status(204).send();

        } catch (error) {
            reply.status(404).send(error);
        }
    })

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