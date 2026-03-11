# 🚀 Deploy Guide - SalesDash Replica

## Pre-requisitos

- [ ] GitHub account com repositório do projeto
- [ ] Vercel account (https://vercel.com)
- [ ] Sentry account (https://sentry.io)
- [ ] Firebase project já configurado
- [ ] Domain customizado (opcional)

---

## 📋 PASSO 1: Preparar Repositório

### 1.1 Criar repositório no GitHub

```bash
cd salesdash-replica
git init
git add .
git commit -m "Initial commit: SalesDash replica with Next.js + Firebase"
git branch -M main
git remote add origin https://github.com/seu-usuario/salesdash-replica.git
git push -u origin main
```

### 1.2 Arquivo .gitignore (já existe)

```
node_modules/
.env.local
.next/
dist/
.DS_Store
```

---

## 🔐 PASSO 2: Setup Sentry

### 2.1 Criar projeto no Sentry

1. Acesse: https://sentry.io/
2. Crie novo projeto → Node.js / Next.js
3. Copie o DSN (exemplo: `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`)

### 2.2 Adicionar ao .env.local

```env
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

---

## 🌐 PASSO 3: Deploy em Vercel

### 3.1 Conectar ao Vercel

1. Acesse: https://vercel.com
2. Clique "New Project"
3. Selecione seu repositório GitHub
4. Vercel vai detectar Next.js automaticamente

### 3.2 Configurar Environment Variables

No Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY = [sua chave]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = [seu domínio]
NEXT_PUBLIC_FIREBASE_PROJECT_ID = salesdash-replica
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = [seu bucket]
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = [seu ID]
NEXT_PUBLIC_FIREBASE_APP_ID = [seu app ID]
NEXT_PUBLIC_SENTRY_DSN = [seu DSN]
```

### 3.3 Configurar Custom Domain (Opcional)

1. Vercel Dashboard → Domains
2. Adicione seu domínio (ex: salesdash.com.br)
3. Siga as instruções para configurar DNS

### 3.4 Deploy Automático

Toda vez que você fizer push para main, Vercel vai fazer deploy automaticamente!

```bash
git push origin main  # Vercel faz deploy automaticamente
```

---

## ✅ PASSO 4: Verificações Pós-Deploy

### 4.1 Testar Funcionalidades

- [ ] Login funciona?
- [ ] Dados aparecem em tempo real?
- [ ] Configurações salvam?
- [ ] Sentry captura erros?

### 4.2 Performance

Vercel Dashboard → Analytics:
- [ ] FCP (First Contentful Paint) < 2s
- [ ] LCP (Largest Contentful Paint) < 3s
- [ ] CLS (Cumulative Layout Shift) < 0.1

### 4.3 Sentry Monitoring

1. Acesse Sentry Dashboard
2. Veja os erros capturados em tempo real
3. Configure alertas se necessário

---

## 🔗 URLs após Deploy

```
Ambiente    URL
──────────────────────────────────────────
Production  https://salesdash-replica.vercel.app
            ou seu domínio customizado

Staging     https://salesdash-replica-staging.vercel.app
            (branch: staging)

Development localhost:3000
```

---

## 📊 CI/CD Pipeline (GitHub Actions)

Adicione `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main, staging]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: echo "Deploying to Vercel..."
      # Vercel deploy automático
```

---

## 🛡️ Security Checklist

- [ ] Firebase Security Rules configuradas
- [ ] Secrets não estão no código (use .env.local)
- [ ] HTTPS ativado (automático no Vercel)
- [ ] Sentry DSN público (seguro usar NEXT_PUBLIC_)
- [ ] Rate limiting no backend (considerar)
- [ ] CORS configurado se necessário

---

## 📈 Monitoramento

### Vercel Analytics
- Performance metrics
- Deployment history
- Error logs

### Sentry Dashboard
- Error tracking
- Performance monitoring
- Session replay

### Firebase Console
- Firestore usage
- Authentication logs
- Storage usage

---

## 🆘 Troubleshooting

### Build falha?
```bash
npm run build  # Testa localmente
npm run lint   # Verifica erros
```

### Erro no login?
- Verificar Firebase credenciais no .env.local
- Verificar Security Rules do Firestore

### Dados não carregam?
- Verificar conexão Firestore
- Verificar console do navegador (F12)
- Verificar Sentry para erros

---

## 🎯 Próximas Melhorias

- [ ] Implementar mais páginas (vendas, clientes)
- [ ] Adicionar testes automatizados
- [ ] Setup CI/CD completo
- [ ] Backup automático de dados
- [ ] API GraphQL (considerado)
- [ ] Mobile app (React Native)

---

**Status:** ✅ PRONTO PARA DEPLOY
