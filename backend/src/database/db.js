const { Pool } = require('pg')
const path = require('path')
const fs = require('fs')

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
})

const initDb = async () => {
    try {
        const schemaPath = path.join(__dirname, '../../../database/schema.sql')
        
        if (!fs.existsSync(schemaPath)) {
            throw new Error(`Arquivo schema.sql não encontrado em: ${schemaPath}`)
        }

        const schemaSql = fs.readFileSync(schemaPath, 'utf8')
        await pool.query(schemaSql)
        console.log('Banco de dados PostgreSQL (Neon) conectado e tabelas prontas!')
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error)
        process.exit(1)
    }
}

module.exports = {
    pool,
    initDb
}