'use client';

import React, { useState, useEffect } from 'react';
import { AgroRow } from './AgroRow';
import { ChevronsUpDown } from 'lucide-react';

export type AgroAsset = {
  id: string;              // ej. "trigo-rosario-spot"
  symbol: string;          // "TRI-ROS"
  name: string;            // "Trigo Rosario (Spot)"
  market: "local" | "matbarofex" | "cme";
  commodity: "trigo" | "maiz" | "soja" | "girasol" | "otros";
  unit: string;            // "USD/t" | "ARS/t" | "USD/bu"
  currency: "USD" | "ARS";
  price: number;
  changeAbs: number;
  changePct: number;       // -2.31
  lastUpdate: string;      // ISO
  sparkline: number[];     // últimos 7–10 valores
};

type SortField = 'price' | 'changePct';
type SortDirection = 'asc' | 'desc';
type FilterTab = 'todos' | 'granos' | 'futuros' | 'local' | 'chicago';

export function AgroMarket() {
  const [assets, setAssets] = useState<AgroAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string>('simulated');
  const [sortField, setSortField] = useState<SortField>('price');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [activeTab, setActiveTab] = useState<FilterTab>('todos');

  useEffect(() => {
    fetchAgroPrices();
  }, []);

  const fetchAgroPrices = async (useRealData = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = useRealData ? '/api/agro-prices?real=true' : '/api/agro-prices';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Error al cargar precios agro');
      }
      
      const result = await response.json();
      
      // Manejar nueva estructura de respuesta
      if (result.data) {
        setAssets(result.data);
        setDataSource(result.source || 'unknown');
      } else {
        // Fallback para estructura antigua
        setAssets(result);
        setDataSource('simulated');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAssets = assets.filter(asset => {
    switch (activeTab) {
      case 'granos':
        return ['trigo', 'maiz', 'soja', 'girasol'].includes(asset.commodity);
      case 'futuros':
        return asset.market === 'matbarofex';
      case 'local':
        return asset.market === 'local';
      case 'chicago':
        return asset.market === 'cme';
      default:
        return true;
    }
  });

  const sortedAssets = [...filteredAssets].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const tabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'granos', label: 'Granos' },
    { id: 'futuros', label: 'Futuros' },
    { id: 'local', label: 'Local' },
    { id: 'chicago', label: 'Chicago' }
  ] as const;

  if (loading) {
    return <AgroMarketSkeleton />;
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50" aria-live="polite">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mercado Agro</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800 mb-4">{error}</p>
              <button
                onClick={fetchAgroPrices}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50" aria-live="polite">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-kimei-green to-kimei-gold rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌾</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Mercado Agro</h2>
          </div>
          <p className="text-gray-600 mb-6 text-lg">Precios en tiempo real del mercado agropecuario argentino</p>
          
          {/* Indicador de fuente de datos mejorado */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
              dataSource === 'MATBA-ROFEX' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              <span className="text-lg">
                {dataSource === 'MATBA-ROFEX' ? '📡' : '🎯'}
              </span>
              <span>
                {dataSource === 'MATBA-ROFEX' ? 'Datos Reales MATBA-ROFEX' : 'Datos Simulados'}
              </span>
            </div>
            
            <button
              onClick={() => fetchAgroPrices(dataSource !== 'MATBA-ROFEX')}
              className="px-6 py-2 bg-gradient-to-r from-kimei-gold to-b8941f text-white rounded-lg hover:from-b8941f hover:to-kimei-gold transition-all duration-300 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {dataSource === 'MATBA-ROFEX' ? 'Ver Simulados' : 'Ver Reales'}
            </button>
          </div>

          {/* Información adicional */}
          {dataSource === 'simulated' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-amber-600">💡</span>
                <span className="text-sm font-medium text-amber-800">Modo de Demostración</span>
              </div>
              <p className="text-xs text-amber-700 mb-2">
                Actualmente mostrando datos simulados para demostración.
              </p>
              <p className="text-xs text-amber-600">
                📧 Para datos reales: <strong>remarkets@primary.com.ar</strong>
              </p>
            </div>
          )}
        </div>

        {/* Tabs de filtro mejorados */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-kimei-gold to-b8941f text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-kimei-gold hover:shadow-md'
              }`}
              aria-pressed={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tabla de precios mejorada */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-kimei-green to-kimei-gold">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Símbolo
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                    <button
                      onClick={() => handleSort('price')}
                      className="flex items-center gap-1 hover:text-gray-200 transition-colors"
                    >
                      Precio
                      <ChevronsUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                    <button
                      onClick={() => handleSort('changePct')}
                      className="flex items-center gap-1 hover:text-gray-200 transition-colors"
                    >
                      Variación %
                      <ChevronsUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                    Tendencia
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                    Última actualización
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedAssets.map((asset, index) => (
                  <AgroRow key={asset.id} asset={asset} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {sortedAssets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No hay datos disponibles para el filtro seleccionado</p>
          </div>
        )}
      </div>
    </section>
  );
}

function AgroMarketSkeleton() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-lg w-20 animate-pulse"></div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
