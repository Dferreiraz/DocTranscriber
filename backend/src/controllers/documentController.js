const db = require('../database/db')

const getAllDocuments = (req, res) => {
    const documents = db.prepare('SELECT * FROM documents').all()

    res.status(200).json(documents)
}

const getDocumentById = (req, res) => {
    const { id } = req.params

    const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)

    if (!document) {
        return res.status(404).json({
            message: 'Documento não encontrado'
        })
    }

    res.status(200).json(document)
}

const createDocument = (req, res) => {
    const file = req.file

    if (!file) {
        return res.status(400).json({
            message: 'Nenhum arquivo enviado'
        })
    }

    // Insere o novo documento no banco
    const result = db.prepare(`
        INSERT INTO documents(filename, filepath, status, extracted_data, created_at)
        VALUES (?, ?, ?, ?, ?)
    `).run(
        file.originalname,
        file.path,
        'pending',
        null,
        new Date().toISOString()
    )

     const newDocument = db.prepare('SELECT * FROM documents WHERE id = ?').get(result.lastInsertRowid)

     res.status(201).json(newDocument)
}

const updateDocument = (req, res) => {
    const { id } = req.params
    const { status, extracted_data } = req.body

    const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)

    if (!document) {
        return res.status(404).json({
            message: 'Documento não encontrado'
        })
    }

    const newStatus = status !== undefined ? status : document.status
    const newExtractedData = extracted_data !== undefined ? extracted_data : document.extracted_data

    db.prepare(`
        UPDATE documents
        SET status = ?, extracted_data = ?
        WHERE id = ?
    `).run(newStatus, newExtractedData, id)

    const updatedDocument = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)

    res.status(200).json({
        message: 'Documento atualizado com sucesso',
        document: updatedDocument
    })
}

const deleteDocument = (req, res) => {
    const { id } = req.params
    
    const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
    
    if (!document) {
        return res.status(404).json({
            message: 'Documento não encontrado'
        })
    }

    db.prepare('DELETE FROM documents WHERE id = ?').run(id)
    
    res.status(200).json({
        message: 'Documento removido com sucesso'
    })
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument
}