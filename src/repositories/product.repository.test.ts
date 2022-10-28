import * as ProductRepository from './Product.repository'
import {getRepository} from 'typeorm'
import { mocked } from 'ts-jest/utils'
import {generateProductsData, generateProductPayload, generateProductData} from 'test/utils/generate'
import { Products } from '../models';

jest.mock('typeorm');

const mockedGetRepo = mocked(getRepository(<jest.Mock>{}))
const _repository = getRepository(Products);
beforeEach(() => {
  mockedGetRepo.find.mockClear()
  mockedGetRepo.findOne.mockClear()
  mockedGetRepo.save.mockClear()
})

describe("ProductRepository", () => {
  describe("getProducts", () => {
    test("should return empty array", async () => {
      mockedGetRepo.find.mockResolvedValue([])
      const Products = await ProductRepository.getProducts(_repository);
      expect(Products).toEqual([])
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })

    test("should return Products list", async () => {
      const ProductsData = generateProductsData(2)
      mockedGetRepo.find.mockResolvedValue(ProductsData)
      const Products = await ProductRepository.getProducts(_repository);
      expect(Products).toEqual(ProductsData)
      expect(mockedGetRepo.find).toHaveBeenCalledWith()
      expect(mockedGetRepo.find).toHaveBeenCalledTimes(1)
    })
  })

  describe("createProduct", () => {
    test("should add Product to the database", async () => {
      const payload = generateProductPayload()
      const ProductData = generateProductData(payload)
      mockedGetRepo.save.mockResolvedValue(ProductData)
      const Product = await ProductRepository.createProduct(_repository, payload);
      expect(Product).toMatchObject(payload)
      expect(Product).toEqual(ProductData)
      expect(mockedGetRepo.save).toHaveBeenCalledWith(payload)
      expect(mockedGetRepo.save).toHaveBeenCalledTimes(1)
    })
  })

  describe("getProduct", () => {
    test("should return Product from the database", async () => {
      const id = 1
      const ProductData = generateProductData({id})
      mockedGetRepo.findOne.mockResolvedValue(ProductData)
      const Product = await ProductRepository.getProduct(_repository, id);
      expect(Product).toEqual(ProductData)
      expect(Product?.productid).toBe(id)
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })

    test("should return null if Product not found", async () => {
      const id = 1
      mockedGetRepo.findOne.mockResolvedValue(null)
      const Product = await ProductRepository.getProduct(_repository, id);
      expect(Product).toBeNull()
      expect(mockedGetRepo.findOne).toHaveBeenCalledWith({id})
      expect(mockedGetRepo.findOne).toHaveBeenCalledTimes(1)
    })
  })
})