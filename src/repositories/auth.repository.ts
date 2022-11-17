import { Repository} from "typeorm";
import { Users } from '../models'

export interface IUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: number;
  status: boolean;
  plan_id: number;
  stripe_customer_id: string;
  role: number;
  password: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export const createUser  = async (
  _repository: Repository<Users>, payload: IUserPayload) : Promise<Users> => {
  const user = new Users();
  return _repository.save({
    ...user,
    ...payload
  });
}

export const getUsers  = async (
  _repository: Repository<Users>) : Promise<Users[]> => {
  return _repository.find({ withDeleted: false });
}

export const login  = async (
  _repository: Repository<Users>, payload: ILoginPayload) : Promise<Users | null> => {
  return _repository.findOne({ withDeleted: false, where: {
    email: payload.email,
    password: payload.password,
  } });
}