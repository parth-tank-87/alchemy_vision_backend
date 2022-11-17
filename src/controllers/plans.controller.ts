import { Get, Route, Tags,  Post, Body, Path } from "tsoa";
import { 
  getPlan, 
  getPlans, 
  createPlan, 
  purchasePlan, 
  IPlanPayload, 
  IPurchasePlanPayload
} from "../repositories/plans.repository";
import { Repository } from "typeorm";
import { Plans, Subscriptions } from '../models';
import dataSource from "../server";

@Route("plan")
@Tags("plan")
export default class PlansController {

  protected _planRepo: Repository<Plans>;
  protected _subscriptionRepos: Repository<Subscriptions>;

  constructor() {
    this._planRepo = dataSource.getRepository(Plans);
    this._subscriptionRepos = dataSource.getRepository(Subscriptions);
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

  @Post("/plan/purchase")
  public async purchasePlan(@Body() body: IPurchasePlanPayload): Promise<Subscriptions> {
    return purchasePlan(this._subscriptionRepos, body);
  }
}