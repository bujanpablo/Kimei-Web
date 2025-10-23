'use client';

import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

export function Sparkline({ 
  data, 
  width = 80, 
  height = 40, 
  color = '#3b82f6',
  strokeWidth = 2 
}: SparklineProps) {
  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center text-gray-400 text-xs"
        style={{ width, height }}
      >
        Sin datos
      </div>
    );
  }

  // Normalizar datos para el SVG
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  // Si no hay variación, mostrar línea horizontal
  if (range === 0) {
    const y = height / 2;
    return (
      <svg width={width} height={height} className="overflow-visible">
        <line
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Calcular puntos para el path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(' L ')}`;

  // Calcular área para relleno degradado
  const areaPoints = [
    `0,${height}`,
    ...points,
    `${width},${height}`,
    `0,${height}`
  ].join(' L ');

  const areaPathData = `M ${areaPoints} Z`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Definir degradado */}
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Área de relleno */}
      <path
        d={areaPathData}
        fill={`url(#gradient-${color.replace('#', '')})`}
      />
      
      {/* Línea principal */}
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Puntos de datos */}
      {data.map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={strokeWidth}
            fill={color}
            className="opacity-0 hover:opacity-100 transition-opacity"
          />
        );
      })}
    </svg>
  );
}

// Componente alternativo más simple sin degradado
export function SimpleSparkline({ 
  data, 
  width = 80, 
  height = 40, 
  color = '#3b82f6',
  strokeWidth = 2 
}: SparklineProps) {
  if (!data || data.length === 0) {
    return (
      <div 
        className="flex items-center justify-center text-gray-400 text-xs"
        style={{ width, height }}
      >
        Sin datos
      </div>
    );
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  
  if (range === 0) {
    const y = height / 2;
    return (
      <svg width={width} height={height} className="overflow-visible">
        <line
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    );
  }

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  });

  const pathData = `M ${points.join(' L ')}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}





