import express from "express";
import PingController from "../controllers/ping.controller";
import PostRouter from "./post.router";
import UserRouter from "./user.router";
import CommentRouter from "./comment.router";
import ProductRouter from "./product.router";
import FileUploadRouter from "./file-upload";
import StripeRouter from "./stripe.router";
import FeaturesRouter from "./features.router";
import PlansRouter from "./plans.router";
import AuthRouter from "./auth.router";

const router = express.Router();
router.get("/", async (_req, res) => {
  return res.send("Welcome to the Alchemy Vision APIs!!!");
});
router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});
router.use("/users", UserRouter)
router.use("/posts", PostRouter)
router.use("/comments", CommentRouter)
router.use("/file-upload", FileUploadRouter)
router.use("/stripe", StripeRouter)
router.use("/product", new ProductRouter().router)
router.use("/features", new FeaturesRouter().router)
router.use("/plans", new PlansRouter().router)
router.use("/", new AuthRouter().router)

export default router;