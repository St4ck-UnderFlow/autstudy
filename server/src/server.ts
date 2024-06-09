import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { StudentController } from "./controller/students.controller";
import { AuthController } from "./controller/auth.controller";

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
AuthController(app);

app.listen({
    port: PORT
}).then(() => {
    console.log(`App is runnig on http://localhost:${PORT}/`)
})