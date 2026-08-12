require("dotenv").config() // Carrega as variáveis de ambiente presentes no arquivo .env.

const app = require("./app") // Importa a aplicação Express configurada no app.js.

const PORT = process.env.PORT || 3000
// Tenta pegar a porta definida na variável de ambiente PORT.
// Caso ela não exista, utiliza a porta 3000.

app.listen(PORT, () => {
    console.log(`DocTranscriber API running on port ${PORT}`)
})
// Inicia o servidor HTTP.
// O servidor passa a escutar requisições na porta definida.
// Quando o servidor estiver funcionando, executa o console.log.