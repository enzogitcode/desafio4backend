const express= require('express')
const productsRouter = express.Router();
const ProductManager= require ('./../controllers/product-manager.js')
const productManager = new ProductManager('./src/models/products.json');

productsRouter.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit))
        }
        else {
            res.json(products)
        }
    } catch (error) {
        console.error("error en el servidor", error)
        res.status(500).json({
            error: "error interno del servidor qwerty"
        })

    }
})

productsRouter.get("/products/:pid", async (req, res) => {

    const id = req.params.pid;

    try {
        const product = await productManager.getProductbyId(parseInt(id));
        if (!product) {
            return res.json({
                error: "No existe un producto con ese ID"
            });
        }
        res.json(product);
    } catch (error) {
        res.status.json("error al obtener el producto")
        console.error("Error", error);
        throw error;

    }
})
productsRouter.post("/", async (req, res) => {
    const nvoProduct = req.body
    try {
        await productManager.addProduct(nvoProduct);
        res.status(201).json({ message: "Producto agregado con éxito" })

    } catch (error) {
        res.status(500).json({ error: "Error del servidor" })
    }
})

productsRouter.put("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    const updatedProduct = req.body;
    try {
        await productManager.updateProduct(parseInt(id), updatedProduct)
        res.json({ message: "producto actualizado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error del servidor en updatedProduct" })
    }

})

module.exports= productsRouter;