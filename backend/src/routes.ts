import { Router } from "express";
import { PriceController, SacController } from "./controllers";

const routes = Router();

routes.post('/sac', new SacController().show);
routes.post('/price', new PriceController().show);

export default routes;