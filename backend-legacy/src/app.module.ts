import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventModule} from './modules/event/event.module';
import {InfrastructureModule} from './infrastructure/infrastructure.module';

@Module({
  imports: [EventModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
