import fs from "fs";
import ProductManager from "./ProductManager.js";
const productManager = new ProductManager("./src/data/products.json");
export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async validateCart() {
    if (fs.existsSync(this.path)) {
      await this.addJsonCart();
    } else {
      await this.createJsonCart();
    }
    return "Cart created successfully!";
  }

  async readData() {
    let cartData = await fs.promises.readFile(this.path, {
      encoding: "utf-8",
    });
    let parsedData = JSON.parse(cartData);
    return parsedData;
  }

  async saveData(data) {
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, 5));
  }

  async addJsonCart() {
    let cartList = await this.readData();
    cartList.push({ id: cartList.length + 1, products: [] });
    await this.saveData(cartList);
  }

  async createJsonCart() {
    let cart = [];
    cart.push({ id: cart.length + 1, products: [] });
    await this.saveData(cart);
  }

  async getCart() {
    let cart = await this.readData();
    return cart;
  }

  async getCartById(id) {
    let cart = await this.readData();
    const searchCart = cart.find((cart) => cart.id === id);
    if (searchCart) {
      return searchCart.products;
    } else {
      return `Cart ${id} not found`;
    }
  }

  async addProducts(idCart, idProduct) {
    let cart = await this.getCart();
    const searchCart = cart.find((cart) => cart.id === idCart);
    let product = await productManager.getProductsById(idProduct);
    let quantityValidation = searchCart.products.some(
      (p) => p.id == product.id
    );

    if (!searchCart) {
      return `Cart ${idCart} not found`;
    }

    if (!product) {
      return `Product ${idProduct} not found`;
    }

    if (quantityValidation) {
      let findProduct = searchCart.products.find((p) => p.id == product.id);
      findProduct.quantity = findProduct.quantity + 1;
    } else {
      searchCart.products.push({ id: product.id, quantity: 1 });
    }

    await this.saveData(cart);
  }
}
