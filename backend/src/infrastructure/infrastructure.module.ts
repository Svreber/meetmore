import {Global, Module} from '@nestjs/common';
import {EventRepositoryProvider} from './event/event.repository';
import {ParticipantRepositoryProvider} from './participant/participant.repository';
import {MeetmoreConnectionProvider} from './database.provider';
import {EventMapper} from './mapper/event.mapper';
import {ParticipantMapper} from './mapper/participant.mapper';

const DatabaseProviders = [MeetmoreConnectionProvider, EventRepositoryProvider, ParticipantRepositoryProvider];
const MapperServices = [EventMapper, ParticipantMapper];

@Global()
@Module({
  providers: [...DatabaseProviders, ...MapperServices],
  exports: [...DatabaseProviders, ...MapperServices],
})
export class InfrastructureModule {}
