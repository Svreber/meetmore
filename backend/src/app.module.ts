import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {EventModule} from './modules/event/event.module';
import {InfrastructureModule} from './infrastructure/infrastructure.module';
import {ParticipantModule} from './modules/participant/participant.module';
import {LoggerModule} from 'nestjs-pino/dist';

@Module({
  imports: [EventModule, ParticipantModule, InfrastructureModule, LoggerModule.forRoot({
    pinoHttp: {
      prettyPrint: true,
      serializers: {
        req(req) {
          req.body = req.raw.body;
          return req;
        },
        // FIXME: Add log of body response, only for debugging
      }
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
