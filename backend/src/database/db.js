const Database = require('better-sqlite3')
const db = new Database('src/database/documents.db')

db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT NOT NULL,
        filepath TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        extracted_data TEXT,
        created_at TEXT NOT NULL
    )    
`)

    console.log('Banco de dados conectado e tabela pronta!')

module.exports = db