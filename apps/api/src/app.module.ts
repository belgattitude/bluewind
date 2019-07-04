import { env } from './env';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { Connection } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {TeacherModule} from "./teacher/teacher.module";

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: env.TYPEORM_CONNECTION as any,
      host: env.TYPEORM_HOST,
      port: env.TYPEORM_PORT,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      database: env.TYPEORM_DATABASE,
      entities: [__dirname + '/' + env.TYPEORM_ENTITIES],
      synchronize: env.TYPEORM_SYNCHRONIZE,
    }),

    //GraphQLModule.forRoot({
    //  typePaths: ['./**/*.graphql'],
    //  installSubscriptionHandlers: true,
    //}),
    StudentModule,
    TeacherModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
