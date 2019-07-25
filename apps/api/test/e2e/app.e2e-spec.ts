import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {env} from "../../src/env";
import {INestApplication} from "@nestjs/common";

describe('AppController (e2e)', () => {
  let app : INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
          AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {

  })

  it('/ (GET)', (done) => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
      //.end(() => done());
  });
});
