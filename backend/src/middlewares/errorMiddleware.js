const errorMiddleware = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`)
    
    if (err.message === 'Apenas arquivos PDF são permitidos!') {
        return res.status(400).json({ message: err.message })
    }
    
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'Arquivo muito grande. Limite de 10MB.' })
    }

    res.status(500).json({ 
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
}

module.exports = errorMiddleware