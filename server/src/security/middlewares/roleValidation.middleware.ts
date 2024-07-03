import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { JwtService } from "../jwt.service";

const jwtService = new JwtService();

export function validateRole(roleRequired: string) {
    return async (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
        try {
            const decodedToken = await jwtService.decode(request);
            const roles = decodedToken.roles;
            if (!roles.includes(roleRequired)) {
                throw new Error();
            }
            done();
        } catch (error: any) {
            const errorMessage = "Unauthorized";
            reply.status(403).send({ statusCode: error.statusCode, message: errorMessage });
        }
    }
}