const express= require ('express')
const cartsRouter = express.Router();
const CartManager= require ('./controllers/cart-manager.js')
const cartManager = new CartManager('./src/models/carts.json');

cartsRouter.post("/carts", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
})


cartsRouter.get("/carts/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid)
    try {
        const nvoCart = await cartManager.getCartbyId(cartId);
        res.json(nvoCart.products)
    } catch (error) {
        res.status(500).json({ error: "error interno del servidor GET" })

    }
})

cartsRouter.post("/carts/:cid/product/:pid", async (req, res) => {
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    const quantity = req.body.quantity || 1;
    try {
        const updateCart = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(updateCart.products);
    } catch (error) {
        res.status(500).json({ error: "error interno del servidor Post" })

    }
})


modules.exports= cartsRouter;