# ChinaPulse

Dashboard para monitorar a presença e a influência de marcas e conteúdos de origem chinesa no e-commerce brasileiro.

## Contexto
O projeto nasceu a partir da palestra do Silvio Meira no REC’n’Play 2026, discutindo a interseção entre produção de conteúdo, tecnologia e comércio global.

## O que ele faz
- Monitoramento de tendências de produtos importados no mercado brasileiro
- Visualização de métricas e alertas sobre movimentações de preços e estoque
- Painel consolidado com dados de produtos e interações

## Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Frontend:** React, Vite, Tailwind CSS

## Como rodar localmente

### Pré-requisitos
- Node.js instalado
- Instância do MongoDB rodando (local ou Atlas)

### 1. Configurar o Backend
```bash
cd chinapulse/server
npm install
```
Crie um arquivo `.env` na pasta `chinapulse/server` com:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chinapulse
```

### 2. Popular o banco com dados iniciais (Seed)
```bash
npm run seed
```
*(ou execute o script de seed diretamente na pasta do servidor)*

### 3. Iniciar o Servidor
```bash
npm run dev
```

### 4. Configurar e rodar o Frontend
Em outro terminal:
```bash
cd chinapulse/client
npm install
npm run dev
```

## Deploy
- **Backend:** Pode ser hospedado em plataformas como Render ou Railway conectando à pasta `chinapulse/server`.
- **Frontend:** Pode ser publicado na Vercel ou Netlify apontando para a pasta `chinapulse/client`.

## Estrutura do projeto

```text
ChinaPulse/
├── chinapulse/
│   ├── client/          # Aplicação Frontend (React + Vite + Tailwind)
│   │   └── src/
│   └── server/          # API Backend (Express + MongoDB)
│       ├── src/
│       │   ├── controllers/
│       │   ├── models/
│       │   └── routes/
│       └── seed/        # Scripts de população de dados
└── README.md
```

## Observações
Os dados gerados pelo seed são ilustrativos para demonstrar o comportamento da interface e o cruzamento de informações do painel.
