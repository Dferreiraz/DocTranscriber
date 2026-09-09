# 🚀 DocTranscriber — Roadmap

Este documento acompanha a evolução do projeto, desde o planejamento até o deploy em produção.

---

## Fase 1 — Planejamento e Documentação
- [x] Definir requisitos e escopo do projeto
- [x] Definir arquitetura (Frontend, Backend, Database)
- [x] Definir stack tecnológica (Node, Express, React, Tailwind, SQLite)
- [x] Criar estrutura de pastas do monorepo
- [x] Configurar Git e `.gitignore`
- [x] Criar documentação inicial (Branding, Architecture, API, Database, Decisions)

---

## Fase 2 — Backend Core
- [x] Inicializar projeto Node.js e configurar `package.json`
- [x] Configurar servidor Express com middlewares (JSON, Logger)
- [x] Implementar arquitetura de camadas (Routes, Controllers, Middlewares)
- [x] Configurar middleware de upload de arquivos (`multer`) com validação de tipo e tamanho
- [x] Implementar tratamento global de erros (`errorMiddleware`)

---

## Fase 3 — Banco de Dados e API REST
- [x] Modelagem e criação do banco de dados SQLite (`better-sqlite3`)
- [x] Implementação de `AUTOINCREMENT` e constraints (`NOT NULL`, `DEFAULT`)
- [x] `GET /api/health` (Health Check)
- [x] `POST /api/documents` (Upload e registro inicial)
- [x] `GET /api/documents` (Listagem com paginação e filtro por status)
- [x] `GET /api/documents/:id` (Busca por ID)
- [x] `PUT /api/documents/:id` (Atualização parcial de status e dados)
- [x] `DELETE /api/documents/:id` (Remoção segura)
- [x] `GET /api/documents/:id/download` (Download do arquivo físico)
- [x] `GET /api/documents/export` (Geração e download de planilha XLSX)

---

## Fase 4 — Frontend (React + Vite + Tailwind)
- [x] Inicializar projeto Vite com React
- [x] Configurar Tailwind CSS e variáveis de estilo
- [x] Implementar Header responsivo (Mobile-first)
- [x] Criar componente de Upload com Drag & Drop e validação
- [x] Criar componente de Lista de Documentos (Tabela com paginação visual)
- [x] Implementar Badges de Status coloridos (Pending, Processing, Completed, Failed)
- [x] Criar Modal de visualização para o texto extraído do PDF
- [x] Adicionar botões de ação (Ler, Baixar PDF, Deletar, Exportar Excel)
- [x] Integrar Frontend com Backend via Axios (incluindo proxy no Vite)

---

## Fase 5 — Processamento e Funcionalidades Avançadas
- [x] Integração com `pdf-parse` para extração assíncrona de texto
- [x] Atualização automática de status (`pending` → `processing` → `completed`/`failed`)
- [x] Integração com `exceljs` para exportação de dados estruturados
- [x] Build de produção do Frontend servido estaticamente pelo Express

---

## Fase 6 — Deploy e Produção
- [x] Configurar branch de desenvolvimento (`develop`) e `main`
- [x] Ajustar caminhos relativos para ambiente de produção (`../../`)
- [x] Configurar variável de ambiente `PORT` dinâmica
- [x] Deploy bem-sucedido no Render (Web Service)
- [x] Validação de funcionamento em ambiente real (URL pública)

---

## 📅 Próximos Passos (Backlog)
- [ ] Containerização da aplicação com Docker e Docker Compose
- [ ] Migração do banco de dados de SQLite para PostgreSQL (para persistência real em produção)
- [ ] Implementação de OCR (Tesseract.js) para PDFs baseados em imagem
- [ ] Testes automatizados (Jest/Supertest)
- [ ] Dark Mode

---

## 📌 Status Atual

🚀 **Em Produção** (Versão 1.0.0 com funcionalidades core concluídas)