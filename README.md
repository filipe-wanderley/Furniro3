# Furniro

Aplicação full stack de uma loja de móveis e decoração, desenvolvida como parte do programa de bolsas da Compass UOL.

O projeto utiliza React no frontend, uma API Express no backend e MongoDB como banco de dados. A aplicação possui catálogo de produtos, carrinho persistente, autenticação JWT, checkout com consulta de CEP e páginas responsivas baseadas no layout do Figma.

## Funcionalidades

- Home com Hero, categorias, produtos, seção de inspiração e mosaico animado
- Shop com filtro por categoria, ordenação, paginação e quantidade de itens por página
- Página individual de produto por slug
- Seleção de tamanho, cor e quantidade do produto
- Carrinho persistido no `localStorage` com Zustand
- Carrinho lateral com subtotal, remoção e navegação para Cart e Checkout
- Cadastro e login de usuários
- Autenticação JWT validada pelo backend
- Persistência da sessão no navegador
- Logout pelo Header
- Retorno automático à rota protegida após o login
- Checkout protegido com React Hook Form e Zod
- Preenchimento de endereço pelo ViaCEP
- Seleção obrigatória do método de pagamento
- Finalização do pedido com Toast, limpeza do carrinho e retorno à Home
- Página Contact protegida com validação e feedback por Toast
- Newsletter com validação de e-mail
- Layout responsivo para mobile, tablet, desktop e telas ultrawide

## Páginas

| Rota | Descrição | Acesso |
|---|---|---|
| `/` | Página inicial | Público |
| `/shop/:category?` | Listagem e filtros de produtos | Público |
| `/product/:slug` | Detalhes de um produto | Público |
| `/cart` | Carrinho de compras | Público |
| `/login` | Login | Público |
| `/signup` | Cadastro | Público |
| `/checkout` | Checkout e pagamento | Autenticado |
| `/contact` | Formulário de contato | Autenticado |

Login e cadastro utilizam um layout próprio, sem Header e Footer. As páginas da loja utilizam o `StoreLayout`, que compartilha Header, Footer e Cart Drawer.

## Tecnologias

### Frontend

| Tecnologia | Versão |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| Tailwind CSS | 4 |
| React Router DOM | 7 |
| Zustand | 5 |
| React Hook Form | 7 |
| Zod | 4 |
| Axios | 1 |
| React Hot Toast | 2 |
| Lucide React | 1 |
| React Icons | 5 |

### Backend

| Tecnologia | Versão |
|---|---|
| Node.js | 22 no Docker |
| Express | 5 |
| TypeScript | 7 |
| Prisma ORM | 5 |
| MongoDB | 8 |
| JSON Web Token | 9 |
| bcryptjs | 3 |
| Winston | 3 |

## Estrutura

```text
Furniro3/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── controllers/
│       ├── db/seed/
│       ├── middlewares/
│       ├── repositories/
│       ├── routes/
│       ├── services/
│       ├── utils/
│       ├── app.ts
│       └── server.ts
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── interface/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── schemas/
│       ├── services/
│       ├── utils/
│       ├── App.tsx
│       └── main.tsx
└── docker-compose.yml
```

## Arquitetura

O frontend consome uma API REST com Axios ou `fetch`:

```text
React
  ↓
Express API
  ↓
Service
  ↓
Repository
  ↓
Prisma
  ↓
MongoDB
```

Produtos e usuários utilizam o MongoDB como fonte única de dados. As senhas são armazenadas apenas como hash do bcrypt e nunca são devolvidas pela API.

## Autenticação

O cadastro cria um usuário com e-mail único e senha criptografada. O login retorna um token JWT e os dados públicos do usuário.

O token é persistido pelo Zustand e enviado no cabeçalho das requisições autenticadas:

```http
Authorization: Bearer <token>
```

O endpoint `/auth/me` valida o token no backend. As rotas `/checkout` e `/contact` utilizam `ProtectedRoute`; usuários deslogados são enviados ao Login e retornam à página solicitada depois da autenticação.

## Carrinho e checkout

O carrinho é armazenado no Zustand com persistência no `localStorage`. O identificador de cada item considera produto, cor e tamanho, permitindo variações diferentes do mesmo produto.

O mesmo cálculo de preços é utilizado por:

