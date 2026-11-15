# ChinaPulse

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Dashboard que observa como tendências de conteúdo originadas na China se transformam em sinais de oportunidade no e-commerce brasileiro.

## Contexto

Projeto desenvolvido a partir da palestra do Silvio Meira no REC’n’Play 2026 sobre a interseção entre conteúdo, tecnologia e comércio.

## Funcionalidades

- Dashboard com visão consolidada de tendências e oportunidades
- Acompanhamento de produtos com score de oportunidade
- Detalhamento de tendências e sua evolução
- Alertas e página de insights

## Stack

- **Frontend:** React, Vite, Tailwind CSS, Recharts
- **Backend:** Node.js, Express, Mongoose
- **Banco:** MongoDB Atlas

## Rodando localmente

### Pré-requisitos

- Node.js 18+
- Conta no MongoDB Atlas (ou MongoDB local)

### Backend

```bash
cd server
npm install
## Como rodar localmente

### Pré-requisitos
- Node.js instalado
- Instância do MongoDB rodando (local ou Atlas)

### 1. Configurar o Backend
```bash
cd chinapulse/server
npm install
```
### Crie um arquivo .env
```bash
PORT=5000
MONGODB_URI=sua_connection_string
```

### Popular o banco:
```bash
npm run seedSubir o servidor:Bashnpm run devFrontendBashcd client
npm install
npm run dev
```
## Estrutura:
```text
chinapulse/
├── client/                 # React + Vite
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
├── server/                 # Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── config/
│   └── seed/
└── README.md
```

## Observações
Os dados gerados pelo seed são ilustrativos para demonstrar o comportamento da interface e o cruzamento de informações do painel.
