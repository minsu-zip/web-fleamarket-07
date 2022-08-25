import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthSocketGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const client = context.switchToWs().getClient();
      const { token } = context.switchToWs().getData();

      const user = this.authService.verifyToken(token);
      client.data.user = user;

      return true;
    } catch (e) {
      throw new WsException(
        '소켓 유저 인증 : 인증이 되지 않아 Socket 연결에 실패했습니다.',
      );
    }
  }
}
