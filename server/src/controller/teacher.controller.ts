import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TeacherService } from "../services/teacher.service";
import { validatePayload } from "../security/middlewares/payloadValidation.middleware";
import { createTeacherSchema, getTeacherByIdSchema } from "../security/schemas/teacher.schema";
import { Teacher } from "../types/teacher.type";
import { z } from "zod";
import { UserService } from "../services/user.service";

const teacherService = new TeacherService();
const userService = new UserService();

export function TeacherController(app: FastifyInstance) {

    app.post(
        '/teachers', 
        { preHandler: validatePayload(createTeacherSchema, "body") },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await teacherService.save(request.body as Teacher);
                reply.status(201).send(request.body);
            } catch (error) {
                reply.status(500).send(error);
            }
        }
    )

    app.get('/teachers', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const teacher = await teacherService.getAll();
            return await reply.send(teacher);
        } catch (error) {
            reply.status(404).send(error);
        }
    })

    app.get(
        '/teachers/:id', 
        { preHandler: validatePayload(getTeacherByIdSchema, "body") },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const teacher = await teacherService.getById(request.params as string);
                return reply.send(teacher);
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

    app.put(
        '/teachers/:id', 
        { 
            preHandler: [ 
                validatePayload(getTeacherByIdSchema, "params"), 
                validatePayload(createTeacherSchema, "body")
            ] 
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const { id } = (request.params as { id: string });
                const { degreeLevel, user } = request.body as Teacher;

                await teacherService.update({ id, degreeLevel, user });
                
                reply.status(204).send();
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

    app.delete('/teachers/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = paramsSchema.parse(request.params);

            const teacher = await teacherService.getById(id);

            await teacherService.delete(id);
            await userService.delete(teacher.userId);

            reply.status(204).send();

        } catch (error) {
            reply.status(404).send(error);
        }
    })

}