import { Room } from "@prisma/client";
import { prisma } from "../../prisma/prisma";


export class RoomService { 

    async save(room: Room) {
        await prisma.room.create({ data: room });
    };

    async getAll() {
        const room = await prisma.room.findMany({
            include: {
                students: true,
                teacher: true
            }
        });

        if (!room) {
            throw new Error('No rooms found');
        }
        return room;
    };

    async getById(id: string) {
        const room = await prisma.room.findUnique({
            where: {
                id
            },
            include: {
                teacher: true,
                students: true
            }
        })

        if (!room) {
            throw new Error('Room not found')
        }

        return room;
    };

    async delete(id: string) {
        const hasRoomSaved = await prisma.room.findUnique({
            where: { id }
        })
        if (!hasRoomSaved) {
            throw new Error('Room not found')
        }

        await prisma.room.delete({
            where: { id }
        })
    };

    async update(room: Room) {
        const roomUpdated = await prisma.room.update({
            where: { 
                id: room.id
            }, 
            data: {
                title: room.title
            },
        });
        return roomUpdated;
    };

}