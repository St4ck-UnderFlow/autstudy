import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";
import { validatePayload } from "../security/middlewares/payloadValidation.middleware";
import { authSchema } from "../security/schemas/auth.schema";

const service = new UserService();

export function AuthController(app: FastifyInstance) {

    app.post(
        '/auth', 
        { preHandler: validatePayload(authSchema, "body") },
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const body: any = request.body;
                const token = await service.authenticate({ 
                    email: body.email, 
                    password:  body.password
                });
                reply.status(200).send({ token });
            } catch (error) {
                reply.status(403).send(error);
            }
        }
    )

}