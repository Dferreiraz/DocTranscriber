const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'documents.db')
const db = new Database(dbPath)

db.pragma('encoding = "UTF-8"')

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