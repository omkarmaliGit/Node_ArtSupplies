type role = "USER" | "ADMIN" | "SEMIADMIN";

export interface IUser {
  name: string | null;
  mobileNumber: number | null;
  address: string | null;
  email: string;
  password: string;
  role: role;
  deletedAt: Date | null;
}

export const USER_ROLE = {
  USER: "USER",
  ADMIN: "ADMIN",
  SEMIADMIN: "SEMIADMIN",
};
