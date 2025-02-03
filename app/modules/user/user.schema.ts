import { model, Schema } from "mongoose";
import { IUser } from "./user.types";

const userSchema = new Schema({
  name: {
    type: String,
    // require: true,
  },
  mobileNumber: {
    type: Number,
    // require: true,
  },
  address: {
    type: String,
    // require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  deletedAt: {
    type: Date,
    require: true,
  },
});

type IUserDocument = Document & IUser;

const userModel = model<IUserDocument>("User", userSchema);

export default userModel;
