import express from "express";
import FeaturesController from "../controllers/features.controller";
import { StatusCodes } from "http-status-codes";

export default class FeaturesRouter {
  public router = express.Router();
  
  get controller() {
    return new FeaturesController();
  }

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", async (req, res) => {
      try {
        const response = await this.controller.getFeatures();
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        return res.send(e);
      }
    });

    this.router.post("/", async (req, res) => {
      try {
        const response = await this.controller.createFeature(req.body);
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        return res.send(e);
      }
    });

    this.router.get("/:id", async (req, res) => {
      try {
        const response = await this.controller.getFeature(req.params.id);
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        return res.send(e);
      }
    });
  }
}
