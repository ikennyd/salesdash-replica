# 🔥 Firestore Setup Guide

## Collections a Criar

Crie as seguintes collections no Firebase Console:

### 1. users
```json
{
  "uid": "string",
  "email": "string",
  "name": "string",
  "role": "admin|user|viewer",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 2. sales
```json
{
  "vendedor": "string (userId)",
  "valor": "number",
  "status": "pending|completed|cancelled",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "items": [
    {
      "id": "string",
      "produto": "string",
      "quantidade": "number",
      "preco": "number"
    }
  ]
}
```

### 3. customers
```json
{
  "nome": "string",
  "email": "string",
  "telefone": "string",
  "endereco": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 4. products
```json
{
  "nome": "string",
  "descricao": "string",
  "preco": "number",
  "estoque": "number",
  "imagem": "string (URL)",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

### 5. settings (por usuário)
```json
{
  "userId": "string",
  "tema": "light|dark",
  "idioma": "pt|en",
  "notificacoes": "boolean",
  "atualizadoEm": "timestamp"
}
```

## Security Rules

Cole isto em Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write para usuários autenticados
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    match /sales/{document=**} {
      // Vendedor só vê suas vendas
      allow read: if request.auth.uid == resource.data.vendedor;
      allow write: if request.auth.uid == resource.data.vendedor;
    }
    
    match /customers/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    match /products/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null; // Admin only em produção
    }
    
    match /settings/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## Dados de Teste

Adicione alguns documentos para testar:

### Sale de Teste
```json
{
  "vendedor": "[seu_user_id]",
  "valor": 1250.50,
  "status": "completed",
  "items": [
    {
      "id": "1",
      "produto": "Produto A",
      "quantidade": 2,
      "preco": 500.00
    }
  ],
  "createdAt": "[data_atual]",
  "updatedAt": "[data_atual]"
}
```

## Real-time Listeners

Os hooks já estão configurados:

```typescript
// Em seu componente
import { useSales, useCustomers, useProducts } from '@/lib/hooks';

export default function Dashboard() {
  const { sales, loading } = useSales(currentUser.uid);
  const { customers } = useCustomers();
  const { products } = useProducts();
  
  // Dados atualizam em tempo real!
}
```

---

**Status:** ✅ Pronto para conectar no Firebase Console
