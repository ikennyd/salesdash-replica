# 🚀 SalesDash Replica - Setup Guide

## ✅ O que foi criado

- [x] Projeto Next.js com TypeScript e Tailwind
- [x] Firebase Authentication (login/logout)
- [x] Login page com formulário
- [x] Dashboard básico com cards
- [x] Custom React hooks para auth
- [x] Auth utilities e helpers

## 🔧 Próximos Passos

### 1. Configurar Firebase

1. Acesse: https://console.firebase.google.com/
2. Crie um novo projeto: "salesdash-replica"
3. Habilite:
   - [x] Firestore Database
   - [x] Firebase Authentication (Email/Password)
   - [x] Firebase Storage

4. Copie as credenciais e adicione em `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=salesdash-replica
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 2. Rodar Localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000/login

### 3. Criar Usuário Teste

No Firebase Console → Authentication → Email/Password:
- Email: `teste@example.com`
- Password: `senha123`

### 4. Fazer Login

1. Vá em http://localhost:3000/login
2. Entre com teste@example.com / senha123
3. Você será redirecionado para /dashboard

## 📊 Arquitetura

```
salesdash-replica/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Home)
│   ├── login/page.tsx ✓
│   └── dashboard/page.tsx ✓
├── components/
│   ├── forms/LoginForm.tsx ✓
│   └── dashboard/DashboardCard.tsx ✓
├── lib/
│   ├── firebase.ts ✓
│   ├── auth.ts ✓
│   └── hooks.ts ✓
└── .env.local ✓
```

## 🎯 Fase 3 - Próximas Features

- [ ] Mapear Firestore collections (sales, customers, products)
- [ ] Real-time listeners para dados
- [ ] Página de configurações (/configuracoes)
- [ ] Componentes de relatórios
- [ ] Integração completa com Sentry
- [ ] Deploy em Vercel

---

**Status:** ✅ FASE 2 COMPLETA - Pronto para Fase 3

---

## 📊 Fase 3 - Firestore & Real-time Data ✅

### O que foi adicionado:

- [x] TypeScript types para todas as collections
- [x] Firestore utilities com real-time listeners
- [x] Custom React hooks (useSales, useCustomers, useProducts)
- [x] Página de configurações (/configuracoes)
- [x] Firestore setup guide (FIRESTORE_SETUP.md)

### Collections Mapeadas:

1. **users** → Usuários do sistema
2. **sales** → Vendas com items
3. **customers** → Clientes
4. **products** → Produtos
5. **settings** → Configurações por usuário

### Real-time Listeners:

```typescript
// Dados atualizam automaticamente
const { sales, loading } = useSales(userId);
const { customers } = useCustomers();
const { products } = useProducts();
```

### Próximas Funcionalidades:

- [ ] Página de Vendas (listar, criar, editar)
- [ ] Página de Clientes
- [ ] Página de Produtos
- [ ] Relatórios avançados
- [ ] Gráficos e analytics
- [ ] Export de dados
- [ ] Deploy em Vercel

---

**Status:** ✅ FASE 3 COMPLETA - Pronto para Fase 4 (Deploy)
