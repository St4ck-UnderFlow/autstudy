import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { z } from "zod";

export function validatePayload(schema: z.ZodObject<any>, key: 'body' | 'params') {
    return (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
        try {
            if (key == "body") {
                schema.parse(request.body);
            } else {
                schema.parse(request.params);
            }
            done();
        } catch (error: any) {
            const errorMessage = "Invalid payload";
            reply.status(400).send({ statusCode: error.statusCode, message: errorMessage });
        }
    }
}