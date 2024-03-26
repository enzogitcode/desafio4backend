const express = require('express')
const app = express();
const PUERTO = 8080;
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const exphbs = require("express-handlebars")
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars')
app.set("views", './src/views')
app.use (express.static (".src/public"))

app.get("/", (req, res) => {
    const usuario= {
        nombre:"tinky",
        apellido: "winky"

    }
    const arrayProductos= ""
    res.render('index', {usuario, arrayProductos, titulo: "platillita"})
})
app.get("/contacto", (req, res) => {
    res.render("contacto")
})
