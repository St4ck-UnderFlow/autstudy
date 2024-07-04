import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { createStudentSchema, getStudentByIdSchema } from "../security/schemas/student.schema";
import { validatePayload } from "../security/middlewares/payloadValidation.middleware";
import { RoomService } from "../services/room.service";
import { Room } from "@prisma/client";
import { JwtService } from "../security/jwt.service";

const roomService = new RoomService();
const jwtService = new JwtService();

export function RoomController(app: FastifyInstance) {

    app.post(
        '/rooms', 
        // { preHandler: validatePayload(createStudentSchema, "body") },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const token = await jwtService.decode(request);
                const userId = token.sub;

                const body: any = request.body;
                await roomService.save({ userId, title: body.title });

                reply.status(201).send(request.body);
            } catch (error) {
                reply.status(500).send(error);
            }
        }
    )

    app.get('/rooms', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const rooms = await roomService.getAll();
            return await reply.send(rooms);
        } catch (error) {
            reply.status(404).send(error);
        }
    })

    app.get(
        '/rooms/:id', 
        { preHandler: validatePayload(getStudentByIdSchema, "body") },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const room = await roomService.getById(request.params as string);
                return reply.send(room);
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

    app.put(
        '/rooms/:id', 
        { 
            preHandler: [ 
                validatePayload(getStudentByIdSchema, "params"), 
                validatePayload(createStudentSchema, "body")
            ] 
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const id = (request.params as { id: string }).id;
                const data = request.body as Room;
                await roomService.update(data);
                reply.status(204).send();
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

    app.delete('/rooms/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const paramsSchema = z.object({
                id: z.string().uuid()
            })
    
            const { id } = paramsSchema.parse(request.params);

            await roomService.delete(id);

            reply.status(204).send();

        } catch (error) {
            reply.status(404).send(error);
        }
    })

}