import { app } from "../server";
import { RoleService } from "../services/role.service";
import { User } from "../types/user.type";

const roleService = new RoleService();

export class JwtService {

    async generateToken(user: User) {
      const userRoles = await roleService.getUserRoles(user.userType);
      const roleNames = userRoles.map(role => role.name);

      const token = app.jwt.sign(
          {
            name: user.name,
            email: user.email,
            roles: roleNames
          },
          {
            sub: user.id,
            expiresIn: '10 days',
          },
      );

      return token;
    }

}