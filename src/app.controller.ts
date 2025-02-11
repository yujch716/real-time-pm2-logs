import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('logs/load')
  getLogs(): string {
    //const logFilePath = join(process.cwd(), 'test.log');
    const logFilePath = '/home/ubuntu/.pm2/logs/helloboard-server-out.log';
    try {
      const logData = readFileSync(logFilePath, 'utf-8');
      return logData;
    } catch (error) {
      console.error(error);
      return '로그 파일을 읽는 데 실패했습니다.';
    }
  }
}
