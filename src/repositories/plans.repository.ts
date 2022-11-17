import { Repository} from "typeorm";
import { Plans, Subscriptions } from '../models';

export interface IPlanPayload {
  name: string;
  description: string;
  number_of_license: number;
  monthly_price: number;
  annual_price: number;
  created_by: string;
  updated_by: string;
  set_of_features: number[];
  price: number[];
  currency: string;
}

export interface IPurchasePlanPayload {
  plan_id: string;
  stripe_customer_id: string;
  user_id: string;
  plan_interval: string;
  plan_date: string;
  status: string;
}

export const getPlans  = async (_repository: Repository<Plans>) : Promise<Array<Plans>> => {
  return _repository.find();
}

export const createPlan  = async (_repository: Repository<Plans>, payload: IPlanPayload) : Promise<Plans> => {
  const plan = new Plans();
  return _repository.save({
    ...plan,
    ...payload
  });
}

export const getPlan  = async (_repository: Repository<Plans>, id: number) : Promise<Plans | null> => {
  const plan = await _repository.findOne({where: { id: id }});
  if (!plan) return null;
  return plan;
}

export const purchasePlan  = async (_repository: Repository<Subscriptions>, payload: IPurchasePlanPayload) : Promise<Subscriptions> => {
  const subscriptions = new Subscriptions();
  return _repository.save({
    ...subscriptions,
    ...payload
  });
}