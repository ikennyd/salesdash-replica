'use client';

import { useAuthContext } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DashboardCard from '@/components/dashboard/DashboardCard';

export default function DashboardPage() {
  const { isAuthenticated, currentUser, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Bem-vindo, {currentUser?.email}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total de Vendas"
            value="R$ 45.230"
            icon="💰"
            description="Este mês"
          />
          <DashboardCard
            title="Pedidos"
            value="123"
            icon="📦"
            description="+5 hoje"
          />
          <DashboardCard
            title="Clientes"
            value="284"
            icon="👥"
            description="+12 novos"
          />
          <DashboardCard
            title="Taxa de Conversão"
            value="3.8%"
            icon="📈"
            description="vs 3.2% mês anterior"
          />
        </div>

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Status do Sistema</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>Firebase Firestore: Conectado ✓</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>Firebase Storage: Conectado ✓</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>Firebase Auth: Autenticado ✓</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
