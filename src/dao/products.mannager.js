import ProductModel from './models/products.model.js'

export default class ProductsManager {
  static get() {
    return ProductModel.find();
  }
  static async getById(sid) {
    const product = await ProductModel.findById(sid);
    if (!product) {
      throw new Error('Producto no encontrado.')
    }
    return product;
  }
  static async create(data) {
    const product = await ProductModel.create(data);
    console.log(`Producto creado correctamente (${product._id}) `)
    return product;
  }

  static async updateById(sid, data) {
    await ProductModel.updateOne({ _id: sid }, { $set: data });
    console.log(`Producto actualizado correctamente (${sid}) `)
  }

  static async deleteById(sid) {
    await ProductModel.deleteOne({ _id: sid });
    console.log(`Producto eliminado correctamente (${sid}) `)
  }

}