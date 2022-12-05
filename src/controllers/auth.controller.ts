import { Route, Tags,  Post, Body, Get } from "tsoa";
import { createUser, getUsers, ILoginPayload, IUserPayload, login } from "../repositories/auth.repository";
import { getRepository, Repository } from "typeorm";
import { Users } from '../models';
import config from "../config/app.config";
import Stripe from "stripe";

const stripe = new Stripe(config.stripeSecretKey || "", {
  apiVersion: config.apiVersion
} as Stripe.StripeConfig);

@Route("features")
@Tags("Features")
export default class FeaturesController {

  protected _repository: Repository<Users>;

  constructor() {
    this._repository = getRepository(Users);
  }

  @Post("/user")
  public async createUser(@Body() body: IUserPayload): Promise<any> {
    const customer = await stripe.customers.create({
      email: body.email.toString(),
      phone: body.mobile_number.toString(),
      description: 'Test description',
    });

    if (customer) {
      return createUser(this._repository, {
        ...body,
        role: 0, 
        status: true,
        stripe_customer_id: customer.id
      });
    }

    return {
      error: true,
      message: 'Error on create user'
    };
  }

  @Get("/profiles")
  public async getUsers(): Promise<Users[]> {
    return getUsers(this._repository);
  }

  @Post("/login")
  public async login(@Body() body: ILoginPayload): Promise<Users | null> {
    return login(this._repository, body);
  }

  @Post("/update-user")
  public async updateUser(@Body() body: ILoginPayload): Promise<Users | null> {
    return login(this._repository, body);
  }
}