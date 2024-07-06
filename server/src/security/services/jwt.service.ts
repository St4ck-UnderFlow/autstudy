import { FastifyRequest } from "fastify";
import { app } from "../../server";
import { RoleService } from "../../services/role.service";
import { User } from "../../types/user.type";

const roleService = new RoleService();

export class JwtService {

  async generateToken(user: User) {
    const userRoles = await roleService.getUserRoles(user.userType);
    const roleNames = userRoles.map((role: any) => role.name);

    const token = app.jwt.sign(
        {
          name: user.name,
          email: user.email,
          roles: roleNames,
          userType: user.userType,
        },
        {
          sub: user.id,
          expiresIn: '10 days',
        },
    );

    return token;
  }

  public verify(request: FastifyRequest) {
    return request.jwtVerify();
  }

  public async decode(request: FastifyRequest) {
    const decoded = await request.jwtDecode();
    return Object(decoded)
  }

}