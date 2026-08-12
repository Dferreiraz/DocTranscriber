# 🗄️ DocTranscriber — Banco de Dados

## Documento

Um documento representa um PDF enviado pelo usuário.

### Campos

- id
- filename
- filepath
- status
- created_at
- updated_at

---

## Dados extraídos

Representam as informações identificadas no documento.

### Campos

- id
- document_id
- field
- value
- confidence

---

## Relacionamento

Um documento pode possuir vários dados extraídos.

```text
Document
    │
    │ 1:N
    ▼
ExtractedData
Exemplo
Document
id: 1
filename: holerite.pdf
status: completed

        ↓

ExtractedData

employee_name = João
salary = 3500
cpf = 12345678900