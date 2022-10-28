import { Get, Route, Tags, Post, Body, Path, Delete, Put } from "tsoa";
import { getRepository, Repository } from "typeorm";
import { Products } from "../models";
import {
  getProducts,
  IProductPayload,
  createProduct,
  getProduct,
  removeProduct,
  updateProduct,
} from "../repositories/product.repository";

@Route("product")
@Tags("Product")
export default class ProductController {

  protected _repository: Repository<Products>;

  constructor() {
    this._repository = getRepository(Products);
  }

  @Get("/all")
  public async getProducts(): Promise<Array<Products>> {
    return getProducts(this._repository);
  }

  @Post("/")
  public async createProduct(@Body() body: IProductPayload): Promise<Products> {
    return createProduct(this._repository, body);
  }

  @Get("/:id")
  public async getProduct(@Path() id: string): Promise<Products | null> {
    return getProduct(this._repository, Number(id));
  }

  @Put("/")
  public async updateProduct(@Body() body: IProductPayload): Promise<Products> {
    return updateProduct(this._repository, body);
  }

  @Delete("/:id")
  public async removeProduct(@Path() id: string): Promise<Products | null> {
    return removeProduct(this._repository, Number(id));
  }
}
