import cron from 'node-cron';
import moment from 'moment';
import Stripe from 'stripe';
import config from "../config/app.config";
import { Subscriptions } from '../models';
import { getRepository } from 'typeorm';
import { unitOfTime } from 'moment';
import { StripeErrorCodes } from '../types/stripeErrorCodes';

enum PlanStatus {
  ACTIVE = '0',
  INACTIVE = '1',
};

const stripe = new Stripe(config.stripeSecretKey || "", {
  apiVersion: config.apiVersion
} as Stripe.StripeConfig);

cron.schedule("*/30 * * * * *", async () => {
  const _repository = getRepository(Subscriptions);
  const records = await _repository.find({ withDeleted: false });

  records.forEach(async record => {
    const nextPurchaseDate = moment(record.plan_date).add(record.plan_interval, '' as unitOfTime.DurationConstructor);
    const diffInDays = moment().diff(moment(nextPurchaseDate), 'days');
    if (diffInDays >= 0 && record.status === PlanStatus.INACTIVE) {
      chargePayment(record);
    }
  });
});

async function chargePayment(record: any) {
  try {
    const charge = await stripe.charges.create({
      amount: 100, // record.price
      currency: 'usd', // record.currency
      source: '' // record.currenc
    });
    console.log('charge: ', charge.id);
  } catch (e: any) {
    const errorCode = e?.error?.code as StripeErrorCodes;
    let errorMessage: string;

    switch (errorCode) {
      case StripeErrorCodes.ACCOUNT_COUNTRY_INVALID_ADDRESS:
        errorMessage = 'The country of the business address provided does not match the country of the account. Businesses must be located in the same country as the account.';
        break;

      case StripeErrorCodes.ACCOUNT_INFORMATION_MISMATCH:
        errorMessage = 'Some account information mismatches with one another. For example, some banks might require that the business_profile.name must match the account holder name.';
        break;

      case StripeErrorCodes.ACCOUNT_INVALID:
        errorMessage = 'The account ID provided as a value for the Stripe-Account header is invalid. Check that your requests are specifying a valid account ID.';
        break;

      case StripeErrorCodes.AMOUNT_TOO_LARGE:
        errorMessage = 'The specified amount is greater than the maximum amount allowed. Use a lower amount and try again.';
        break;

      case StripeErrorCodes.AMOUNT_TOO_SMALL:
        errorMessage = 'The specified amount is less than the minimum amount allowed. Use a higher amount and try again';
        break;

      case StripeErrorCodes.BALANCE_INSUFFICIENT:
        errorMessage = 'The transfer or payout could not be completed because the associated account does not have a sufficient balance available. Create a new transfer or payout using an amount less than or equal to the account’s available balance';
        break;

      case StripeErrorCodes.BANK_ACCOUNT_BAD_ROUTING_NUMBERS:
        errorMessage = 'The bank account is known to not support the currency in question.';
        break;

      case StripeErrorCodes.BANK_ACCOUNT_BAD_ROUTING_NUMBERS:
        errorMessage = 'bank_account_declined';
        break;

      default:
        break;
    }
  }
};