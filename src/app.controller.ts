import { Controller, Get, Inject, Param, Session } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('person2') private readonly person2: { name: string, desc: string }
  ) { }


  @Get()
  getHello(): string {
    debugger
    console.log('this.person2', this.person2)
    return this.appService.getHello();
  }

  @Get('/session')
  session(@Session() session) {
    if (!session.count) {
      session.count = 0;
    }
    session.count = session.count + 1;
    return session.count
  }
}

