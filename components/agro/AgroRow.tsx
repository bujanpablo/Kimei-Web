'use client';

import React from 'react';
import { Sparkline } from './Sparkline';
import { AgroAsset } from './AgroMarket';

interface AgroRowProps {
  asset: AgroAsset;
  index?: number;
}

export function AgroRow({ asset, index = 0 }: AgroRowProps) {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}`;
  };

  const formatChangePct = (changePct: number) => {
    const sign = changePct >= 0 ? '+' : '';
    return `${sign}${changePct.toFixed(2)}%`;
  };

  const formatLastUpdate = (lastUpdate: string) => {
    const date = new Date(lastUpdate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) {
      return 'Ahora';
    } else if (diffMins < 60) {
      return `Hace ${diffMins}m`;
    } else if (diffMins < 1440) {
      const diffHours = Math.floor(diffMins / 60);
      return `Hace ${diffHours}h`;
    } else {
      return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getMarketBadge = (market: AgroAsset['market']) => {
    const badges = {
      local: { label: 'Local', color: 'bg-blue-100 text-blue-800' },
      matbarofex: { label: 'Matba', color: 'bg-green-100 text-green-800' },
      cme: { label: 'CME', color: 'bg-purple-100 text-purple-800' }
    };
    
    return badges[market] || { label: market, color: 'bg-gray-100 text-gray-800' };
  };

  const badge = getMarketBadge(asset.market);
  const isPositive = asset.changePct >= 0;
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  const changeBgColor = isPositive ? 'bg-green-50' : 'bg-red-50';

  return (
    <tr className={`hover:bg-gray-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
      {/* Símbolo */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-mono text-sm font-bold text-gray-900">
              {asset.symbol}
            </span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm ${badge.color}`}>
              {badge.label}
            </span>
          </div>
        </div>
      </td>

      {/* Nombre */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {asset.name}
          </span>
          <span className="text-xs text-gray-500">
            {asset.unit}
          </span>
        </div>
      </td>

      {/* Precio */}
      <td className="px-6 py-4 text-right">
        <div className="flex flex-col items-end">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(asset.price, asset.currency)}
          </span>
          <span className="text-xs text-gray-500 font-medium">
            {asset.unit}
          </span>
        </div>
      </td>

      {/* Variación */}
      <td className="px-6 py-4 text-right">
        <div className="flex flex-col items-end gap-2">
          <span className={`text-lg font-bold ${changeColor}`}>
            {formatChangePct(asset.changePct)}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${changeBgColor} ${changeColor}`}>
            {formatChange(asset.changeAbs)}
          </span>
        </div>
      </td>

      {/* Sparkline */}
      <td className="px-6 py-4 text-center">
        <div className="flex justify-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <Sparkline 
              data={asset.sparkline} 
              width={80} 
              height={40}
              color={isPositive ? '#10b981' : '#ef4444'}
            />
          </div>
        </div>
      </td>

      {/* Última actualización */}
      <td className="px-6 py-4 text-right">
        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
          {formatLastUpdate(asset.lastUpdate)}
        </span>
      </td>
    </tr>
  );
}

