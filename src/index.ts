import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import Router from "./routes";
import dbConfig from "./config/database";
import addErrorHandler from "./middleware/error-handler";
import { getApiLimiter } from "./services/rate-limit";
import * as path from 'path';

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use('', getApiLimiter());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, '../public')));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
app.use(Router);
app.use(addErrorHandler);

createConnection(dbConfig).then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
}).catch((err) => {
  console.log("Unable to connect to db", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error('err', err);
  console.log("Node NOT Exiting...");
});
