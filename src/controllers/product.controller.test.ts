import ProductController from './Product.controller'
import * as ProductRepository from '../repositories/Product.repository'
import {generateProductsData, generateProductPayload, generateProductData} from '../../test/utils/generate';
import { Products } from '../models';

afterEach(() => {
  jest.resetAllMocks()
})

describe("ProductController", () => {
  describe("getProducts", () => {
    test("should return empty array", async () => {
      const spy = jest.spyOn(ProductRepository, 'getProducts').mockResolvedValueOnce([])
      const controller = new ProductController();
      const Products = await controller.getProducts();
      expect(Products).toEqual([])
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return Products list", async () => {
      const ProductsData = generateProductsData(2)
      const spy = jest.spyOn(ProductRepository, 'getProducts').mockResolvedValueOnce(ProductsData)
      const controller = new ProductController();
      const Products = await controller.getProducts();
      expect(Products).toEqual(ProductsData)
      expect(spy).toHaveBeenCalledWith()
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("createProduct", () => {
    test("should add Product to the database", async () => {
      const payload = generateProductPayload()
      const ProductData: Products = generateProductData(payload)
      const spy = jest.spyOn(ProductRepository, 'createProduct').mockResolvedValueOnce(ProductData)
      const controller = new ProductController();
      const Product = await controller.createProduct(payload);
      expect(Product).toMatchObject(payload)
      expect(Product).toEqual(ProductData)
      expect(spy).toHaveBeenCalledWith(payload)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("getProduct", () => {
    test("should return Product from the database", async () => {
      const id = 1
      const ProductData = generateProductData({productid: id})
      const spy = jest.spyOn(ProductRepository, 'getProduct').mockResolvedValueOnce(ProductData)
      const controller = new ProductController();
      const Product = await controller.getProduct(id.toString());
      expect(Product).toEqual(ProductData)
      expect(Product?.productid).toBe(id)
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return null if Product not found", async () => {
      const id = 1
      const spy = jest.spyOn(ProductRepository, 'getProduct').mockResolvedValueOnce(null)
      const controller = new ProductController();
      const Product = await controller.getProduct(id.toString());
      expect(Product).toBeNull()
      expect(spy).toHaveBeenCalledWith(id)
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })
})