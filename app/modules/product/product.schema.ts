import { model, Schema } from "mongoose";
import { IProduct } from "./product.types";

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  detail: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  imgLink: {
    type: String,
    require: true,
  },
});

type IProductDocument = Document & IProduct;

const productModel = model<IProductDocument>("Product", productSchema);

export default productModel;