- Cart Drawer
- Página Cart
- Resumo do Checkout

No Checkout:

- Nome, sobrenome, CEP, país, endereço, cidade, UF, e-mail e pagamento são obrigatórios
- Empresa, complemento e informações adicionais são opcionais
- O ViaCEP preenche país, logradouro, cidade e UF
- Direct Bank Transfer e Cash On Delivery são opções exclusivas
- A descrição acompanha visualmente a opção selecionada
- Um envio válido mostra o Toast, limpa o carrinho e retorna à Home

O fluxo atual não persiste pedidos no backend.

## API

A API fica disponível em `http://localhost:3000` por padrão.

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/products` | Lista produtos com filtros e paginação |
| `GET` | `/products/:slug` | Busca produto pelo slug |
| `GET` | `/products/id/:id` | Busca produto pelo ObjectId |

Parâmetros disponíveis em `GET /products`:

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `category` | string | Filtra por categoria |
| `page` | number | Página atual, padrão `1` |
| `limit` | number | Itens por página, padrão `16` |
| `sort` | string | `price_asc` ou `price_desc` |

Exemplo de resposta:

```json
{
  "products": [],
  "total": 30,
  "page": 1,
  "limit": 16,
  "totalPages": 2
}
```

### Autenticação

| Método | Rota | Descrição | Autenticação |
|---|---|---|---|
| `POST` | `/auth/register` | Cadastra um usuário | Não |
| `POST` | `/auth/login` | Autentica e retorna o JWT | Não |
| `GET` | `/auth/me` | Retorna o usuário autenticado | Bearer Token |

Corpo de cadastro e login:

```json
{
  "email": "usuario@exemplo.com",
  "password": "senha-segura"
}
```

## Como executar

### Pré-requisitos

- Git
- Docker Desktop com Docker Compose

### Com Docker

```bash
git clone https://github.com/filipe-wanderley/Furniro3.git
cd Furniro3
docker compose up -d --build
```

Para popular o banco na primeira execução:

```bash
docker compose exec backend npx tsx src/db/seed/seed.ts
```

Endereços locais:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- MongoDB: `localhost:27017`

Para acompanhar os logs:

```bash
docker compose logs -f
```

Para encerrar os serviços:

```bash
docker compose down
```

O volume `mongo_data` mantém os dados entre reinicializações. Para remover também os dados persistidos, use `docker compose down -v` somente quando essa limpeza for realmente desejada.

### Execução local sem Docker

É necessário ter uma instância MongoDB com Replica Set disponível.

Backend:

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Frontend, em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

## Variáveis de ambiente

### Backend

Crie `backend/.env` usando `backend/.env.example` como referência:

```env
DATABASE_URL="mongodb://localhost:27017/furniro?replicaSet=rs0"
PORT=3000
JWT_SECRET="substitua-por-um-segredo-longo-e-aleatorio"
JWT_EXPIRES_IN="1d"
```

Em produção, utilize um `JWT_SECRET` exclusivo e não o envie ao repositório.

### Frontend

Crie `frontend/.env` quando a API não estiver no endereço padrão:

```env
VITE_API_URL=http://localhost:3000
```

## Scripts

### Frontend

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o Vite em desenvolvimento |
| `npm run build` | Verifica TypeScript e gera o build |
| `npm run lint` | Executa o ESLint |
| `npm run preview` | Visualiza o build localmente |

### Backend

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia Express com hot reload |
| `npm run build` | Compila o TypeScript |
| `npm start` | Executa o backend compilado |

## Responsividade

O layout foi ajustado para os seguintes grupos de tela:

- Mobile a partir de 320 px
- Mobile amplo em 375 px
- Tablet em 768 px
- Notebook em 1024 px
- Desktop de referência em 1440 px
- Telas ultrawide

O Header ocupa toda a largura da viewport, mantendo seu conteúdo centralizado. Grids, filtros, galeria de produto, Drawer, formulários e páginas de autenticação mudam de composição conforme o espaço disponível.

## Qualidade

Antes de enviar alterações, execute:

```bash
cd frontend
npm run build
npm run lint

cd ../backend
npm run build
```

## Autor

Filipe Wanderley — [GitHub](https://github.com/filipe-wanderley)
