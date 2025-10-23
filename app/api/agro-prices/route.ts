import { NextResponse } from 'next/server';
import { AgroAsset } from '@/components/agro/AgroMarket';
import { getAgroPrices, getAgroPricesByCommodity, getAgroPricesByMarket } from '@/lib/data/agro';
import { getRofexAgriculturalData } from '@/lib/services/rofex';

// Configuración de cache server-side
export const revalidate = 300; // Revalidar cada 5 minutos

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const commodity = searchParams.get('commodity') as AgroAsset['commodity'] | null;
    const market = searchParams.get('market') as AgroAsset['market'] | null;
    const useRealData = searchParams.get('real') === 'true';

    let data: AgroAsset[];

    // Si se solicita datos reales, intentar obtenerlos de MATBA-ROFEX
    if (useRealData) {
      try {
        console.log('Intentando obtener datos reales de MATBA-ROFEX...');
        const rofexData = await getRofexAgriculturalData();
        
        if (rofexData.length > 0) {
          console.log(`Obtenidos ${rofexData.length} instrumentos de MATBA-ROFEX`);
          data = rofexData;
        } else {
          console.log('No se obtuvieron datos de ROFEX, usando datos simulados');
          data = await getAgroPrices();
        }
      } catch (error) {
        console.error('Error obteniendo datos reales, usando fallback:', error);
        data = await getAgroPrices();
      }
    } else {
      // Usar datos simulados por defecto
      data = await getAgroPrices();
    }

    // Filtrar datos según parámetros de query
    if (commodity && market) {
      const commodityData = await getAgroPricesByCommodity(commodity);
      data = commodityData.filter(asset => asset.market === market);
    } else if (commodity) {
      data = data.filter(asset => asset.commodity === commodity);
    } else if (market) {
      data = data.filter(asset => asset.market === market);
    }

    // Headers para cache CDN y navegador
    const headers = {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'CDN-Cache-Control': 'max-age=300',
      'Vercel-CDN-Cache-Control': 'max-age=300',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return NextResponse.json({
      data,
      source: useRealData ? 'MATBA-ROFEX' : 'simulated',
      timestamp: new Date().toISOString(),
      count: data.length
    }, { headers });

  } catch (error) {
    console.error('Error fetching agro prices:', error);
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        source: 'error',
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

// Endpoint POST para filtros avanzados
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { commodity, market, minPrice, maxPrice, sortBy, sortOrder } = body;
    
    let data = await getAgroPrices();
    
    // Aplicar filtros
    if (commodity) {
      data = data.filter(asset => asset.commodity === commodity);
    }
    
    if (market) {
      data = data.filter(asset => asset.market === market);
    }
    
    if (minPrice !== undefined) {
      data = data.filter(asset => asset.price >= minPrice);
    }
    
    if (maxPrice !== undefined) {
      data = data.filter(asset => asset.price <= maxPrice);
    }
    
    // Aplicar ordenamiento
    if (sortBy && ['price', 'changePct', 'changeAbs', 'lastUpdate'].includes(sortBy)) {
      data.sort((a, b) => {
        const aValue = a[sortBy as keyof AgroAsset];
        const bValue = b[sortBy as keyof AgroAsset];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'desc' ? 
            bValue.localeCompare(aValue) : 
            aValue.localeCompare(bValue);
        }
        
        return 0;
      });
    }
    
    const headers = {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      'Content-Type': 'application/json',
    };
    
    return NextResponse.json(data, { headers });
    
  } catch (error) {
    console.error('Error filtering agro prices:', error);
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

// Endpoint OPTIONS para CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
