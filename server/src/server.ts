import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { StudentController } from "./controller/students.controller";
import { AuthController } from "./controller/auth.controller";

export const app = fastify();

app.register(cors, {
    origin: true
})

app.register(jwt, {
    secret: 'lahuvdoasdhubv8yg120y78b23hifbw8yf',
})

const PORT = 3333;

StudentController(app);
AuthController(app);

app.listen({
    port: PORT
}).then(() => {
    console.log(`App is runnig on http://localhost:${PORT}/`)
})