require('dotenv').config()
const express = require('express')
const path = require('path')
const loggerMiddleware = require('./middlewares/loggerMiddleware')
const errorMiddleware = require('./middlewares/errorMiddleware')
const utf8Middleware = require('./middlewares/utf8Middleware') 
const healthRoutes = require('./routes/healthRoutes')
const documentRoutes = require('./routes/documentRoutes')
const { initDb } = require('./database/db')

const app = express()

app.use(loggerMiddleware)
app.use(express.json())
app.use(utf8Middleware)
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')))
app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/health', healthRoutes)
app.use('/api/documents', documentRoutes)

app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

app.use(errorMiddleware)

if (require.main === module) {
    initDb().then(() => {
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    })
}

module.exports = app
