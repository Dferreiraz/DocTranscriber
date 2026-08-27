// Dados temporários em memória
let documents = [
    { id: '1', filename: 'holerite.pdf', status: 'completed' },
    { id: '2', filename: 'contrato.pdf', status: 'pending' },
    { id: '3', filename: 'relatorio.pdf', status: 'completed' }
]

const getAllDocuments = (req, res) => {
    res.status(200).json(documents)
}

const getDocumentById = (req, res) => {
    const id = req.params.id
    const document = documents.find(doc => doc.id === id)
    
    if (!document) {
        return res.status(404).json({
            message: 'Documento não encontrado'
        })
    }
    
    res.status(200).json(document)
}

const updateDocument = (req, res) => {
    const id = req.params.id
    const { employee, salary } = req.body
    
    const documentIndex = documents.findIndex(doc => doc.id === id)
    
    if (documentIndex === -1) {
        return res.status(404).json({
            message: 'Documento não encontrado'
        })
    }
    
    documents[documentIndex] = {
        ...documents[documentIndex],
        employee,
        salary
    }
    
    res.status(200).json({
        message: 'Documento atualizado com sucesso'
    })
}

const deleteDocument = (req, res) => {
    const id = req.params.id
    
    const documentIndex = documents.findIndex(doc => doc.id === id)
    
    if (documentIndex === -1) {
        return res.status(404).json({
            message: 'Documento não encontrado'
        })
    }
    
    documents.splice(documentIndex, 1)
    
    res.status(200).json({
        message: 'Documento removido com sucesso'
    })
}

const createDocument = (req, res) => {
    const file = req.file
    
    if (!file) {
        return res.status(400).json({
            message: 'Nenhum arquivo enviado'
        })
    }
    
    const newDocument = {
        id: String(documents.length + 1),
        filename: file.originalname,
        filepath: file.path,
        status: 'pending'
    }
    
    documents.push(newDocument)
    
    res.status(201).json(newDocument)
}

module.exports = {
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
    createDocument
}