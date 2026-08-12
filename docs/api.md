Aqui você vai aprender a **pensar como desenvolvedor de API** antes de escrever as rotas.

```md
# 🔌 DocTranscriber — API

## Base URL

```text
/api
Health Check
GET /health

Verifica se a API está funcionando.

Response
{
  "status": "ok"
}
Documentos
POST /documents

Realiza o upload de um documento PDF.

Request
multipart/form-data

Campo:

file
Response
{
  "id": "123",
  "status": "pending",
  "filename": "documento.pdf"
}
GET /documents

Retorna todos os documentos.

Response
[
  {
    "id": "123",
    "filename": "documento.pdf",
    "status": "completed"
  }
]
GET /documents/:id

Retorna um documento específico.

Response
{
  "id": "123",
  "filename": "documento.pdf",
  "status": "completed"
}
PUT /documents/:id

Atualiza os dados extraídos.

Request
{
  "employee": "João da Silva",
  "salary": 3500
}
Response
{
  "message": "Documento atualizado com sucesso"
}
DELETE /documents/:id

Remove um documento.

Response
{
  "message": "Documento removido com sucesso"
}
📊 Status

Os documentos podem possuir os seguintes estados:

pending
processing
completed
failed
