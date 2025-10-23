// Servicio para conectar con MATBA-ROFEX usando Primary API Hub
// Este archivo maneja la conexión y obtención de datos reales
// Basado en: https://apihub.primary.com.ar/

interface RofexCredentials {
  username: string;
  password: string;
  account: string;
}

interface PrimaryMarketData {
  symbol: string;
  bid: number;
  ask: number;
  last: number;
  volume: number;
  timestamp: string;
  bidSize?: number;
  askSize?: number;
  high?: number;
  low?: number;
  open?: number;
  close?: number;
}

interface PrimaryInstrument {
  instrumentId: {
    marketId: string;
    symbol: string;
  };
  cficode: string;
  segment: string;
  securityDescription: string;
  currency: string;
  lowLimitPrice: number;
  highLimitPrice: number;
  tickSize: number;
  orderQty: number;
  priceMultiplier: number;
  maturityDate?: string;
}

class PrimaryApiService {
  private credentials: RofexCredentials | null = null;
  private baseUrl = 'https://api.primary.com.ar';
  private token: string | null = null;
  private tokenExpiry: number | null = null;

  constructor() {
    // En producción, estas credenciales deberían venir de variables de entorno
    this.credentials = {
      username: process.env.PRIMARY_USERNAME || '',
      password: process.env.PRIMARY_PASSWORD || '',
      account: process.env.PRIMARY_ACCOUNT || ''
    };
    
    // Si no hay credenciales, mostrar mensaje informativo
    if (!this.credentials.username) {
      console.log('🔧 PRIMARY API: Credenciales no configuradas. Usando datos simulados.');
      console.log('📧 Para obtener credenciales reales, contactar: remarkets@primary.com.ar');
      console.log('🌐 Más información en: https://apihub.primary.com.ar/');
    }
  }

