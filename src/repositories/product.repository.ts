import { Repository } from "typeorm";
import { Products } from "../models";

export interface IProductPayload {
  productid?: number;
  productname: string;
  quantity: number;
  price: number;
}

export const getProducts = async (_repository: Repository<Products>): Promise<Array<Products>> => {
  return await _repository.find({ withDeleted: false });
}; 

export const createProduct = async (
  _repository: Repository<Products>,
  payload: IProductPayload
): Promise<Products> => {
  const product = new Products();
  return await _repository.save({
    ...product,
    ...payload,
  });
};

export const updateProduct = async (
  _repository: Repository<Products>,
  payload: IProductPayload
): Promise<Products> => {
  const product = new Products();
  return _repository.save(product);
};

export const getProduct = async (_repository: Repository<Products>, id: number): Promise<Products | null> => {
  const product = await _repository.findOne({ where: { productid: id} });
  if (!product) return null;
  return product;
};

export const removeProduct = async (_repository: Repository<Products>, id: number): Promise<Products | null | any> => {
  return await _repository.softDelete({productid: id});
};