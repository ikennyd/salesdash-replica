#!/bin/bash

# Setup Vercel Deployment Automation
# Este script configura tudo para você

echo "🚀 Iniciando setup do Vercel..."

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Login no Vercel
echo "🔐 Faça login no Vercel (vai abrir no navegador)..."
vercel login

# Link o projeto
echo "🔗 Conectando seu projeto..."
vercel link --yes

# Puxar variáveis de ambiente do Vercel
echo "📥 Puxando configurações do Vercel..."
vercel env pull

echo ""
echo "✅ Pronto! Agora:"
echo "   - Toda vez que você fazer 'git push', o Vercel faz deploy automático"
echo "   - As variáveis de ambiente estão em .env.local"
echo ""
echo "Próximos passos:"
echo "1. Configure as variáveis de ambiente no Vercel Dashboard"
echo "2. Faça 'git push' e veja o deploy automático acontecer"
echo ""
