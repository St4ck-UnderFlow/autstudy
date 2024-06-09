import fastify from "fastify";
import cors from "@fastify/cors";
import { StudentController } from "./controller/students.controller";

export const app = fastify();

app.register(cors, {
    origin: true
})

const PORT = 3333;

StudentController(app);

app.listen({
    port: PORT
}).then(() => {
    console.log(`App is runnig on http://localhost:${PORT}/`)
})