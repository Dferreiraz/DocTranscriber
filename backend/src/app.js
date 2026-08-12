const express = require("express") // Cria uma constante chamada "express" e importa o pacote Express.
const healthRoutes = require("./routes/healthRoutes") // Importa as rotas relacionadas ao Health Check.

const loggerMiddleware = require("./middlewares/loggerMiddleware") // Importa o middleware responsável por registrar as requisições no terminal.


const app = express()
// Executa o Express e cria a aplicação.
// "app" será utilizado para configurar o servidor,
// middlewares, rotas etc.


app.use(loggerMiddleware)
// Registra o logger como middleware global.
// Toda requisição que chegar na aplicação passará por ele.


app.use(express.json())
// Middleware nativo do Express que permite interpretar
// requisições que possuem JSON no body.


app.use("/api/health", healthRoutes)
// Registra as rotas de Health Check.
// Tudo que estiver definido dentro de healthRoutes
// ficará disponível a partir de "/api/health".


module.exports = app
// Exporta a aplicação "app" para que outro arquivo,
// como o server.js, possa utilizá-la.