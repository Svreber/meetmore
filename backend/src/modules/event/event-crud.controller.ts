import {Controller, Post} from '@nestjs/common';

@Controller('/event/crud')
export class EventCrudController {

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
