import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { validatePayload } from "../security/middlewares/payloadValidation.middleware";
import { RoomService } from "../services/room.service";
import { JwtService } from "../security/services/jwt.service";
import { validateRole } from "../security/middlewares/roleValidation.middleware";
import { validateJwt } from "../security/middlewares/jwtValidation.middleware";
import { createRoomSchema, getRoomByIdSchema, updateRoomSchema } from "../security/schemas/room.schema";
import { prisma } from "../../prisma/prisma";
import { StudentService } from "../services/students.service";


const roomService = new RoomService();
const jwtService = new JwtService();
const studentService = new StudentService()

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

    app.get('/rooms/supportLevel',
        {
            preHandler: [
                validateJwt(),
                validateRole("room.list")
            ]
        },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                console.log('aqui que eh aqui')
                const tokenDecoded = await jwtService.decode(request);

                const student = await studentService.getByUserId(tokenDecoded.sub);
                const studentSupportLevel = student.supportLevel;

                const roomsWithSupportLevel = await prisma.room.findMany({
                    where: {
                        classSupportLevel: studentSupportLevel
                    }
                });
                return roomsWithSupportLevel;
            } catch (error) {
                reply.status(404).send(error);
            }
        }
    )

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
                validatePayload(updateRoomSchema, "body"),
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
            const { id } = request.params as { id: string };
            await roomService.delete(id);
            reply.status(204).send();
        } catch (error) {
            reply.status(404).send(error);
        }
    })

}