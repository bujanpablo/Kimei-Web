import { AgroAsset } from '@/components/agro/AgroMarket';
import fs from 'fs';
import path from 'path';

// Cache en memoria para evitar lecturas repetidas del archivo
let cachedData: AgroAsset[] | null = null;
let lastModified: number | null = null;

/**
 * Obtiene los precios agro desde el archivo JSON
 * Implementa cache en memoria para mejorar performance
 */
export async function getAgroPrices(): Promise<AgroAsset[]> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'agro-prices.json');
    const stats = fs.statSync(filePath);
    const currentModified = stats.mtime.getTime();

    // Si el archivo no ha cambiado y tenemos datos en cache, devolverlos
    if (cachedData && lastModified === currentModified) {
      return cachedData;
    }

    // Leer archivo y actualizar cache
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: AgroAsset[] = JSON.parse(fileContent);
    
    // Validar estructura de datos
    const validatedData = data.filter(validateAgroAsset);
    
    // Actualizar cache
    cachedData = validatedData;
    lastModified = currentModified;

    return validatedData;

  } catch (error) {
    console.error('Error reading agro prices data:', error);
    
    // Si hay error, devolver datos de fallback
    return getFallbackData();
  }
}

/**
 * Filtra los precios por commodity
 */
export async function getAgroPricesByCommodity(commodity: AgroAsset['commodity']): Promise<AgroAsset[]> {
  const allPrices = await getAgroPrices();
  return allPrices.filter(asset => asset.commodity === commodity);
}

/**
 * Filtra los precios por mercado
 */
export async function getAgroPricesByMarket(market: AgroAsset['market']): Promise<AgroAsset[]> {
  const allPrices = await getAgroPrices();
  return allPrices.filter(asset => asset.market === market);
}

/**
 * Obtiene un precio específico por ID
 */
export async function getAgroPriceById(id: string): Promise<AgroAsset | null> {
  const allPrices = await getAgroPrices();
  return allPrices.find(asset => asset.id === id) || null;
}

/**
 * Obtiene estadísticas generales del mercado
 */
export async function getAgroMarketStats() {
  const allPrices = await getAgroPrices();
  
  const stats = {
    totalAssets: allPrices.length,
    markets: {
      local: allPrices.filter(a => a.market === 'local').length,
      matbarofex: allPrices.filter(a => a.market === 'matbarofex').length,
      cme: allPrices.filter(a => a.market === 'cme').length,
    },
    commodities: {
      trigo: allPrices.filter(a => a.commodity === 'trigo').length,
      maiz: allPrices.filter(a => a.commodity === 'maiz').length,
      soja: allPrices.filter(a => a.commodity === 'soja').length,
      girasol: allPrices.filter(a => a.commodity === 'girasol').length,
      otros: allPrices.filter(a => a.commodity === 'otros').length,
    },
    currencies: {
      USD: allPrices.filter(a => a.currency === 'USD').length,
      ARS: allPrices.filter(a => a.currency === 'ARS').length,
    },
    lastUpdate: allPrices.length > 0 ? 
      new Date(Math.max(...allPrices.map(a => new Date(a.lastUpdate).getTime()))).toISOString() :
      new Date().toISOString()
  };

  return stats;
}

/**
 * Valida que un objeto tenga la estructura correcta de AgroAsset
 */
function validateAgroAsset(asset: any): asset is AgroAsset {
  return (
    typeof asset === 'object' &&
    typeof asset.id === 'string' &&
    typeof asset.symbol === 'string' &&
    typeof asset.name === 'string' &&
    ['local', 'matbarofex', 'cme'].includes(asset.market) &&
    ['trigo', 'maiz', 'soja', 'girasol', 'otros'].includes(asset.commodity) &&
    typeof asset.unit === 'string' &&
    ['USD', 'ARS'].includes(asset.currency) &&
    typeof asset.price === 'number' &&
    typeof asset.changeAbs === 'number' &&
    typeof asset.changePct === 'number' &&
    typeof asset.lastUpdate === 'string' &&
    Array.isArray(asset.sparkline) &&
    asset.sparkline.every((val: any) => typeof val === 'number')
  );
}

/**
 * Datos de fallback en caso de error
 */
function getFallbackData(): AgroAsset[] {
  return [
    {
      id: "fallback-trigo",
      symbol: "TRI-FB",
      name: "Trigo Fallback",
      market: "local",
      commodity: "trigo",
      unit: "USD/t",
      currency: "USD",
      price: 0,
      changeAbs: 0,
      changePct: 0,
      lastUpdate: new Date().toISOString(),
      sparkline: [0, 0, 0, 0, 0, 0, 0]
    }
  ];
}

/**
 * Limpia el cache en memoria
 * Útil para testing o cuando se necesita forzar una nueva lectura
 */
export function clearAgroCache(): void {
  cachedData = null;
  lastModified = null;
}

/**
 * Verifica si hay datos en cache
 */
export function hasAgroCache(): boolean {
  return cachedData !== null;
}





