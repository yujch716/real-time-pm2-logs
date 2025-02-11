import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  constructor(app: INestApplication) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, {
      cors: {
        origin: '*', // 모든 도메인 허용
        methods: ['GET', 'POST'],
      },
      ...options,
    });
    return server;
  }
}
