import {Participant} from '../Participant';
import {IsNotEmpty, IsObject} from 'class-validator';
import {DateAvailabilities} from './types';
import {Event} from '../Event';

export class EventAvailabilitiesByParticipant {
  protected _type = 'EventAvailabilitiesByParticipant';

  @IsObject()
  @IsNotEmpty()
  event: Event;

  @IsObject()
  @IsNotEmpty()
  participant: Participant;

  @IsObject()
  @IsNotEmpty()
  availabilities: DateAvailabilities;
}
