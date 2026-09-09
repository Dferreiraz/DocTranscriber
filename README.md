# 🚧 DocTranscriber - Em construção 🚧

<p align="center">
 •
 <a href="#-descrição-do-entregável">Descrição do Entregável</a> •
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-arquitetura">Arquitetura</a> •
 <a href="#-documentação">Documentação</a> •
 <a href="#-autor">Autor</a> •
</p>

---

## 📄 Descrição do entregável

O **DocTranscriber** é uma aplicação web desenvolvida para realizar o upload, gerenciamento e processamento de documentos PDF, com o objetivo de transformar seu conteúdo em dados estruturados.

A aplicação está sendo desenvolvida como um projeto Full Stack, integrando uma interface construída com React a uma API REST desenvolvida em Node.js e Express.

---

## 💻 Sobre o projeto

O DocTranscriber foi desenvolvido com o objetivo de praticar conceitos de desenvolvimento Full Stack e trabalhar com um fluxo completo de gerenciamento e processamento de documentos.

O projeto envolve desde o upload e gerenciamento dos arquivos pelo usuário até a persistência dos dados e, futuramente, a extração e transformação do conteúdo dos documentos em informações estruturadas.

Além do desenvolvimento da aplicação, o projeto também é utilizado para aprofundar conhecimentos relacionados à construção de APIs REST, manipulação de arquivos, banco de dados relacionais, arquitetura de aplicações e infraestrutura.

### 🌎 Deploy

https://doctranscriber.onrender.com/

---

## ⚙️ Funcionalidades

* [x] Upload de documentos PDF com validação de tipo e tamanho
* [x] Processamento e extração automática de texto do PDF
* [x] Visualização do conteúdo transcrito em modal
* [x] Download do PDF original
* [x] Exportação de dados estruturados para XLSX (Excel)
* [x] Listagem, busca e exclusão de documentos
* [x] Atualização parcial de status e dados extraídos
* [x] Comunicação entre Front-End e Back-End através de API REST
* [x] Persistência de dados real com banco de dados relacional (SQLite)
* [x] Interface responsiva e moderna com Tailwind CSS
* [ ] Containerização e orquestração com Docker (Em breve)

---

## 🎨 Layout

### Aplicação

> Em breve serão adicionadas imagens e screenshots da aplicação.

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (v18+ recomendado)

### Executando localmente

1. Clone o repositório:

```bash
git clone https://github.com/Dferreiraz/DocTranscriber.git
cd DocTranscriber
```

2. **Configurando o Back-End:**

```bash
cd backend
npm install
node src/server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

3. **Configurando o Front-End em outro terminal:**

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

## 🛠 Tecnologias

As seguintes tecnologias foram utilizadas na construção do projeto:

### Front-End

* **React** — Biblioteca para construção da interface
* **Vite** — Build tool e servidor de desenvolvimento
* **Tailwind CSS** — Estilização da interface
* **Axios** — Cliente HTTP para comunicação com a API

### Back-End

* **Node.js** — Ambiente de execução
* **Express** — Framework para construção da API
* **Multer** — Middleware para upload e gerenciamento de arquivos

### Banco de Dados

* **SQLite** — Banco de dados relacional
* **better-sqlite3** — Biblioteca para integração com SQLite

### Infraestrutura e Deploy

* **Render** — Hospedagem da aplicação em produção
* **Git** — Sistema de controle de versão
* **GitHub** — Hospedagem do repositório e versionamento do projeto

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura desacoplada, onde o Back-End atua como uma API REST e também pode servir os arquivos estáticos do Front-End em produção.

```text
[ Navegador do Usuário ]
          ↓
[ Front-End: React + Vite + Tailwind ]
          ↓
      HTTP / JSON
      Multipart
          ↓
[ Back-End: Node.js + Express ]
          ├──→ [ Multer ]
          │       ↓
          │   /uploads
          │
          └──→ [ better-sqlite3 ]
                  ↓
              [ SQLite ]
```

O fluxo principal da aplicação consiste em:

```text
Usuário
   ↓
Upload do PDF
   ↓
Validação do arquivo
   ↓
Multer
   ↓
Armazenamento do arquivo
   ↓
Persistência dos metadados
   ↓
SQLite
   ↓
API REST
   ↓
Front-End
```

O processamento e a extração do conteúdo dos PDFs serão incorporados posteriormente ao fluxo da aplicação.

---

## 📚 Documentação

A documentação técnica do projeto está organizada nos seguintes tópicos:

* **Branding**
* **Roadmap**
* **Architecture**
* **API**
* **Database**
* **Technical Decisions**

---

## 📌 Status

🚧 **Em desenvolvimento**

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
