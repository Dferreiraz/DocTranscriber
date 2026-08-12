const express = require("express")
// Importa o Express.


const router = express.Router()
// Cria uma instância de Router do Express.
// Esse router será responsável pelas rotas de Health Check.


const healthController = require("../controllers/healthController")
// Importa o Controller responsável por responder
// às requisições de Health Check.


router.get("/", healthController)
// Define uma rota GET.
//
// Quando alguém acessar:
//
// GET /api/health
//
// o Express executará o healthController.
//
// O "/" é relativo ao prefixo definido no app.js:
//
// app.use("/api/health", healthRoutes)


module.exports = router // Exporta o Router para ser utilizado pelo app.js.