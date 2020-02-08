import {IsInt, IsOptional, IsString, IsUUID, Length, Max, Min} from 'class-validator';

export abstract class AbstractEvent {

  @IsOptional()
  @IsUUID()
  id?: string;

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
