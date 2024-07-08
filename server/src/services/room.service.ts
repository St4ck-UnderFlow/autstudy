import { Room } from "@prisma/client";
import { prisma } from "../../prisma/prisma";
import { DegreeLevel, SupportLevel } from "../types/enums.enum";


export class RoomService { 

    async save(params: { userId: string, title: string, classSupportLevel: SupportLevel}) {
        const { userId, title } = params;

        const teacher = await prisma.teacher.findUnique({
            where: {
                userId
            }
        })

        if (!teacher) {
            throw new Error('Teacher not found');
        }

        const newRoom = await prisma.room.create(
            { 
                data: {
                    title,
                    classSupportLevel: params.classSupportLevel,
                    ownerId: teacher.id,
                } as any
            }
        );

        return newRoom;
    };

    async getAll() {
        const room = await prisma.room.findMany({
            orderBy: {
                createdAt: 'desc'
            },
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

    async getByTeacherDegreelevel(degreeLevel: DegreeLevel) {
        const rooms = await prisma.room.findMany({
            where: {
                teacher: {
                    degreeLevel
                }
            }
        })

        if (!rooms) {
            throw new Error('Rooms With This Degree Level Not Found')
        }

        return rooms;
    };

    async delete(id: string) {
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

    async getRoomMessages(roomId: string) {
        const allMessages = await prisma.message.findMany({
            where: {
                roomId
            },
            include: {
                user: true
            }
        }) 

        return allMessages;
    }

    async getRoomsByOwnerId(ownerId: string) {
        const rooms = await prisma.room.findMany({
            where: {
                ownerId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                students: true,
                teacher: true
            }
        });

        if (!rooms) {
            throw new Error('No rooms found using this owner Id');
        }

        return rooms;
    }

}