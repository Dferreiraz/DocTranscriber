const express = require ('express')
const loggerMiddleware = require('./middlewares/loggerMiddleware')
const healthRoutes = require('./routes/healthRoutes')
const documentRoutes = require('./routes/documentRoutes')

const app = express()
const PORT = 3000

app.use(loggerMiddleware)
app.use(express.json())

app.use('/api/health', healthRoutes) 
app.use('/api/documents', documentRoutes)

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
})