import express from "express";
import ProductController from "../controllers/product.controller";
import { StatusCodes } from "http-status-codes";

export default class ProductRouter {
  public router = express.Router();
  get controller() {
    return new ProductController();
  }

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.getAllProducts();

    this.router.post("/", async (req, res) => {
      try {
        const response = await this.controller.createProduct(req.body);
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        return res.send(e);
      }
    });

    this.router.get("/:id", async (req, res) => {
      try {
        const response: any = await this.controller.getProduct(req.params.id);
        if (!response)
          res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: "No comment found" });
        return res.send(response);
      } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("OOPS");
      }
    });

    this.router.put("/:id", async (req, res) => {
      try {
        const response = await this.controller.updateProduct(Number(req.params.id), req.body) as any;
        if (!response)
          res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: "No comment found" });
        return res.send(response);
      } catch (e: any) {
        console.log('e: ', e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("OOPS");
      }
    });

    this.router.delete("/:id", async (req, res) => {
      try {
        const response = await this.controller.removeProduct(req.params.id);
        if (!response)
          res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: "No comment found" });
        return res.send(response);
      } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
      }
    });
  }

  getAllProducts(): void {
    this.router.get("/all", async (_req, res) => {
      try {
        const response = await this.controller.getProducts();
        res.status(StatusCodes.OK).send(response);
      } catch (e) {
        console.log("e: ", e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e);
      }
    });
  }
}
