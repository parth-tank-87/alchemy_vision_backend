import express from "express";
import Stripe from "stripe";
import config from "../config/app.config";
import messages from "../config/messages";

const customerId = 'cus_MgoHfjV0l9VKBY';

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
      message: messages.customer_create_success,
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
      message: messages.subscription_create_success,
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
      message: messages.product_create_success,
      product,
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

router.post("/subscribe", async (_req, res) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          plan: "plan_MgsPYDcOluRtz8",
        },
      ],
    });
    return res.send({
      success: true,
      message: messages.subscription_create_success,
      subscription,
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

router.post("/card", async (_req, res) => {
  try {
    const createPaymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242 4242 4242 4242',
        exp_month: 10,
        exp_year: 2023,
        cvc: '314',
      },
    });

    const attachPaymentMethod = await stripe.paymentMethods.attach(
      createPaymentMethod.id,
      { customer: customerId }
    );

    // const customer = await stripe.customers.update(
    //   customerId,
    //   {invoice_settings: {
    //     default_payment_method: createPaymentMethod.id
    //   }}
    // );

    return res.send({
      success: true,
      message: "Card added successfully",
      attachPaymentMethod
    });
  } catch (e) {
    console.log("error: ", e);
  }
}); 

router.get("/card", async (_req, res) => {
  try {
    const abc: Stripe.PaymentMethodListParams = {
      type: 'card'
    }
    const paymentMethods = await stripe.paymentMethods.list(abc);
    return res.send({
      paymentMethods,
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

router.get("/customer", async (_req, res) => {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return res.send({
      customer
    });
  } catch (e) {
    console.log("error: ", e);
  }
});

export default router;
