import { ConnectionOptions } from 'typeorm';
import { User, Post, Comment, Products, Features, Plans, Users, Subscriptions } from '../models';

const config: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "123@Angular",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [ User, Post, Comment, Products, Features, Plans, Users, Subscriptions ],
  synchronize: true
};

export default config;