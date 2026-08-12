const loggerMiddleware = (req, res, next) => {
    // Cria uma função middleware.
    // req representa a requisição.
    // res representa a resposta.
    // next permite continuar para o próximo middleware ou rota.


    console.log(`${req.method} ${req.url}`)
    // Mostra no terminal o método HTTP e a URL acessada.
    //
    // Exemplo:
    // GET /api/health


    next()
    // Informa ao Express que o middleware terminou
    // e que a requisição pode continuar.
}


module.exports = loggerMiddleware // Exporta o middleware para poder utilizá-lo no app.js.