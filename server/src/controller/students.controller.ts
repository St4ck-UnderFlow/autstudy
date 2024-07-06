import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { StudentService } from "../services/students.service";
import { createStudentSchema, getStudentByIdSchema } from "../security/schemas/student.schema";
import { validatePayload } from "../security/middlewares/payloadValidation.middleware";
import { Student } from "../types/student.type";
import { UserService } from "../services/user.service";
import { validateJwt } from "../security/middlewares/jwtValidation.middleware";
import { validateRole } from "../security/middlewares/roleValidation.middleware";

const studentService = new StudentService();
const userService = new UserService();

export function StudentController(app: FastifyInstance) {

    app.post(
        '/students', 
        { 
            preHandler: [
                validatePayload(createStudentSchema, "body")
            ]
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                await studentService.save(request.body as Student);
                reply.status(201).send(request.body);
            } catch (error) {
                reply.status(500).send(error);
            }
        }
    )

    app.get('/students', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const students = await studentService.getAll();
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
                const student = await studentService.getById(request.params as string);
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
                validatePayload(createStudentSchema, "body"),
                validateJwt(),
                validateRole("student.update")
            ] 
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const id = (request.params as { id: string }).id;
                const { supportLevel, user } = request.body as Student;
                await studentService.update({ id, supportLevel, user });
                reply.status(204).send();
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

    app.delete(
        '/students/:id', 
        {
            preHandler: [
                validateJwt(),
                validateRole("student.delete"),
            ]
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = paramsSchema.parse(request.params);

            const student = await studentService.getById(id);

            await studentService.delete(id);
            await userService.delete(student.userId);

            reply.status(204).send();

        } catch (error) {
            reply.status(404).send(error);
        }
    })

}