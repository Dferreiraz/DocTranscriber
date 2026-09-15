const request = require('supertest')
const app = require('../src/server')

describe('Health Check API', () => {
    it('deve retornar status 200 e objeto de status ok', async () => {
        const response = await request(app).get('/api/health')
        
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ 
            status: 'ok',
            message: 'DocTranscriber API is running'
        })
    })
})