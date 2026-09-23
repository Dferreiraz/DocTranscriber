# 📄 DocTranscriber

<p align="center">
  <strong>Aplicação Full Stack para upload, processamento e extração de dados de documentos PDF.</strong>
</p>

<p align="center">
  •
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-arquitetura">Arquitetura</a> •
  <a href="#-estrutura-do-projeto">Estrutura</a> •
  <a href="#-como-executar">Como Executar</a> •
  <a href="#-documentação">Documentação</a> •
  <a href="#-autor">Autor</a> •
</p>

---

## 💻 Sobre o projeto

O **DocTranscriber** é uma aplicação web Full Stack desenvolvida para realizar o **upload, gerenciamento, processamento e extração de dados de documentos PDF**.

O projeto foi desenvolvido com foco em colocar em prática conceitos de desenvolvimento **Front-End, Back-End, APIs REST, processamento de arquivos, persistência de dados, arquitetura de aplicações e infraestrutura**.

A aplicação possui uma arquitetura desacoplada, com uma interface desenvolvida em **React** e uma API REST construída com **Node.js e Express**, utilizando **PostgreSQL** para persistência dos dados.

O sistema também conta com suporte a **Docker e Docker Compose**, permitindo executar a aplicação e seus serviços de forma padronizada em diferentes ambientes.

---

## ⚙️ Funcionalidades

* [x] Upload de documentos PDF
* [x] Validação de tipo e tamanho dos arquivos
* [x] Armazenamento dos documentos enviados
* [x] Extração automática de texto dos PDFs
* [x] Preservação de acentuação e caracteres especiais utilizando UTF-8
* [x] Visualização do conteúdo extraído
* [x] Download do PDF original
* [x] Exportação dos dados extraídos para XLSX
* [x] Listagem de documentos
* [x] Busca e filtragem de documentos
* [x] Filtragem por status
* [x] Paginação
* [x] Exclusão de documentos
* [x] Atualização parcial de dados e status
* [x] Comunicação entre Front-End e Back-End através de API REST
* [x] Persistência de dados utilizando PostgreSQL
* [x] Interface responsiva
* [x] Dark Mode
* [x] Containerização com Docker
* [x] Orquestração com Docker Compose

---

## 🎨 Layout

### Aplicação

> Screenshots da aplicação serão adicionados posteriormente.

---

## 🛠️ Tecnologias

### Front-End

* **React** — Biblioteca para construção da interface
* **Vite** — Build tool e ambiente de desenvolvimento
* **Tailwind CSS** — Estilização da interface
* **Axios** — Comunicação HTTP com a API
* **React Router** — Gerenciamento de rotas da aplicação

### Back-End

* **Node.js** — Ambiente de execução JavaScript
* **Express** — Framework para construção da API REST
* **pg** — Cliente PostgreSQL para Node.js
* **Multer** — Upload e gerenciamento de arquivos
* **pdf-parse** — Extração de conteúdo textual de arquivos PDF
* **ExcelJS** — Geração de arquivos XLSX
* **dotenv** — Gerenciamento de variáveis de ambiente

### Banco de Dados

* **PostgreSQL** — Banco de dados relacional principal

Compatível com ambientes PostgreSQL locais e serviços como:

* Neon
* Supabase
* Render PostgreSQL

### Infraestrutura

* **Docker** — Containerização
* **Docker Compose** — Orquestração dos serviços
* **Render** — Deploy da aplicação
* **Git** — Controle de versão
* **GitHub** — Hospedagem do código-fonte

---

## 🏗️ Arquitetura

O DocTranscriber utiliza uma arquitetura desacoplada entre **Front-End, Back-End e Banco de Dados**.

```text
┌──────────────────────────┐
│      Navegador           │
│                          │
│ React + Vite + Tailwind  │
└────────────┬─────────────┘
             │
             │ HTTP / JSON
             │ Multipart
             ▼
┌──────────────────────────┐
│       API REST           │
│                          │
│ Node.js + Express        │
└───────┬───────────┬──────┘
        │           │
        │           │
        ▼           ▼
┌────────────┐  ┌──────────────┐
│   Multer   │  │ PostgreSQL   │
│            │  │              │
│ PDF Upload │  │ Persistência │
└─────┬──────┘  └──────────────┘
      │
      ▼
┌────────────┐
│  /uploads  │
│            │
│ PDF files  │
└────────────┘
```

