import {getRepository, Repository} from "typeorm";
import { Features } from '../models'

export interface IFeaturePayload {
  name: string;
  description: string;
  created_by: string;
  updated_by: string;
}

export const getFeatures  = async (_repository: Repository<Features>) :Promise<Array<Features>> => {
  return _repository.find();
}

export const createFeature  = async (
  _repository: Repository<Features>, payload: IFeaturePayload) : Promise<Features> => {
  const feature = new Features();
  return _repository.save({
    ...feature,
    ...payload
  });
}

export const getFeature  = async (_repository: Repository<Features>, id: number) :Promise<Features | null> => {
  const feature = await _repository.findOne({where: { id: id }});
  if (!feature) return null;
  return feature;
}