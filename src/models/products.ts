import { GraphQLError } from "graphql";
import ProductModel from "../database/model/productModel";
import { IProducts } from "../types/products";

export default class Products {
  static async GetAll (): Promise<IProducts[]> {
    return await ProductModel.findAll();
  }

  static async GetById (id: string): Promise<IProducts | null> {
    return await ProductModel.findByPk(id);
  }

  static async Create (product: IProducts): Promise<IProducts> {
    const newProduct = await ProductModel.create({
      name: product.name,
      model: product.model,
      family: product.family,
      stock: product.stock,
      price: product.price,
      brand: product.brand,
      image: "url-del-producto-aqui"
    });

    return newProduct;
  }

  static async Update (id: string, product: IProducts): Promise<IProducts> {
    const productFind = await ProductModel.findByPk(id);

    if (!productFind) throw new GraphQLError("Product not found", { 
      extensions: { code: "BAD_USER_INPUT" } 
    });

    productFind.set(product);
    await productFind.save();

    return productFind;

  }

  static async Delete (id: string): Promise<IProducts> {
    const productFind = await ProductModel.findByPk(id);

    if (!productFind) throw new GraphQLError("Product not found", { 
      extensions: { code: "BAD_USER_INPUT" } 
    });

    await ProductModel.destroy({ where: { id } });

    return productFind;
  }
}