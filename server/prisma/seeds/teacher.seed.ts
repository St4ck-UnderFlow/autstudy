import { prisma } from "../prisma";

function getRandomDegreeLevel() {
    const degreeLevels = [
        "BACHELORS",
        "MASTERS",
        "PHD",
        "POSTDOC"
    ];
    return degreeLevels[Math.floor(Math.random() * degreeLevels.length)];
}

export async function TeacherSeed() {
    const teachers = await prisma.teacher.findMany();
    const hasTeachers = teachers.length > 1;

    if (hasTeachers) {
        console.log('TEACHER SEED (SKIPED)');
        return;
    }

    const teacherUsers = await prisma.user.findMany({
        where: {
            userType: 'TEACHER'
        }
    })

    const mockTeachers = teacherUsers.map(teacherUser => {
        return {
            degreeLevel: getRandomDegreeLevel(),
            userId: teacherUser.id
        }
    });

    await prisma.teacher.createMany({
        data: mockTeachers as any
    })

    console.log('TEACHER SEED (EXECUTED)');
}