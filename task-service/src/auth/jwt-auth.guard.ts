import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(@Inject('AUTH_CLIENT') private readonly authClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }

    const [bearer, token] = authHeader.split(' ');
    console.log('auth-header',token)
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }

    try {
      const user = await firstValueFrom(this.authClient.send({ cmd: 'validate-token' }, token));
      req.user = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }
  }
}
