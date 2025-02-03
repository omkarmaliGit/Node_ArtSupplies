import { Route, Routes } from "./routes.types";
import { IExcludedPaths } from "../auth/auth.types";
import AuthRouter from "../auth/auth.routes";
import { UserRouter } from "../user/user.routes";
import { ProductRouter } from "../product/product.routes";

export const routes: Routes = [
  new Route("/auth", AuthRouter),
  new Route("/user", UserRouter),
  new Route("/product", ProductRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "/auth/login", method: "POST" },
  { path: "/auth/register", method: "POST" },
];
