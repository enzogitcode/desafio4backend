const express = require('express')
const exphbs = require("express-handlebars");
const socket = require("socket.io");

const app = express();
const PUERTO = 8080;
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require("./routes/products-router.js");
const cartsRouter = require("./routes/carts-router.js");
const viewsRouter = require("./routes/views-router.js");

app.use("/api", productsRouter);
app.use("/api", cartsRouter);
//app.use("/", viewsRouter);

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')
app.set("views", './src/views')
app.use(express.static(".src/public"))

//app.use ("/", )

const io = socket(httpServer);
const ProductManager = require("./controllers/product-manager.js")
const productManager = new ProductManager("../src/models/products.json")

io.on("connection", async (socket) => {
    console.log("un cliente conectado")
})

