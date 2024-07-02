import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { StudentController } from "./controller/students.controller";
import { AuthController } from "./controller/auth.controller";
import { TeacherController } from "./controller/teacher.controller";
import { RoleSeed } from "../prisma/seeds/role.seed";
import { TeacherSeed } from "../prisma/seeds/teacher.seed";
import { UserSeed } from "../prisma/seeds/user.seed";
import { StudentSeed } from "../prisma/seeds/student.seed";

export const app = fastify();

app.register(cors, {
    origin: true
})

const JWT_SECRET = process.env.JWT_SECRET;

JWT_SECRET && app.register(jwt, {
    secret: JWT_SECRET,
})

const PORT = 3333;

StudentController(app);
TeacherController(app);
AuthController(app);

async function runSeeds() {
    await RoleSeed();
    await UserSeed();
    await TeacherSeed();
    await StudentSeed();
}

runSeeds();

app.listen({
    port: PORT
}).then(() => {
    console.log(`App is runnig on http://localhost:${PORT}/`);
})