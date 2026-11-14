import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

const POKEAPI_ORIGIN = 'https://pokeapi.co';
const SPRITES_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/';
const SPRITES_REGEX = /https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/master\/([^"\s]+)/g;
const SPRITE_PATH_REGEX = /^[\w\-/.]+\.(png|gif|svg)$/i;
const TIMEOUT_MS = 15000;
const MAX_CACHE = 500;

@Injectable()
export class PokeapiService {
  private readonly cache = new Map<string, string>();

  async get(url: string, baseUrl: string): Promise<unknown> {
    const target = this.validarUrl(url);

    let text = this.cache.get(target);
    if (!text) {
      const response = await this.descargar(target);
      text = await response.text();
      if (this.cache.size >= MAX_CACHE) this.cache.clear();
      this.cache.set(target, text);
    }

    const reescrito = text.replace(
      SPRITES_REGEX,
      (_m, path: string) => `${baseUrl}/pokeapi/sprite?path=${encodeURIComponent(path)}`,
    );
    return JSON.parse(reescrito);
  }

  async sprite(path: string): Promise<{ body: Buffer; contentType: string }> {
    if (!path || path.includes('..') || !SPRITE_PATH_REGEX.test(path)) {
      throw new BadRequestException('Ruta de imagen no válida.');
    }
    const response = await this.descargar(`${SPRITES_BASE}${path}`);
    return {
      body: Buffer.from(await response.arrayBuffer()),
      contentType: response.headers.get('content-type') ?? 'image/png',
    };
  }

  private validarUrl(url: string): string {
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new BadRequestException('URL no válida.');
    }
    if (parsed.origin !== POKEAPI_ORIGIN || !parsed.pathname.startsWith('/api/v2/')) {
      throw new BadRequestException('Solo se permiten URLs de pokeapi.co/api/v2.');
    }
    return parsed.toString();
  }

  private async descargar(url: string): Promise<Response> {
    let response: Response;
    try {
      response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    } catch {
      throw new BadGatewayException('No se pudo conectar con PokeAPI desde la API.');
    }
    if (response.status === 404) throw new NotFoundException('No encontrado en PokeAPI.');
    if (!response.ok) throw new BadGatewayException(`PokeAPI respondió ${response.status}.`);
    return response;
  }
}
