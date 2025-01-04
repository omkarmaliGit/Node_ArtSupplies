import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import dummyService from "./product.service";
import { permit } from "../auth/auth.service";

export const DummyRouter = Router();

DummyRouter.post(
  "/product",
  permit(["admin", "semiAdmin"]),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = dummyService.getProduct();
      // result.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);
