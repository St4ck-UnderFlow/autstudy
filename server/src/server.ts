import "dotenv/config";
import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { Server } from "socket.io";

import { StudentController } from "./controller/students.controller";
import { AuthController } from "./controller/auth.controller";
import { TeacherController } from "./controller/teacher.controller";
import { RoleSeed } from "../prisma/seeds/role.seed";
import { TeacherSeed } from "../prisma/seeds/teacher.seed";
import { UserSeed } from "../prisma/seeds/user.seed";
import { StudentSeed } from "../prisma/seeds/student.seed";
import { RoomController } from "./controller/room.controller";
import { prisma } from "../prisma/prisma";

export const app = fastify();

app.register(cors, {
    origin: true,
});

const JWT_SECRET = process.env.JWT_SECRET;

JWT_SECRET && app.register(jwt, {
    secret: JWT_SECRET,
});

const PORT = 3333;

const io = new Server(app.server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on('chatMessage', async ({ roomId, senderId, message }) => {
        const newMessage = await prisma.message.create({
            data: {
                roomId,
                senderId,
                content: message,
            },
        });

        console.log(newMessage)

        io.to(roomId).emit('chatMessage', { senderId, message });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

StudentController(app);
TeacherController(app);
RoomController(app, io); 
AuthController(app);

async function runSeeds() {
    await RoleSeed();
    await UserSeed();
    await TeacherSeed();
    await StudentSeed();
}

runSeeds();

app.listen({
    port: PORT,
}).then(() => {
    console.log(`App is running on http://localhost:${PORT}/`);
});
