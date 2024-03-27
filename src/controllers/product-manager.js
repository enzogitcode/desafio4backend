const fs= require('fs').promises

class ProductManager {
    static ultId = 0
    constructor(path) {
        this.products = []
        this.path = path
    }

    async leerArchivo() {
        try {
            const response = await fs.readFile(this.path, "utf-8")
            const arrayProducts = JSON.parse(response)
            return arrayProducts;
        } catch (error) {
            console.log("error al leer el archivo", error);
            throw error;
        }
    }
    saveFile = async (arrayProducts) => {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log("no se puede sobreescribir el archivo", error)
        }
    }
    async addProduct({ title, description, price, img, code, stock, category, thumbnails }) {
        try {
          const arrayProducts = await this.leerArchivo();
    
          if (!title || !description || !price || !code || !stock || !category) {
            console.log("Todos los campos son obligatorios");
            return;
          }
    
          if (arrayProducts.some(item => item.code === code)) {
            console.log("El código debe ser único");
            return;
          }
    
          const newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status: true,
            thumbnails: thumbnails || []
          };
    
          if (arrayProducts.length > 0) {
            ProductManager.ultId = arrayProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
          }
    
          newProduct.id = ++ProductManager.ultId; 
    
          arrayProducts.push(newProduct);
          await this.guardarArchivo(arrayProducts);
        } catch (error) {
          console.log("Error al agregar producto", error);
          throw error; 
        }
      }
    async getProducts() {
        try {
            const arrayProducts = await this.leerArchivo();
            return arrayProducts;

        } catch (error) {
            console.log("error al leer el archivo", error);
            throw error;
        }
    }

    async getProductbyId(id) {
        try {
            const arrayProducts = await this.leerArchivo()
            const foundingProduct = arrayProducts.find(product => product.id == id)
            if (!foundingProduct) {
                console.log("No existe un producto con ese ID");
            }
            else {
                return foundingProduct;
            }
        } catch (error) {
            console.log("no se pudo leer el archivo", error);
            res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }


    async updateProduct(id, updatedProduct) {
        try {
            const arrayProducts = await this.leerArchivo();

            const index = arrayProducts.findIndex(item => item.id == id);

            if (index !== -1) {
                arrayProducts[index] = { ...arrayProducts[index], ...updatedProduct };
                await this.saveFile(arrayProducts);
                console.log("Producto actualizado");
            } else {
                console.log("No se encontró el producto");
            }
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.leerArchivo();

            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProducts.splice(index, 1);
                await this.saveFile(arrayProducts);
                console.log("Producto eliminado");
            } else {
                console.log("No se encontró el producto");
            }
        } catch (error) {
            console.log("Error al eliminar el producto", error);
            throw error;
        }
    }

}
module.exports= ProductManager;