import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import productService from "./product.service";
import { Types } from "mongoose";
import { permit } from "../auth/auth.service";
import { PRODUCT_MESSAGES } from "./product.constants";

export const ProductRouter = Router();

ProductRouter.get(
  "/",
  // permit([USER_ROLE.ADMIN, USER_ROLE.SEMIADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.getProducts_service();
      res.send(new ResponseHandler(result, PRODUCT_MESSAGES.SHOW_All));
    } catch (e) {
      next(e);
    }
  }
);

ProductRouter.get(
  "/:id",
  // permit([USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SEMIADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error(PRODUCT_MESSAGES.INVALID_OBJID);
      }
      const _id: Types.ObjectId = new Types.ObjectId(objId);

      const result = await productService.getOneProduct_service({ _id });
      res.send(new ResponseHandler(result, PRODUCT_MESSAGES.SHOW_SINGLE));
    } catch (e) {
      next(e);
    }
  }
);

ProductRouter.post(
  "/",
  // permit([USER_ROLE.ADMIN, USER_ROLE.SEMIADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await productService.addProduct_service(req.body);
      res.send(new ResponseHandler(result, PRODUCT_MESSAGES.PRODUCT_ADD));
    } catch (e) {
      next(e);
    }
  }
);

ProductRouter.delete(
  "/:id",
  // permit([USER_ROLE.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error(PRODUCT_MESSAGES.INVALID_OBJID);
      }
      const userId: Types.ObjectId = new Types.ObjectId(objId);
      const result = await productService.removeProduct_service(userId);
      // console.log(result);
      res.send(new ResponseHandler(result, PRODUCT_MESSAGES.PRODUCT_DELETE));
    } catch (e) {
      next(e);
    }
  }
);

ProductRouter.put(
  "/:id",
  // permit([USER_ROLE.USER]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const objId = req.params.id;
      if (!Types.ObjectId.isValid(objId)) {
        throw new Error(PRODUCT_MESSAGES.INVALID_OBJID);
      }
      const userId: Types.ObjectId = new Types.ObjectId(objId);
      const result = await productService.updateProduct_service(
        userId,
        req.body
      );
      console.log(result);
      res.send(new ResponseHandler(result, PRODUCT_MESSAGES.PRODUCT_UPDATE));
    } catch (e) {
      next(e);
    }
  }
);
