import productModel from "./product.schema";
import { IProduct } from "./product.types";

const getProducts_repo = () => productModel.find({ deletedAt: null });

const getOneProduct_repo = (searchKey: Record<string, any>) => {
  if (searchKey._id) {
    return productModel.findById({ ...searchKey, deletedAt: null });
  } else {
    return productModel.findOne({ ...searchKey, deletedAt: null });
  }
};

const addProduct_repo = (productData: IProduct) =>
  productModel.create(productData);

const removeProduct_repo = (_id: any) =>
  productModel.findByIdAndUpdate(_id, { deletedAt: new Date() });

const updateProduct_repo = (_id: any, productData: IProduct) =>
  productModel.findByIdAndUpdate(_id, productData);

export default {
  getProducts_repo,
  getOneProduct_repo,
  addProduct_repo,
  removeProduct_repo,
  updateProduct_repo,
};
