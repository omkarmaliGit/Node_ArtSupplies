import productRepo from "./product.repo";
import { IProduct } from "./product.types";
import bcrypt from "bcrypt";

const getProducts_service = async () => {
  const products = await productRepo.getProducts_repo();
  return products;
};

const getOneProduct_service = async (searchKey: Record<string, any>) => {
  const product = await productRepo.getOneProduct_repo(searchKey);
  return product;
};

const addProduct_service = async (productData: IProduct) => {
  const newProduct: IProduct = {
    name: productData.name,
    detail: productData.detail,
    category: productData.category,
    price: productData.price,
    imgLink: productData.imgLink,
  };

  const product = await productRepo.addProduct_repo(newProduct);
  return product;
};

const removeProduct_service = async (_id: any) => {
  const product = await productRepo.removeProduct_repo(_id);
  return product;
};

const updateProduct_service = async (_id: any, productData: IProduct) => {
  const newProduct: IProduct = {
    name: productData.name,
    detail: productData.detail,
    category: productData.category,
    price: productData.price,
    imgLink: productData.imgLink,
  };

  const product = await productRepo.updateProduct_repo(_id, newProduct);
  return product;
};

export default {
  getProducts_service,
  getOneProduct_service,
  addProduct_service,
  removeProduct_service,
  updateProduct_service,
};
