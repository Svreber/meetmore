import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UnprocessableEntityException
} from '@nestjs/common';
import {WithId, WithoutId} from '../../core/IdValidator';
import {throwIfNotEqual} from '../../core/utils';
import {ParticipantService} from './participant.service';
import { Participant } from '@meetmore/lib';

@Controller('participant')
export class ParticipantController {

  constructor(private readonly participantService: ParticipantService) {
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Participant> {
    throw new NotImplementedException();
  }

  @Get()
  getAll(): Promise<Array<Participant>> {
    throw new NotImplementedException();
  }

  @Post()
  create(@Body() _withoutId: WithoutId,
         @Body() participant: Participant): Promise<Participant> {
    throw new NotImplementedException();
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string,
         @Body() _withId: WithId,
         @Body() participant: Participant): Promise<Participant> {
    throwIfNotEqual(participant.id, id, new UnprocessableEntityException('Url id and object id are different'));

    throw new NotImplementedException();
  }

}
