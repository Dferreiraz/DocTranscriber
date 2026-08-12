const healthController = (req, res) => {
    // Cria uma função Controller.
    //
    // req = requisição recebida.
    // res = objeto utilizado para enviar a resposta.


    res.status(200).json({
        status: "ok",
        message: "DocTranscriber API is running"
    })
    // Define o status HTTP como 200 (OK)
    // e envia um objeto JavaScript como JSON.
}


module.exports = healthController // Exporta o Controller para ser utilizado pelo Router.