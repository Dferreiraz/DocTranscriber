# DocTranscriber — API REST

Esta documentação detalha todos os endpoints disponíveis na API do DocTranscriber, utilizados para comunicação entre o Frontend (React) e o Backend (Node.js).

## Base URL

```text
/api
```

---

## 🟢 Health Check

### `GET /health`

Verifica se a API e o servidor estão funcionando corretamente.

**Response (200 OK):**

```json
{
  "status": "ok"
}
```

---

## 📄 Documentos

### `GET /documents`

Retorna a lista de documentos com suporte a **paginação** e **filtros**.

**Query Parameters (Opcionais):**

* `page` (Integer): Número da página (padrão: `1`).
* `limit` (Integer): Itens por página (padrão: `10`).
* `status` (String): Filtrar por status (`pending`, `processing`, `completed`, `failed`).

**Response (200 OK):**

```json
{
  "documents": [
    {
      "id": 1,
      "filename": "contrato.pdf",
      "filepath": "uploads/123-contrato.pdf",
      "status": "completed",
      "extracted_data": "Texto extraído do PDF...",
      "created_at": "2026-09-09T12:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalDocuments": 1,
    "limit": 10
  }
}
```

### `POST /documents`

Realiza o upload de um novo documento PDF. O sistema salva o arquivo e inicia a extração de texto automaticamente.

**Request:** `multipart/form-data`

* `file` (File): O arquivo PDF (obrigatório).

**Response (201 Created):**

```json
{
  "id": 2,
  "filename": "fatura.pdf",
  "filepath": "uploads/123-fatura.pdf",
  "status": "completed",
  "extracted_data": "Dados da fatura...",
  "created_at": "2026-09-09T12:05:00.000Z"
}
```

### `GET /documents/export`

Gera e baixa uma planilha Excel (`.xlsx`) contendo todos os documentos e seus dados extraídos.

**Response (200 OK):**

* Retorna o arquivo binário `doctranscriber_export.xlsx` para download direto pelo navegador.

### `GET /documents/:id`

Retorna os detalhes de um documento específico.

**Path Parameters:**

* `id` (Integer): ID do documento.

**Response (200 OK):**

```json
{
  "id": 1,
  "filename": "contrato.pdf",
  "filepath": "uploads/123-contrato.pdf",
  "status": "completed",
  "extracted_data": "Texto extraído...",
  "created_at": "2026-09-09T12:00:00.000Z"
}
```

### `GET /documents/:id/download`

Permite o download do arquivo PDF original armazenado no servidor.

**Path Parameters:**

* `id` (Integer): ID do documento.

**Response (200 OK):**

* Retorna o arquivo PDF binário com o cabeçalho `Content-Disposition` configurado para download.

### `PUT /documents/:id`

Atualiza parcialmente os dados de um documento (geralmente usado para corrigir status ou dados extraídos manualmente).

**Path Parameters:**

* `id` (Integer): ID do documento.

**Request Body (JSON):**

```json
{
  "status": "completed",
  "extracted_data": "Novo texto corrigido..."
}
```

**Response (200 OK):**

```json
{
  "message": "Documento atualizado com sucesso",
  "document": {
    "id": 1,
    "filename": "contrato.pdf",
    "status": "completed",
    "extracted_data": "Novo texto corrigido...",
    "created_at": "2026-09-09T12:00:00.000Z"
  }
}
```

### `DELETE /documents/:id`

Remove um documento do banco de dados.

**Path Parameters:**

* `id` (Integer): ID do documento.

**Response (200 OK):**

```json
{
  "message": "Documento removido com sucesso"
}
```

---

## 📊 Ciclo de Vida (Status)

O campo `status` controla o fluxo de processamento do documento:

1. **`pending`**: O arquivo foi recebido, mas o processamento ainda não iniciou.
2. **`processing`**: O sistema está extraindo o texto do PDF (usando `pdf-parse`).
3. **`completed`**: A extração foi concluída com sucesso e o campo `extracted_data` está populado.
4. **`failed`**: Ocorreu um erro durante a leitura do PDF (ex: arquivo corrompido).
