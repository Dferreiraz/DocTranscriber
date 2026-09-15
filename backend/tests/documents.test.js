const request = require('supertest')
const app = require('../src/server')

describe('Documents API', () => {
    let createdDocumentId

    // Buffer com um conteúdo mínimo de PDF válido para os testes
    const mockPdfBuffer = Buffer.from(
        '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [] /Count 0 >>\nendobj\nxref\n0 3\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \ntrailer\n<< /Size 3 /Root 1 0 R >>\nstartxref\n115\n%%EOF'
    )

    it('deve retornar lista de documentos com paginação', async () => {
        const response = await request(app).get('/api/documents')
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('documents')
        expect(response.body).toHaveProperty('pagination')
        expect(Array.isArray(response.body.documents)).toBe(true)
    })

    it('deve fazer upload de um PDF com sucesso', async () => {
        const response = await request(app)
            .post('/api/documents')
            .attach('file', mockPdfBuffer, {
                filename: 'test-document.pdf',
                contentType: 'application/pdf'
            })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.filename).toBe('test-document.pdf')
        // O status pode ser 'completed' ou 'failed' dependendo se o pdf-parse consegue ler o buffer mínimo
        expect(['completed', 'failed', 'processing']).toContain(response.body.status)
        
        createdDocumentId = response.body.id
    })

    it('deve rejeitar upload de arquivo que não é PDF', async () => {
        const response = await request(app)
            .post('/api/documents')
            .attach('file', Buffer.from('texto comum'), {
                filename: 'test.txt',
                contentType: 'text/plain'
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message', 'Apenas arquivos PDF são permitidos!')
    })

    it('deve deletar um documento existente', async () => {
        const response = await request(app).delete(`/api/documents/${createdDocumentId}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', 'Documento removido com sucesso')
    })
})