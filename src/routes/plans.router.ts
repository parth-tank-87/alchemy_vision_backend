import express from "express";
import PlansController from "../controllers/plans.controller";
import { StatusCodes } from "http-status-codes";

export default class PlansRouter {
  public router = express.Router();
  
  get controller() {
    return new PlansController();
  }

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.get("/", async (req, res) => {
      try {
        const response = await this.controller.getPlans();
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        return res.send(e);
      }
    });

    this.router.post("/", async (req, res) => {
      try {
        const response = await this.controller.createPlan(req.body);
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        return res.send(e);
      }
    });

    this.router.get("/:id", async (req, res) => {
      try {
        const response = await this.controller.getPlan(req.params.id);
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        return res.send(e);
      }
    });

    this.router.post("/purchase", async (req, res) => {
      try {
        const response = await this.controller.purchasePlan(req.body);
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        return res.send(e);
      }
    });

    this.router.post("/subscriptions", async (req, res) => {
      try {
        const response = await this.controller.getSubscriptions();
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        console.log('e: ', e);
        return res.send(e);
      }
    });
  }
}
 