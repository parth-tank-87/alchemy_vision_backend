import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { 
  getPlan, 
  getPlans, 
  createPlan, 
  purchasePlan, 
  IPlanPayload, 
  IPurchasePlanPayload,
  getSubsctiptions
} from "../repositories/plans.repository";
import { getRepository, Repository } from "typeorm";
import { Plans, Subscriptions } from '../models';

@Route("plan")
@Tags("plan")
export default class PlansController {

  protected _planRepo: Repository<Plans>;
  protected _subscriptionRepos: Repository<Subscriptions>;

  constructor() {
    this._planRepo = getRepository(Plans);
    this._subscriptionRepos = getRepository(Subscriptions);
  }

  @Get("/")
  public async getPlans(): Promise<Array<Plans>> {
    return getPlans(this._planRepo);
  }

  @Get("/:id")
  public async getPlan(@Path() id: string): Promise<Plans | null> {
    return getPlan(this._planRepo, Number(id));
  }

  @Post("/")
  public async createPlan(@Body() body: IPlanPayload): Promise<Plans> {
    return createPlan(this._planRepo, body);
  }

  @Post("/purchase")
  public async purchasePlan(@Body() body: IPurchasePlanPayload): Promise<Subscriptions> {
    const request = { ...body, status: '1'};
    return purchasePlan(this._subscriptionRepos, request);
  }

  @Post("/subscriptions")
  public async getSubscriptions(): Promise<Subscriptions[]> {
    return getSubsctiptions(this._subscriptionRepos);
  } 
}