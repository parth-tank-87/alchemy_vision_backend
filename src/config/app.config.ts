import { AppConfig } from 'src/types/config';
import dotenv from "dotenv";

dotenv.config();

const appConfig: AppConfig = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  apiVersion: '2022-08-01',
};

export default appConfig;
