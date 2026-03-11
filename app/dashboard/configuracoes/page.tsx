'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

export default function ConfiguracoesPage() {
  const { isAuthenticated, currentUser, loading } = useAuthContext();
  const router = useRouter();
  const [tema, setTema] = useState('light');
  const [idioma, setIdioma] = useState('pt');
  const [notificacoes, setNotificacoes] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  const handleSave = () => {
    // Aqui você salvaria no Firestore
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Configurações</h1>
          <p className="text-gray-600 mt-2">Personalize sua experiência</p>
        </div>

        {saved && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            ✓ Configurações salvas com sucesso!
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Tema */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Tema</label>
            <select
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
              <option value="auto">Automático</option>
            </select>
          </div>

          {/* Idioma */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Idioma</label>
            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          {/* Notificações */}
          <div className="flex items-center justify-between">
            <label className="block text-gray-700 font-semibold">Notificações</label>
            <input
              type="checkbox"
              checked={notificacoes}
              onChange={(e) => setNotificacoes(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-3">Email</label>
            <input
              type="email"
              value={currentUser?.email || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Botão Salvar */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Salvar Configurações
          </button>
        </div>

        {/* API Documentation */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Informações do Sistema</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Versão:</strong> 1.0.0</p>
            <p><strong>Plataforma:</strong> Next.js 14 + Firebase</p>
            <p><strong>Banco de Dados:</strong> Firestore (Real-time)</p>
            <p><strong>Autenticação:</strong> Firebase Auth</p>
          </div>
        </div>
      </div>
    </main>
  );
}
