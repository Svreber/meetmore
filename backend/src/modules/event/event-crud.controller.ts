import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UnprocessableEntityException
} from '@nestjs/common';
import {EventCrudService} from './event-crud.service';
import {EventCRUD} from '@meetmore/lib';
import {WithId, WithoutId} from '../../core/IdValidator';
import {throwIfNotEqual} from '../../core/utils';

@Controller('event-crud')
export class EventCrudController {

  constructor(private readonly eventCrudService: EventCrudService) {
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<EventCRUD> {
    return this.eventCrudService.getOne(id);
  }

  @Get()
  getAll(): Promise<Array<EventCRUD>> {
    return this.eventCrudService.getAll();
  }

  @Post()
  create(@Body() _withoutId: WithoutId,
         @Body() eventCRUD: EventCRUD): Promise<EventCRUD> {
    return this.eventCrudService.create(eventCRUD);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string,
         @Body() _withId: WithId,
         @Body() eventCRUD: EventCRUD): Promise<EventCRUD> {
    throwIfNotEqual(eventCRUD.id, id, new UnprocessableEntityException('Url id and object id are different'));

    return this.eventCrudService.update(id, eventCRUD);
  }

}
