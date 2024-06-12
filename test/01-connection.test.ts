import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { expect } from 'chai';
import path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';
const TestDbConnection: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.TEST_DB_HOST,
  port: Number(process.env.TEST_DB_PORT),
  username: process.env.TEST_DB_USERNAME,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  synchronize: true,
  logging: false,
  extra: {
    max: '100',
    min: '50',
  },
  entities: [path.join(__dirname, '../src/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../src/**/*.migration{.ts,.js}')],
  subscribers: [path.join(__dirname, '../src/**/*.subscriber{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
async function connect(): Promise<Connection> {
  try {
    console.log(process.env.TEST_DB_HOST);

    const conn = await createConnection(TestDbConnection);
    console.log('Connected to db');
    return conn;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

describe('DatabaseConnection', () => {
  let connection: Connection;

  before(async () => {
    connection = await connect();
    await connection.query(`
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('hr','37') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('ic','16,17,18,19,32') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('lml','20,21,22,23,24,25,26,29,30,31') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('lml-ic','20,21,22,23,24,25,26,29,30,31,16,17,18,19,32') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('lml-operator','20,21,22,23,24,25,26,29,30,31,4,5,7') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('lml-operator-ic','20,21,22,23,24,25,26,29,30,31,4,5,7,16,17,18,19,32') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('lml-shp','20,21,22,23,24,25,26,29,30,31,4,5,7,8,10,11') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('member_success','6,9,12') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('operator','4,5,7') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('pc','35,36') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('shp','4, 5,7,8,10,11') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('shp-hr','4, 5,7,8,10,11,37') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('shp-hr-member_success','4, 5,7,8,10,11,37,6,9,12') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('shp-lml-ic','4,5,7,8,10,11,20,21,22,23,24,25,26,29,30,31,16,17,18,19,32') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('shp-member_success','4,5,7,8,10,11,6,9,12') ON CONFLICT DO NOTHING;
    INSERT INTO public.recruitment_constants_entity(
      key, value)
      VALUES ('shp-pc','4,5,7,8,10,11,35,36') ON CONFLICT DO NOTHING;    
    `);
  });

  it('should connect to the database', () => {
    // You can add specific test cases here
    expect(connection.isConnected).to.be.true;
  });
});
