import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { createStudentSchema, getStudentByIdSchema } from "../security/schemas/student.schema";
import { validatePayload } from "../security/middlewares/payloadValidation.middleware";
import { RoomService } from "../services/room.service";
import { Room } from "@prisma/client";
import { JwtService } from "../security/services/jwt.service";
import { validateRole } from "../security/middlewares/roleValidation.middleware";
import { validateJwt } from "../security/middlewares/jwtValidation.middleware";
import { createRoomSchema, getRoomByIdSchema } from "../security/schemas/room.schema";


const roomService = new RoomService();
const jwtService = new JwtService();

export function RoomController(app: FastifyInstance, io: any) {

    app.post(
        '/rooms', 
        { 
            preHandler: [
                validatePayload(createRoomSchema, "body"),
                validateJwt(),
                validateRole("room.create")
            ] 
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const token = await jwtService.decode(request);
                const userId = token.sub;

                const body: any = request.body;

                const newRoom = await roomService.save({ userId, title: body.title, classSupportLevel: body.classSupportLevel});

                io.emit('newRoom', newRoom);

                reply.status(201).send(newRoom);
            } catch (error) {
                reply.status(500).send(error);
            }
        }
    )

    app.get('/rooms',
        {
            preHandler: [
                validateJwt(),
                validateRole("room.list")
            ]
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const rooms = await roomService.getAll();
            return await reply.send(rooms);
        } catch (error) {
            reply.status(404).send(error);
        }
    })

    app.get('/rooms/messages/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: string };
            const roomMessages = await roomService.getRoomMessages(id);
            return await reply.send(roomMessages);
        } catch (error) {
            reply.status(404).send(error);
        }
    })

    app.get(
        '/rooms/:id', 
        { 
            preHandler: [
                validatePayload(getRoomByIdSchema, "body"), 
                validateJwt(),
                validateRole("room.list")
            ] 
        },
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
                validatePayload(getRoomByIdSchema, "params"),
                validatePayload(createRoomSchema, "body"),
                validateJwt(),
                validateRole("room.update")
            ] 
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const id = (request.params as { id: string }).id;
                const body = request.body as any;
                const data = {
                    id,
                    ...body
                };
                await roomService.update(data);
                reply.status(204).send();
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

    app.delete('/rooms/:id',
        {
            preHandler: [
                validatePayload(getRoomByIdSchema, "params"),
                validateJwt(),
                validateRole("room.delete")
            ]
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
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