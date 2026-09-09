# 🏗️ DocTranscriber — Arquitetura

## Visão Geral

O DocTranscriber adota uma arquitetura **Monorepo** com deploy unificado. Embora o Frontend e o Backend sejam desenvolvidos de forma desacoplada, com tecnologias e pastas separadas, em produção eles são compilados e servidos por um único processo Node.js.

Isso simplifica a infraestrutura, reduz os custos de hospedagem e elimina problemas de CORS (Cross-Origin Resource Sharing).

---

## Fluxo de Dados (Data Flow)

```text
[ Navegador do Usuário ]
        │
        ▼ (HTTP / Static Assets)
[ Frontend: React + Vite + Tailwind ] (Servido como arquivos estáticos)
        │
        ▼ (Requisições AJAX via Axios para /api/*)
[ Backend: Node.js + Express ]
        ├── [ Middlewares ] (Logger, CORS, Tratamento de Erros)
        ├── [ Multer ] (Intercepta uploads, valida e salva em /uploads)
        ├── [ Controllers ] (Orquestram a lógica e chamam o banco)
        └── [ Database: SQLite ] (Persiste metadados via better-sqlite3)
```

---

## Estrutura de Pastas (Monorepo)

```text
DocTranscriber/
│
├── backend/                  # Lógica do servidor e API
│   ├── src/
│   │   ├── controllers/      # Lógica de negócio e manipulação de requisições
│   │   ├── database/         # Configuração e inicialização do SQLite
│   │   ├── middlewares/      # Logger, Upload (Multer), Tratamento de Erros
│   │   ├── routes/           # Definição dos endpoints da API
│   │   └── server.js         # Ponto de entrada do Express
│   ├── uploads/              # Armazenamento físico dos arquivos PDF
│   └── package.json
│
├── frontend/                 # Interface de usuário (React)
│   ├── public/               # Assets estáticos (ex: favicon.svg)
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis (Header, Tables, Modals)
│   │   ├── App.jsx           # Componente raiz e orquestrador de estado
│   │   └── main.jsx          # Ponto de entrada do React
│   ├── index.html
│   └── package.json
│
├── docs/                     # Documentação técnica do projeto
└── README.md
```

---

## Detalhamento das Camadas

### 1. Frontend (Cliente)

Responsável pela experiência do usuário (UX), validações visuais e requisições assíncronas.

* **Tecnologias:** React (UI), Vite (Build Tool), Tailwind CSS (Estilização) e Axios (HTTP Client).
* **Padrão:** Componentes funcionais com Hooks (`useState`, `useEffect`) para gerenciamento de estado local e ciclo de vida.

### 2. Backend (Servidor)

Responsável por expor a API REST, processar arquivos e gerenciar o banco de dados.

* **Tecnologias:** Node.js, Express, Multer, `pdf-parse` e `exceljs`.
* **Padrão:** Arquitetura simplificada de 3 camadas (Routes → Controllers → Database).

  * *Nota: Camadas intermediárias, como Services e Repositories, foram omitidas intencionalmente para manter o código enxuto e direto, já que a complexidade do MVP não exige essa abstração.*

### 3. Middlewares

Peças fundamentais que interceptam requisições antes de chegarem aos controllers:

* **`loggerMiddleware`:** Registra data, hora, método e URL de todas as requisições.
* **`uploadMiddleware`:** Configura o Multer para salvar arquivos na pasta `uploads/` com nomes únicos e valida o tipo (apenas PDF) e o tamanho.
* **`errorMiddleware`:** Centraliza o tratamento de erros, evitando que o servidor caia e retornando respostas JSON padronizadas.

### 4. Banco de Dados

* **Tecnologia:** SQLite (via `better-sqlite3`).
* **Estratégia:** Tabela única (`documents`) com `AUTOINCREMENT`. O texto extraído é armazenado diretamente na coluna `extracted_data` para otimizar as leituras.

---

## Estratégia de Deploy (Produção)

Para rodar a aplicação no Render (ou em qualquer servidor Node), utilizamos a seguinte estratégia de build e serve:

1. **Build do Frontend:** O Vite compila o React e gera arquivos estáticos otimizados (HTML, CSS e JS) na pasta `frontend/dist`.
2. **Serve Estático:** O Express é configurado com `express.static` para servir a pasta `dist` e a pasta `uploads`.
3. **Fallback SPA:** Uma rota coringa (`/*splat`) garante que qualquer requisição que não seja da API (`/api/*`) retorne o `index.html`, permitindo que o React gerencie as rotas internas.
