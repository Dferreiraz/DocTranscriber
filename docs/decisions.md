# 🧠 DocTranscriber — Decisões Técnicas (ADR)

Este documento registra as decisões de arquitetura e tecnologia tomadas durante o desenvolvimento do projeto.

---

## ADR-001 — Backend

### Decisão
Utilizar Node.js com o framework Express.

### Motivo
O objetivo do projeto é dominar o desenvolvimento backend utilizando JavaScript/TypeScript. O Express é o padrão da indústria, leve e flexível para construção de APIs REST.

### Data
12/08/2026

---

## ADR-002 — Frontend

### Decisão
Utilizar React com Vite e Tailwind CSS.

### Motivo
React permite a criação de interfaces reativas e componentizadas. O Vite oferece uma experiência de desenvolvimento (DX) extremamente rápida. O Tailwind CSS foi escolhido para garantir responsividade, consistência visual e agilidade, eliminando a necessidade de arquivos CSS externos complexos.

### Data
08/09/2026

---

## ADR-003 — API

### Decisão
Utilizar arquitetura RESTful.

### Motivo
Permite uma separação clara de responsabilidades entre frontend e backend, facilitando a manutenção, a escalabilidade e a padronização das comunicações via HTTP (métodos GET, POST, PUT, DELETE).

### Data
12/08/2026

---

## ADR-004 — Banco de Dados

### Decisão
Utilizar SQLite com a biblioteca `better-sqlite3`.

### Motivo
Para um MVP e projeto de portfólio, o SQLite oferece zero configuração de servidor, alta performance em operações de leitura/escrita síncrona e facilidade extrema de deploy. O `better-sqlite3` foi escolhido sobre o `sqlite3` tradicional por ser significativamente mais rápido e ter uma API mais moderna e segura contra SQL Injection.

### Data
31/08/2026

---

## ADR-005 — Processamento de PDF

### Decisão
Utilizar a biblioteca `pdf-parse` no backend.

### Motivo
Permite extrair texto de arquivos PDF de forma assíncrona e eficiente diretamente no ambiente Node.js, sem a necessidade de depender de serviços externos de OCR ou binários pesados do sistema operacional. O texto extraído é salvo diretamente na coluna `extracted_data` do banco.

### Data
08/09/2026

---

## ADR-006 — Exportação de Dados

### Decisão
Utilizar a biblioteca `exceljs` para gerar arquivos no formato `.xlsx`.

### Motivo
É um formato amplamente utilizado no mundo corporativo para dados tabulares. O `exceljs` permite a criação de planilhas formatadas e estruturadas diretamente a partir dos dados do banco, oferecendo uma experiência de download profissional ao usuário.

### Data
09/09/2026

---

## ADR-007 — Deploy e Infraestrutura

### Decisão
Utilizar o Render como plataforma de hospedagem (Web Service).

### Motivo
O Render permite hospedar aplicações Node.js gratuitamente, suporta comandos de build personalizados (necessários para compilar o frontend com Vite antes de iniciar o servidor) e serve os arquivos estáticos do frontend diretamente através do backend, simplificando a arquitetura para um único serviço.

### Data
08/09/2026