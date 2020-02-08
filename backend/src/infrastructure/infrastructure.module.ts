import {Global, Module} from '@nestjs/common';
import {EventRepositoryProvider} from './event/event.repository';
import {ParticipantRepositoryProvider} from './participant/participant.repository';
import {MeetmoreConnectionProvider} from './database.provider';

const RepositoryProviders = [EventRepositoryProvider, ParticipantRepositoryProvider];

@Global()
@Module({
  providers: [MeetmoreConnectionProvider, ...RepositoryProviders],
  exports: [MeetmoreConnectionProvider, ...RepositoryProviders]
})
export class InfrastructureModule {}
