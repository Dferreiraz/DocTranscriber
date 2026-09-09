# 🗄️ DocTranscriber — Banco de Dados

## Visão Geral

O DocTranscriber utiliza o **SQLite** como seu banco de dados relacional, gerenciado através da biblioteca `better-sqlite3` para garantir alta performance em operações síncronas de leitura e escrita.

A arquitetura do banco foi desenhada para ser simples, robusta e fácil de portar, utilizando uma abordagem de tabela única para o MVP, armazenando os dados extraídos diretamente no registro do documento.

---

## Schema (Tabela `documents`)

A tabela principal armazena todos os metadados e o conteúdo processado dos arquivos enviados.

| Coluna | Tipo | Restrições | Descrição |
| :--- | :--- | :--- | :--- |
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Identificador único e sequencial do documento. |
| `filename` | TEXT | NOT NULL | Nome original do arquivo PDF enviado pelo usuário. |
| `filepath` | TEXT | NOT NULL | Caminho relativo onde o arquivo físico está salvo no servidor (ex: `uploads/123-arquivo.pdf`). |
| `status` | TEXT | NOT NULL, DEFAULT 'pending' | Estado atual do processamento do documento. |
| `extracted_data` | TEXT | NULL | Conteúdo de texto extraído do PDF (pode ser texto puro ou uma string JSON). |
| `created_at` | TEXT | NOT NULL | Data e hora de criação do registro (formato ISO 8601). |

---

## Fluxo de Status (`status`)

O campo `status` controla o ciclo de vida do processamento do documento:

1. **`pending`**: O arquivo foi recebido e salvo no disco, mas a extração de texto ainda não começou.
2. **`processing`**: O sistema está lendo o PDF e extraindo o texto (usando `pdf-parse`).
3. **`completed`**: A extração foi concluída com sucesso e o campo `extracted_data` foi populado.
4. **`failed`**: Ocorreu um erro durante a leitura do PDF (ex: arquivo corrompido ou protegido por senha).

---

## Decisões de Modelagem

### 1. Tabela Única vs. Relacionamento 1:N
Em vez de criar uma tabela separada para `ExtractedData` com relacionamento 1:N, optou-se por armazenar o texto extraído diretamente na coluna `extracted_data` da tabela `documents`. 
* **Motivo:** Simplifica as queries, reduz a complexidade do schema e é perfeitamente adequado para o escopo atual, onde um documento gera um único bloco de texto/JSON de saída.

### 2. Uso de `AUTOINCREMENT`
O `id` é gerado automaticamente pelo banco de dados.
* **Motivo:** Garante integridade referencial, evita colisões de IDs e mantém as URLs da API limpas e previsíveis (ex: `/api/documents/1`).

### 3. Armazenamento de Datas
As datas (`created_at`) são armazenadas como `TEXT` no formato ISO 8601 (ex: `2026-09-09T12:00:00.000Z`).
* **Motivo:** O SQLite não possui um tipo de dado `DATETIME` nativo. Armazenar como string ISO garante compatibilidade total com o JavaScript (`new Date().toISOString()`) e facilita a ordenação e formatação no Front-end.