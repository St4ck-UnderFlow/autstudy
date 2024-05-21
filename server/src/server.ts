import fastify from "fastify";
import cors from "@fastify/cors";

export const app = fastify();

app.register(cors, {
    origin: true
})

const PORT = 3333;

app.get('/', () => {
    return 'Hello, World!'
})

app.listen({
    port: PORT
}).then(() => {
    console.log(`App is runnig on http://localhost:${PORT}/`)
})