  /**
   * Autentica con la API de Primary
   */
  async authenticate(): Promise<boolean> {
    if (!this.credentials?.username || !this.credentials?.password) {
      console.error('Credenciales de Primary API no configuradas');
      return false;
    }

    try {
      // Usar el endpoint correcto de Primary API Hub
      const response = await fetch(`${this.baseUrl}/auth/getToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.credentials.username,
          password: this.credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error de autenticación: ${response.status}`);
      }

      const data = await response.json();
      this.token = data.token;
      this.tokenExpiry = Date.now() + (data.expiresIn * 1000);
      
      console.log('✅ Autenticación exitosa con Primary API');
      return true;
    } catch (error) {
      console.error('❌ Error en autenticación Primary API:', error);
      return false;
    }
  }

  /**
   * Verifica si el token está válido
   */
  private isTokenValid(): boolean {
    if (!this.token || !this.tokenExpiry) {
      return false;
    }
    return Date.now() < this.tokenExpiry;
  }

  /**
   * Obtiene el token válido (renueva si es necesario)
   */
  private async getValidToken(): Promise<string | null> {
    if (!this.isTokenValid()) {
      const authenticated = await this.authenticate();
      if (!authenticated) {
        return null;
      }
    }
    return this.token;
  }

  /**
   * Obtiene instrumentos disponibles usando Primary API Trading
   */
  async getInstruments(): Promise<PrimaryInstrument[]> {
    const token = await this.getValidToken();
    if (!token) {
      throw new Error('No se pudo obtener token válido');
    }

    try {
      // Usar el endpoint correcto de Primary API Trading
      const response = await fetch(`${this.baseUrl}/rest/instruments/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error obteniendo instrumentos: ${response.status}`);
      }

      const data = await response.json();
      return data.instruments || [];
    } catch (error) {
      console.error('Error obteniendo instrumentos:', error);
      throw error;
    }
  }

  /**
   * Obtiene datos de mercado para un símbolo específico usando Primary API Trading
   */
  async getMarketData(symbol: string): Promise<PrimaryMarketData | null> {
    const token = await this.getValidToken();
    if (!token) {
      throw new Error('No se pudo obtener token válido');
    }

    try {
      // Usar el endpoint correcto de Primary API Trading para Market Data
      const response = await fetch(`${this.baseUrl}/rest/marketdata/get/${symbol}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error obteniendo datos de mercado: ${response.status}`);
      }

      const data = await response.json();
      return data.marketData || null;
    } catch (error) {
      console.error(`Error obteniendo datos para ${symbol}:`, error);
      return null;
    }
  }

  /**
   * Obtiene datos de mercado para múltiples símbolos usando Primary API Trading
   */
  async getMultipleMarketData(symbols: string[]): Promise<PrimaryMarketData[]> {
    const token = await this.getValidToken();
    if (!token) {
      throw new Error('No se pudo obtener token válido');
    }

    try {
      // Usar el endpoint correcto de Primary API Trading para múltiples símbolos
      const response = await fetch(`${this.baseUrl}/rest/marketdata/get`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbols: symbols,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error obteniendo datos múltiples: ${response.status}`);
      }

      const data = await response.json();
      return data.marketData || [];
    } catch (error) {
      console.error('Error obteniendo datos múltiples:', error);
      return [];
    }
  }

  /**
   * Obtiene instrumentos agrícolas específicos de MATBA-ROFEX
   * Basado en la nomenclatura de https://matbarofex.primary.ventures/
   */
  async getAgriculturalInstruments(): Promise<PrimaryInstrument[]> {
    const allInstruments = await this.getInstruments();
    
    // Filtrar instrumentos agrícolas usando la nomenclatura correcta de MATBA-ROFEX
    const agriculturalSymbols = [
      'DO', // Trigo (Dólar)
      'MA', // Maíz (Dólar) 
      'SO', // Soja (Dólar)
      'GF', // Girasol (Dólar)
      'DOA', // Trigo (ARS)
      'MAA', // Maíz (ARS)
      'SOA', // Soja (ARS)
      'GFA', // Girasol (ARS)
    ];

    return allInstruments.filter(instrument => 
      agriculturalSymbols.some(symbol => 
        instrument.instrumentId.symbol.includes(symbol)
      )
    );
  }

  /**
   * Convierte datos de Primary API al formato de nuestra aplicación
   */
  convertToAgroAsset(primaryData: PrimaryMarketData, instrument: PrimaryInstrument): any {
    const symbol = instrument.instrumentId.symbol;
    const name = instrument.securityDescription;
    
    // Mapear símbolos a commodities según la nomenclatura de MATBA-ROFEX
    const commodityMap: { [key: string]: string } = {
      'DO': 'trigo',
      'DOA': 'trigo',
      'MA': 'maiz',
      'MAA': 'maiz', 
      'SO': 'soja',
      'SOA': 'soja',
      'GF': 'girasol',
      'GFA': 'girasol',
    };

    // Determinar commodity basado en el prefijo del símbolo
    const commodity = Object.keys(commodityMap).find(key => 
      symbol.startsWith(key)
    );
    const mappedCommodity = commodity ? commodityMap[commodity] : 'otros';

    // Determinar moneda basada en el sufijo del símbolo
    const currency = symbol.endsWith('A') ? 'ARS' : 'USD';
    const unit = currency === 'ARS' ? 'ARS/t' : 'USD/t';
    
    return {
      id: `primary-${symbol.toLowerCase()}`,
      symbol: symbol,
      name: name,
      market: 'matbarofex',
      commodity: mappedCommodity,
      unit: unit,
      currency: currency,
      price: primaryData.last,
      changeAbs: 0, // Se calcularía con datos históricos
      changePct: 0, // Se calcularía con datos históricos
      lastUpdate: primaryData.timestamp,
      sparkline: [], // Se obtendría de datos históricos
    };
  }
}

// Instancia singleton del servicio
export const primaryApiService = new PrimaryApiService();

// Función helper para obtener datos agrícolas de MATBA-ROFEX
export async function getRofexAgriculturalData() {
  try {
    console.log('🔄 Obteniendo datos agrícolas de MATBA-ROFEX...');
    
    // Obtener instrumentos agrícolas
    const instruments = await primaryApiService.getAgriculturalInstruments();
    
    if (instruments.length === 0) {
      console.log('⚠️ No se encontraron instrumentos agrícolas');
      return [];
    }
    
    // Obtener símbolos
    const symbols = instruments.map(inst => inst.instrumentId.symbol);
    console.log(`📊 Símbolos encontrados: ${symbols.join(', ')}`);
    
    // Obtener datos de mercado
    const marketData = await primaryApiService.getMultipleMarketData(symbols);
    
    if (marketData.length === 0) {
      console.log('⚠️ No se obtuvieron datos de mercado');
      return [];
    }
    
    // Convertir al formato de nuestra aplicación
    const agroAssets = marketData.map((data, index) => 
      primaryApiService.convertToAgroAsset(data, instruments[index])
    );

    console.log(`✅ Se obtuvieron ${agroAssets.length} activos agrícolas de MATBA-ROFEX`);
    return agroAssets;
  } catch (error) {
    console.error('❌ Error obteniendo datos agrícolas de MATBA-ROFEX:', error);
    return [];
  }
}

export default PrimaryApiService;
