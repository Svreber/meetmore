import {IsEmpty, IsNotEmpty} from 'class-validator';

export class WithId {
  @IsNotEmpty()
  id: string;
}

export class WithoutId {
  @IsEmpty()
  id: string;
}