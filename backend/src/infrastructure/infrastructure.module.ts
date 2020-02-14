import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TypeOrmForFeature, TypeOrmForRootAsync} from './type-orm-setup';
import {ViewMapper} from './mapper/view.mapper';
import {EntityMapper} from './mapper/entity.mapper';

@Global()
@Module({
  imports: [TypeOrmForRootAsync, TypeOrmForFeature],
  providers: [ViewMapper, EntityMapper],
  exports: [TypeOrmModule, ViewMapper, EntityMapper]
})
export class InfrastructureModule {
}
