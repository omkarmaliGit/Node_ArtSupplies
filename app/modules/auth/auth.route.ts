import { Request, Response, NextFunction, Router } from "express";
import { login } from "./auth.service";

export const AuthRouter = Router();

AuthRouter.get("/login", (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = login();
    // result.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});
