import {MiddlewareConsumer, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventModule} from './modules/event/event.module';
import {responseHeaders} from './core/middleware/response-header.middleware';

@Module({
  imports: [EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(responseHeaders)
      .forRoutes('*');
  }
}

