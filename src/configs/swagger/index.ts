import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class Swagger {
  config(app: any) {
    const config = new DocumentBuilder()
      .setTitle('Shoppe API')
      .setDescription('Shoppe API description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
