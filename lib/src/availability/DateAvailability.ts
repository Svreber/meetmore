import {AvailabilityStatus} from './AvailabilityStatus';
import {IsEnum, IsISO8601, IsNotEmpty} from 'class-validator';
import {Date} from '../types';

export class DateAvailability {
  protected _type = 'DateAvailability';

  @IsISO8601()
  @IsNotEmpty()
  date: Date;

  @IsEnum(AvailabilityStatus)
  @IsNotEmpty()
  status: AvailabilityStatus
}