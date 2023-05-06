import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    morgan('combined', {
      stream: {
        write: (message: string) => this.logger.log(message.trim()),
      },
    })(req, res, next);
  }
}
