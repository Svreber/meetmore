import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TypeOrmForFeature, TypeOrmForRootAsync} from './type-orm-setup';

@Global()
@Module({
  imports: [TypeOrmForRootAsync, TypeOrmForFeature],
  exports: [TypeOrmModule]
})
export class InfrastructureModule {
}
