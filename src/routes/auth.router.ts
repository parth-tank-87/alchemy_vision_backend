import express from "express";
import AuthController from "../controllers/auth.controller";
import { StatusCodes } from "http-status-codes";
import { body, validationResult } from "express-validator";

export default class AuthRouter {
  public router = express.Router();
  
  get controller() {
    return new AuthController();
  }

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    this.router.post("/register", 
    body('first_name').notEmpty(),
    body('last_name').notEmpty(),
    body('email').isEmail(),
    body('mobile_number').notEmpty(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }
        
        const response = await this.controller.createUser(req.body);
        return res.status(StatusCodes.OK).send({
          success: true,
          message: 'registered successfully..!',
          user: response
        });
      } catch (e) {
        console.log('e: ', e);
        return res.send(e);
      }
    });

    this.router.get("/profiles", async (req, res) => {
      try {
        const response = await this.controller.getUsers();
        return res.status(StatusCodes.OK).send(response);
      } catch (e) {
        console.log('e: ', e);
        return res.send(e);
      }
    });

    this.router.post("/login", async (req, res) => {
      try {
        const response = await this.controller.login(req.body);
        if (response) {
          return res.status(StatusCodes.OK).send({
            success: true,
            user: response,
            message: 'logged in successfully'
          });
        } else {
          return res.status(StatusCodes.OK).send({
            success: false,
            message: 'unauthorized'
          });
        }
      } catch (e) {
        console.log('e: ', e);
        return res.send(e);
      }
    });
  }
}