### Fluxo principal

```text
Usuário
   ↓
Upload do PDF
   ↓
Validação do arquivo
   ↓
Multer
   ↓
Armazenamento do PDF
   ↓
Processamento / Extração de texto
   ↓
Persistência dos dados
   ↓
PostgreSQL
   ↓
API REST
   ↓
Front-End
   ↓
Visualização / Exportação
```

---

## 📁 Estrutura do projeto

```text
DocTranscriber/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── # Lógica das operações e respostas HTTP
│   │   │
│   │   ├── database/
│   │   │   └── # Configuração da conexão com PostgreSQL
│   │   │
│   │   ├── middlewares/
│   │   │   └── # Middlewares da aplicação
│   │   │
│   │   ├── routes/
│   │   │   └── # Definição das rotas da API
│   │   │
│   │   └── server.js
│   │       # Ponto de entrada da API
│   │
│   ├── uploads/
│   │   └── # Arquivos PDF enviados
│   │
│   └── .env
│       # Variáveis de ambiente
│
├── frontend/
│   ├── src/
│   └── # Interface React
│
├── database/
│   └── schema.sql
│       # Estrutura inicial do banco
│
├── docker-compose.yml
│   # Orquestração dos serviços
│
├── Dockerfile
│   # Configuração da imagem Docker
│
└── README.md
```

---

## 🚀 Como executar

### Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) — v18 ou superior recomendado
* [PostgreSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/) — opcional para execução via containers

---

### 1. Clone o repositório

```bash
git clone https://github.com/Dferreiraz/DocTranscriber.git
cd DocTranscriber
```

---

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend/`:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=doctranscriber
```

> **Nota:** a estrutura necessária para a tabela `documents` é criada automaticamente durante a inicialização da aplicação.

---

### 3. Execute o Back-End

Entre na pasta do Back-End e instale as dependências:

```bash
cd backend
npm install
```

Inicie o servidor:

```bash
node src/server.js
```

A API estará disponível em:

```text
http://localhost:3000
```

---

### 4. Execute o Front-End

Abra outro terminal e execute:

```bash
cd frontend
npm install
npm run dev
```

A interface estará disponível em:

```text
http://localhost:5173
```

---

## 🐳 Executando com Docker

O projeto também pode ser executado utilizando **Docker Compose**.

Na raiz do projeto, configure as variáveis de ambiente necessárias e execute:

```bash
docker compose up -d --build
```

Para visualizar os containers:

```bash
docker compose ps
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

Para encerrar a aplicação:

```bash
docker compose down
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

---

## 🔐 Variáveis de ambiente

As credenciais e configurações sensíveis não devem ser versionadas no repositório.

O arquivo `.env` deve ser incluído no `.gitignore`:

```gitignore
.env
```

Em ambientes de produção, as variáveis devem ser configuradas diretamente na plataforma de hospedagem ou no ambiente de execução dos containers.

---

## 📚 Documentação

A documentação técnica do projeto está organizada nos seguintes tópicos:

* **Branding**
* **Roadmap**
* **Architecture**
* **API**
* **Database**
* **Technical Decisions**

Esses documentos apresentam detalhes sobre as decisões técnicas, arquitetura, banco de dados, endpoints e evolução planejada da aplicação.



## 📌 Status

✅ **Concluído**

Funcionalidades relacionadas ao processamento e extração de dados dos documentos, exportação para XLSX e infraestrutura com Docker estão planejadas para as próximas etapas do projeto.

---

## 🦸 Autor

<a href="https://www.linkedin.com/in/davirobertoferreira/">
Davi Ferreira</a>
<br />

[![Gmail Badge](https://img.shields.io/badge/-davi2580vege@gmail.com-c14438?style=flat-square\&logo=Gmail\&logoColor=white\&link=mailto\:davi2580vege@gmail.com)](mailto:davi2580@gmail.com)

---

Feito por **Davi Ferreira** 👋🏽 [Entre em contato!](https://www.linkedin.com/in/davirobertoferreira/)

---
