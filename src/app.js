const express = require('express')
const app = express();
const PUERTO = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`)
})
app.get("/", (req, res) => {
    res.send(`Puerto ${PUERTO} funcionando`)
})