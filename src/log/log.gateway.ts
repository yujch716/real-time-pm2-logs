import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as fs from 'node:fs';
import * as chokidar from 'chokidar';
import { join } from 'path';

@WebSocketGateway({ cors: true })
export class LogGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  //private logFilePath = join(process.cwd(), 'test.log');
  private logFilePath = '/home/ubuntu/.pm2/logs/helloboard-server-out.log';

  afterInit() {
    this.watchLogFile();
  }

  private watchLogFile() {
    if (!fs.existsSync(this.logFilePath)) {
      console.error(`Log file not found: ${this.logFilePath}`);
      return;
    }

    const watcher = chokidar.watch(this.logFilePath, {
      persistent: true,
      usePolling: true,
    });

    watcher.on('change', () => {
      const logData = fs.readFileSync(this.logFilePath, 'utf8');
      this.server.emit('logUpdate', logData);
    });

    console.log(`Watching log file: ${this.logFilePath}`);
  }
}
