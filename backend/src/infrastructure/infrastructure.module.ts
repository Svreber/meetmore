import {Global, Module} from '@nestjs/common';
import {EventRepositoryProvider} from './event/event.repository';
import {ParticipantRepositoryProvider} from './participant/participant.repository';
import {MeetmoreConnectionProvider} from './database.provider';
import {AvailabilityRepositoryProvider} from './availability/availability.repository';
import {EntityMapper} from './mapper/entity.mapper';
import {ViewMapper} from './mapper/view.mapper';

const DatabaseProviders = [MeetmoreConnectionProvider, EventRepositoryProvider, ParticipantRepositoryProvider, AvailabilityRepositoryProvider];
const MapperServices = [ViewMapper, EntityMapper];

@Global()
@Module({
  providers: [...DatabaseProviders, ...MapperServices],
  exports: [...DatabaseProviders, ...MapperServices],
})
export class InfrastructureModule {}
