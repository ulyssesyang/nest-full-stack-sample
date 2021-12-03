import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UsersSchema } from './schema/users.schema'

const Schemas = [{ name: User.name, schema: UsersSchema }];

@Module({
  imports: [MongooseModule.forFeature(Schemas), PassportModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
