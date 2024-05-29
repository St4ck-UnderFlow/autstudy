import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Service } from "../../interfaces/Service.interface";
import { StudentService } from "./students.service";
import { z } from 'zod';
import { SupportLevelTypes } from "@prisma/client";

export function StudentControlle(app: FastifyInstance) {

    const service: Service = new StudentService();

    app.get('/students', (request: FastifyRequest, reply: FastifyReply) => {
        try {
            
        } catch (error) {
            reply.status(500).send(error);
        }
    })

    app.post('/students', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const schema = z.object({
                name: z.string(),
                cpf: z.string(),
                supportLevel: z.string()
            })

            const studentData = schema.parse(request.body);

            await service.save(studentData)
        } catch (error) {
            
        }
    })

    app.put('/students', (request: FastifyRequest, reply: FastifyReply) => {

    })

    app.delete('/students/:id', (request: FastifyRequest, reply: FastifyReply) => {

    })

}