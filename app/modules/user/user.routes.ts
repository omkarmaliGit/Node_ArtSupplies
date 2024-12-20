import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import dummyService from "./user.service";
import { permit } from "../auth/auth.service";

export const DummyRouter = Router();

DummyRouter.get(
  "/fhsg",
  permit(["admin", "semiAdmin"]),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = dummyService.dummyGet();
      // result.send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  }
);
