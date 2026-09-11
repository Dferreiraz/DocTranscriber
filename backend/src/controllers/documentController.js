const db = require('../database/db')
const path = require('path')
const fs = require('fs')
const ExcelJS = require('exceljs')
const { PDFParse } = require('pdf-parse')

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
            pagination: { currentPage: page, totalPages, totalDocuments: total, limit }
        })
    } catch (error) { next(error) }
}

const getDocumentById = (req, res, next) => {
    try {
        const { id } = req.params
        const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        if (!document) return res.status(404).json({ message: 'Documento não encontrado' })
        res.status(200).json(document)
    } catch (error) { next(error) }
}

const getDocumentDownload = (req, res, next) => {
    try {
        const { id } = req.params
        const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        if (!document) return res.status(404).json({ message: 'Documento não encontrado' })

        const filePath = path.join(__dirname, '..', '..', document.filepath)
        res.download(filePath, document.filename)
    } catch (error) { next(error) }
}

const createDocument = async (req, res, next) => {
    try {
        const file = req.file
        if (!file) return res.status(400).json({ message: 'Nenhum arquivo enviado' })

        const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')

        const result = db.prepare(`
            INSERT INTO documents (filename, filepath, status, extracted_data, created_at)
            VALUES (?, ?, ?, ?, ?)
        `).run(
            originalname,
            file.path.replace(/\\/g, '/'),
            'processing',
            null,
            new Date().toISOString()
        )

        let extractedText = null
        let finalStatus = 'completed'

        try {
            const fileBuffer = fs.readFileSync(file.path)

            const parser = new PDFParse({ data: fileBuffer })
            const pdfData = await parser.getText()

            extractedText = pdfData.text.trim() || 'Nenhum texto extraído (PDF pode ser apenas imagens).'

            await parser.destroy()
        } catch (pdfError) {
            console.error('Erro ao ler PDF:', pdfError)
            finalStatus = 'failed'
            extractedText = 'Erro ao processar o PDF.'
        }

        db.prepare(`
            UPDATE documents SET status = ?, extracted_data = ? WHERE id = ?
        `).run(finalStatus, extractedText, result.lastInsertRowid)

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
        if (!document) return res.status(404).json({ message: 'Documento não encontrado' })

        const newStatus = status !== undefined ? status : document.status
        const newExtractedData = extracted_data !== undefined ? extracted_data : document.extracted_data

        db.prepare(`UPDATE documents SET status = ?, extracted_data = ? WHERE id = ?`)
            .run(newStatus, newExtractedData, id)

        const updatedDocument = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        res.status(200).json({ message: 'Documento atualizado com sucesso', document: updatedDocument })
    } catch (error) { next(error) }
}

const deleteDocument = (req, res, next) => {
    try {
        const { id } = req.params
        const document = db.prepare('SELECT * FROM documents WHERE id = ?').get(id)
        if (!document) return res.status(404).json({ message: 'Documento não encontrado' })

        db.prepare('DELETE FROM documents WHERE id = ?').run(id)
        res.status(200).json({ message: 'Documento removido com sucesso' })
    } catch (error) { next(error) }
}

const exportDocuments = async (req, res, next) => {
    try {
        const documents = db.prepare('SELECT * FROM documents ORDER BY created_at DESC').all()

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Documentos')

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 5 },
            { header: 'Nome do Arquivo', key: 'filename', width: 30 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Data de Criação', key: 'created_at', width: 25 },
            { header: 'Dados Extraídos', key: 'extracted_data', width: 60 }
        ]

        worksheet.addRows(documents)

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=doctranscriber_export.xlsx'
        )

        await workbook.xlsx.write(res)
        res.end()
    } catch (error) { next(error) }
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    getDocumentDownload,
    createDocument,
    updateDocument,
    deleteDocument,
    exportDocuments
}