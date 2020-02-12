import {Participant} from '../Participant';
import {AvailabilityStatus} from './AvailabilityStatus';
import {IsEnum, IsNotEmpty, IsObject} from 'class-validator';

export class ParticipantAvailability {
  protected __nominal: void;

  @IsObject()
  @IsNotEmpty()
  participant: Participant;

  @IsEnum(AvailabilityStatus)
  @IsNotEmpty()
  status: AvailabilityStatus;
}