# 🏗️ DocTranscriber — Arquitetura

## Visão geral

O DocTranscriber será dividido em três partes principais:

Frontend
Backend
Banco de Dados

## Fluxo


React
  │
  │ HTTP
  ▼
Express / Node.js
  │
  ├── Controllers
  │
  ├── Services
  │
  ├── Middlewares
  │
  └── Repositories
        │
        ▼
     Database

     Frontend

Responsável por:

Interface
Upload
Exibição dos documentos
Exibição dos dados
Edição
Download

Tecnologia:

React

Backend

Responsável por:

API
Upload
Processamento
Validação
Regras de negócio
Banco de dados
Geração de arquivos

Tecnologias:

Node.js
Express
Banco de dados

Responsável pela persistência dos:

documentos
status
dados extraídos
alterações realizadas
Comunicação

Frontend e backend se comunicam através de HTTP utilizando uma API REST.

Exemplo:

POST /api/documents
GET /api/documents/:id
PUT /api/documents/:id
Organização do Backend
backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── repositories/
│   ├── utils/
│   ├── config/
│   └── server.js
│
└── package.json
Princípio

Cada camada deve possuir uma responsabilidade específica.

Routes:
Define os endpoints.

Controllers:
Recebem as requisições.

Services:
Contêm as regras de negócio.

Repositories:
Interagem com o banco.

Middlewares:
Executam processos intermediários.

Utils:
Funções auxiliares.







