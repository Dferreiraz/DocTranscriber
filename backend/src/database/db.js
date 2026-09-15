const { Pool } = require('pg')
const path = require('path')
const fs = require('fs')

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'senha_super_secreta_123',
    database: process.env.DB_NAME || 'doctranscriber',
})

const initDb = async () => {
    try {
        const schemaPath = path.join(__dirname, '../../../database/schema.sql')
        
        if (!fs.existsSync(schemaPath)) {
            throw new Error(`Arquivo schema.sql não encontrado em: ${schemaPath}`)
        }

        const schemaSql = fs.readFileSync(schemaPath, 'utf8')
        await pool.query(schemaSql)
        console.log('Banco de dados PostgreSQL conectado e tabelas prontas!')
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error)
        process.exit(1)
    }
}

module.exports = {
    pool,
    initDb
}