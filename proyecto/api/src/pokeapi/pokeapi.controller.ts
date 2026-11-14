import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PokeapiService } from './pokeapi.service';

@Controller('pokeapi')
export class PokeapiController {
  constructor(private readonly pokeapiService: PokeapiService) {}

  @Get()
  get(@Query('url') url: string, @Req() req: Request) {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    return this.pokeapiService.get(url, baseUrl);
  }

  @Get('sprite')
  async sprite(@Query('path') path: string, @Res() res: Response) {
    const { body, contentType } = await this.pokeapiService.sprite(path);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(body);
  }
}
