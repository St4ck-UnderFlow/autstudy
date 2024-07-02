import { prisma } from "../prisma";

function getRandomSupportLevel() {
    const supportLevels = [
        "SLIGHT",
        "MODERATE",
        "SEVERE"
    ];
    return supportLevels[Math.floor(Math.random() * supportLevels.length)];
}

export async function StudentSeed() {
    const students = await prisma.student.findMany();
    const hasStudents = students.length > 1;

    if (hasStudents) {
        console.log('STUDENT SEED (SKIPED)');
        return;
    }

    const studentUsers = await prisma.user.findMany({
        where: {
            userType: 'STUDENT'
        }
    });

    const mockStudents = studentUsers.map(studentUser => {
        return {
            supportLevel: getRandomSupportLevel(),
            userId: studentUser.id,
        }
    });

    await prisma.student.createMany({
        data: mockStudents as any
    })

    console.log('STUDENT SEED (EXECUTED)');
}