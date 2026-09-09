const db = require('../database/db')
const path = require('path')

const getAllDocuments = (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const status = req.query.status
        const offset = (page - 1) * limit

        let query = 'SELECT * FROM documents'
        let countQuery = 'SELECT COUNT(*) as total FROM documents'
        const params = []

        if (status) {
            query += ' WHERE status = ?'
            countQuery += ' WHERE status = ?'
            params.push(status)
        }

        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?'
        params.push(limit, offset)

        const documents = db.prepare(query).all(...params)
        const total = db.prepare(countQuery).get(...(status ? [status] : [])).total
        const totalPages = Math.ceil(total / limit)

        res.status(200).json({
            documents,
            pagination: {
                currentPage: page,
                totalPages,
                totalDocuments: total,
                limit
            }
        })
    } catch (error) {
        next(error)
    }
}

const getDocumentById = (req, res, next) => {
    try {
        const { id } = req.params
        const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        
        if (!document) {
            return res.status(404).json({ message: 'Documento não encontrado' })
        }
        
        res.status(200).json(document)
    } catch (error) {
        next(error)
    }
}

const getDocumentDownload = (req, res, next) => {
    try {
        const { id } = req.params
        const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        
        if (!document) {
            return res.status(404).json({ message: 'Documento não encontrado' })
        }
        
        const filePath = path.join(__dirname, '..', '..', document.filepath)
        res.download(filePath, document.filename)
    } catch (error) {
        next(error)
    }
}

const createDocument = (req, res, next) => {
    try {
        const file = req.file
        if (!file) {
            return res.status(400).json({ message: 'Nenhum arquivo enviado' })
        }
        
        const result = db.prepare(`
            INSERT INTO documents (filename, filepath, status, extracted_data, created_at)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            file.originalname,
            file.path.replace(/\\/g, '/'),
            'pending',
            null,
            new Date().toISOString()
        )
        
        const newDocument = db.prepare('SELECT * FROM documents WHERE id = ?').get(result.lastInsertRowid)
        res.status(201).json(newDocument)
    } catch (error) {
        next(error)
    }
}

const updateDocument = (req, res, next) => {
    try {
        const { id } = req.params
        const { status, extracted_data } = req.body
        const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        
        if (!document) {
            return res.status(404).json({ message: 'Documento não encontrado' })
        }
        
        const newStatus = status !== undefined ? status : document.status
        const newExtractedData = extracted_data !== undefined ? extracted_data : document.extracted_data
        
        db.prepare(`
            UPDATE documents
            SET status = ?, extracted_data = ?
            WHERE id = ?
        `).run(newStatus, newExtractedData, id)
        
        const updatedDocument = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        res.status(200).json({ message: 'Documento atualizado com sucesso', document: updatedDocument })
    } catch (error) {
        next(error)
    }
}

const deleteDocument = (req, res, next) => {
    try {
        const { id } = req.params
        const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        
        if (!document) {
            return res.status(404).json({ message: 'Documento não encontrado' })
        }
        
        db.prepare('DELETE FROM documents WHERE id = ?').run(id)
        res.status(200).json({ message: 'Documento removido com sucesso' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    getDocumentDownload,
    createDocument,
    updateDocument,
    deleteDocument
}