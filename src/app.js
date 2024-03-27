const express = require('express')
const app = express();
const PUERTO = 8080;
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const exphbs = require("express-handlebars")
const socket = require ("socket.io")
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')
app.set("views", './src/views')
app.use (express.static (".src/public"))

app.get("/", (req, res) => {
    const usuario= {
        nombre:"tinky",
        apellido: "winky"

    }
    
    res.render('index', {usuario, titulo: "Mi E-commerce"})
})
app.get("/contacto", (req, res) => {
    res.render("contacto")
})
