const fs= require ('fs').promises

class CartManager {
    constructor(path) {
        this.path = path
        this.carts = []
        this.loadCarts();
    }
    static ultId = 0
    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8")
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart => cart.id))
            }

        } catch (error) {
            console.log("Error al crear los carritos: ", error);
            await this.saveCarts();
        }
    }
    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    }
    async createCarts() {
        const nvoCart = {
            id: ++this.ultId,
            products: []
        }
        this.carts.push(nvoCart);
        await this.carts.saveCarts();
        return nvoCart;
    }
    async getCartbyId(cartId) {
        try {
            const cart = this.carts.find(c => c.id == cartId)
            if (!cart) {
                console.log("no hay carrito con ese ID")

                return;
            }
            else {
                return cart
            }
        } catch (error) {
            console.log(error)
        }
    }
    async addToCart(cartId, productId, quantity) {
        const cart = await this.getCartbyId(cartId);
        const findProduct = cart.products.find(p => p.product === productId);
        if (findProduct) {
            findProduct.quantity += quantity;
        }
        else {
            cart.products.push({ product: productId, quantity })
        }
        await this.saveCarts();
        return cart;
    }
}

modules.exports= CartManager;