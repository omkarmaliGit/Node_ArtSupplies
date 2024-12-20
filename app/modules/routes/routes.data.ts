import { Route, Routes } from "./routes.types";
import { IExcludedPaths } from "../auth/auth.types";
import { DummyRouter } from "../user/user.routes";

export const routes: Routes = [
  new Route("/dummy", DummyRouter),
  new Route("/auth", DummyRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "auth/login", method: "POST" },
  { path: "auth/register", method: "POST" },
];
