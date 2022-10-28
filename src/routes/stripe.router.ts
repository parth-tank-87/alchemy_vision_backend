import express from "express";
import Stripe from "stripe";
import config from "../config/app.config";

const stripe = new Stripe(config.stripeSecretKey || "", {
  apiVersion: config.apiVersion,
} as Stripe.StripeConfig);

const router = express.Router();

router.get("/", async (_req, res) => {
  return res.send("welcome to stripe implementation!!");
});

router.post("/create-user", async (_req, res) => {
  try {
    const params: Stripe.CustomerCreateParams = {
      ..._req.body,
      description: "test customer",
    };
    const customer: Stripe.Customer = await stripe.customers.create(params);
    return res.send({
      success: true,
      message: "customer created successfully",
      customer,
    });
  } catch (e) {
    console.log("e: ", e);
  }
});

router.get("/plan", async (_req, res) => {
  try {
    const plans = await stripe.plans.list();
    return res.send({
      success: true,
      message: "Subscription Created Successfully",
      plans,
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

router.post("/plan", async (_req, res) => {
  try {
    const planCreate: Stripe.PlanCreateParams = {
      amount: _req.body.amount,
      currency: _req.body.currency,
      interval: _req.body.interval,
      product: _req.body.product,
    };

    const subscription = await stripe.plans.create(planCreate);

    return res.send({
      success: true,
      message: "Subscription Created Successfully",
      subscription,
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

router.post("/product", async (_req, res) => {
  try {
    const product = await stripe.products.create({
      name: _req.body.name,
    });
    return res.send({
      success: true,
      message: "Subscription Created Successfully",
      product,
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

router.post("/subscribe", async (_req, res) => {
  try {
    const subscriptionCreate: Stripe.SubscriptionCreateParams = {
      customer: "cus_MgoHfjV0l9VKBY",
      items: [
        {
          plan: "plan_MgsPYDcOluRtz8",
        },
      ],
    };

    const subscription = await stripe.subscriptions.create(subscriptionCreate);

    return res.send({
      success: true,
      message: "Subscription Created Successfully",
      subscription,
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

export default router;
