import {AvailabilityStatus} from './AvailabilityStatus';
import {IsEnum, IsISO8601, IsNotEmpty} from 'class-validator';

export class DateAvailability {

  @IsISO8601()
  @IsNotEmpty()
  date: Date;

  @IsEnum(AvailabilityStatus)
  @IsNotEmpty()
  status: AvailabilityStatus
}