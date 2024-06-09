import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";
import { User } from "../types/user.type";

const service = new UserService();

export function UserController(app: FastifyInstance) {

    app.post(
        '/user/register',
        async (request: FastifyRequest, reply: FastifyReply) => {
            service.register(request.body as User);
        }
    )

}