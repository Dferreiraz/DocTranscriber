CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    filename TEXT NOT NULL,
    filepath TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    extracted_data TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
)