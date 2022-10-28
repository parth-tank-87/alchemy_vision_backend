import Stripe from "stripe";

export interface AppConfig {
  apiVersion: Stripe.LatestApiVersion;
  stripeSecretKey: string;
}