import {IsInt, IsOptional, IsString, IsUUID, Length, Max, Min} from 'class-validator';
import {EventId} from './types';

export abstract class AbstractEvent {
  protected __nominal: void;

  @IsOptional()
  @IsUUID()
  id?: EventId;

  @IsString()
  @Length(3, 50)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  @Min(1)
  @Max(365)
  idealRecurrence: number;
}
