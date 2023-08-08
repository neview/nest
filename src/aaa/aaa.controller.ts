import { Controller, Get, Req, Res, Post, Body, Patch, Param, Delete, HostParam, Next, HttpCode, Redirect, Render } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { NextFunction, Request, Response } from 'express';

@Controller({ host: ':host.0.0.1', path: 'aaa' })
export class AaaController {
  constructor(private readonly aaaService: AaaService) { }

  @Post()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get('bbb')
  hello(@HostParam('host') host) {
    return host;
  }

  @Get('ccc')
  ccc(@Req() req: Request) {
    console.log(req.hostname);
    console.log(req.url)
  }

  // @Get('ddd')
  // ddd(@Res() res: Response) {
  //   res.end('ddd');
  // }

  @Get('ddd')
  ddd(@Res({ passthrough: true }) res: Response) {
    return 'ddd';
  }

  @Get('eee')
  eee(@Next() next: NextFunction) {
    console.log('handler1');
    next()
    return '111';
  }

  @Get('eee')
  eee2() {
    console.log('handler2');
    return 'eee';
  }

  @Get('fff')
  @HttpCode(222)
  fff() {
    return 'hello';
  }

  @Get('hhh')
  @Redirect('http://juejin.cn')
  hhh() {

  }

  @Get('user')
  @Render('user')
  user() {
    return { name: 'guang', age: 20 }
  }

  @Get()
  findAll() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}
