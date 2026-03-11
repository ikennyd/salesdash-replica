// User Types
export interface User {
  uid: string;
  email: string;
  name?: string;
  role: 'admin' | 'user' | 'viewer';
  createdAt: Date;
  updatedAt: Date;
}

// Sales Types
export interface Sale {
  id: string;
  vendedor: string; // ref to user
  valor: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  items: SaleItem[];
}

export interface SaleItem {
  id: string;
  produto: string;
  quantidade: number;
  preco: number;
}

// Customer Types
export interface Customer {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Product Types
export interface Product {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  estoque: number;
  imagem?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Settings Types
export interface UserSettings {
  userId: string;
  tema: 'light' | 'dark';
  idioma: 'pt' | 'en';
  notificacoes: boolean;
  atualizadoEm: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalVendas: number;
  totalClientes: number;
  totalProdutos: number;
  taxaConversao: number;
  vendidoEsteMes: number;
}
