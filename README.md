# ChinaPulse: Inteligência de Mercado Ásia-Brasil

O **ChinaPulse** é uma plataforma de inteligência de mercado focada em identificar tendências emergentes no ecossistema digital asiático (como Douyin, Xiaohongshu e Weibo) e mapear oportunidades comerciais para o mercado brasileiro, antecipando demandas de consumo em nichos como *Skincare Tech*, *Smart Home* e moda viral.

## 🚀 Conceito
A China é atualmente o maior laboratório de conteúdo, tecnologia e comércio do mundo. O ChinaPulse atua como uma ponte, transformando dados brutos de viralidade asiática em insights de arbitragem comercial e oportunidades de dropshipping/importação para empreendedores brasileiros.

## 🛠️ Stack Tecnológica

### Backend
- **Node.js + Express**: Servidor robusto e escalável.
- **MongoDB + Mongoose**: Banco de dados NoSQL para armazenamento de tendências, produtos e alertas.
- **Express-validator**: Garantia de integridade dos dados na entrada.

### Frontend
- **React + Vite**: SPA rápida e moderna.
- **Tailwind CSS**: Estilização focada em um design *Dark Mode* profissional e responsivo.
- **Recharts**: Visualização de dados para acompanhar curvas de viralidade.
- **Lucide React**: Biblioteca de ícones leve e consistente.
- **Axios**: Comunicação eficiente com a API.

---

## 💻 Como Rodar Localmente

### Pré-requisitos
- Node.js (v18+)
- MongoDB Atlas (Cluster configurado)

### 1. Backend
1. Navegue até `chinapulse/server`.
2. Instale as dependências: `npm install`.
3. Configure o arquivo `.env`:
   ```bash
   PORT=5000
   MONGO_URI=mongodb+srv://<seu-usuario>:<sua-senha>@cluster0.mongodb.net/chinapulse
   NODE_ENV=development
   ```
4. Rode o servidor: `npm run dev`.

### 2. Frontend
1. Navegue até `chinapulse/client`.
2. Instale as dependências: `npm install`.
3. Rode o projeto: `npm run dev`.

---

## 🍃 Seed de Dados
Para popular o banco com tendências e produtos iniciais:
1. No diretório `chinapulse/server`, execute:
   ```bash
   node seed/seed.js
   ```

---

## ☁️ Deploy

### Backend (Render)
1. Conecte o repositório ao Render.
2. Defina o comando de build: `npm install`.
3. Defina o comando de start: `npm start`.
4. Adicione as variáveis de ambiente (`MONGO_URI`, `PORT`) no painel do Render.

### Frontend (Vercel)
1. Importe o diretório `chinapulse/client` na Vercel.
2. A configuração do Vite é detectada automaticamente.
3. Configure a variável de ambiente `VITE_API_URL` apontando para a URL do seu backend no Render.

---

## 📂 Estrutura de Pastas

```text
/server
  /src/controllers  # Lógica de negócio
  /src/models       # Schemas do MongoDB
  /src/routes       # Endpoints da API
  /seed             # Script de popularização de dados
/client
  /src/components   # Componentes reutilizáveis
  /src/pages        # Páginas principais
```

---

## 🔮 Melhorias Futuras
- **Autenticação de Usuário**: Implementação de JWT para áreas restritas.
- **Crawler Avançado**: Automação para capturar tendências diretamente das redes sociais.
- **Notificações Push**: Envio de alertas em tempo real (WhatsApp/Telegram).
- **IA Generativa**: Integração com LLMs para resumir e traduzir descrições complexas do chinês para o português.
