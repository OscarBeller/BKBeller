// const fs = require('fs');
import fs from 'fs';

class ProductManager {
    #products;
    #path;
    static idProducto = 0;

    constructor() {
        this.#path = ".src/data/productos.json";
        this.#products = this.#leerProdcutosInfile();
    }

    #asignarIdProducto(){
        let id = 1; 
        if (this.#products.length != 0)
            id = this.#products[this.#products.length - 1].id + 1;
        return id;
    }

    #leerProdcutosInfile(){
        try {
            if(fs.existsSync(this.#path)){
                return JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
            }
            return [];
        } catch (error) {
            console.log(`ocurrio un error al momento de leer el archivo de productos, ${error}`);
            
        }
    }

    #guardarArchivo(){
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
        } catch (error) {
            console.log(`ocurrio un error al momento de guardar el archivo de productos, ${error}`);
        }
    }

    addProduct(title, description, price, thumbnail=[], code, stock, category, status = false) {
        if (!title || !description || !price  || !code || !stock || !category)
            return 'Todos los campos son obligatorios (title, description, price,  code, stock, category)';

        const codeRepeat = this.#products.some(product => product.code == code);
        if (codeRepeat)
            return `Error, el código ${code} se está repitiendo`;

        ProductManager.idProducto = ProductManager.idProducto + 1;
        const id = this.#asignarIdProducto();

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock, 
            category,
            status
        };

        this.#products.push(newProduct);
        this.#guardarArchivo()
        return 'El producto se ha añadido correctamente';
    }

    getProducts(limit = 0) {
        limit = Number(limit);
        if(limit > 0)
            return this.#products.slice(0,limit) 
        return this.#products;
    }

    getProductsById(id) {
        const producto = this.#products.find(product => product.id === id);
        if (producto) {
            return producto;
        } else {
            return `No se encontraron productos con la ID: ${id}`
        };
    }

    updateProduct(id, objetUpdate){
        let msg  = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1){
            const{id, ...rest} = objetUpdate;
            this.#products[index] = {...this.#products[index], ...rest};
            this.#guardarArchivo();
            msg= 'Producto actualizado';
        } 
        return  "Se ha actualizado el producto";
    }

    deleteProduct(id){
        let msg = `El producto con id  ${id } no existe`
        const index = this.#products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.#products = this.#products.filter(product => product.id !== id);
            this.#guardarArchivo()
            msg = "Se eliminó el producto correctamente";
    }
    return msg;
}
}

export default  ProductManager;