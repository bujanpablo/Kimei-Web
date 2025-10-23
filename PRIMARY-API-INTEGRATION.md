# Integración con Primary API Hub

Este documento explica cómo integrar la sección de mercado con las APIs reales de Primary para obtener datos de MATBA-ROFEX.

## 📋 Información General

- **API Hub**: https://apihub.primary.com.ar/
- **Plataforma de simulación**: https://remarkets.primary.ventures/
- **Contacto para credenciales**: remarkets@primary.com.ar

## 🔑 Configuración de Credenciales

### 1. Obtener Credenciales

Para obtener credenciales de prueba o producción:

1. Contactar a: **remarkets@primary.com.ar**
2. Solicitar acceso a la API de Trading de Primary
3. Proporcionar información sobre el uso previsto

### 2. Configurar Variables de Entorno

Crear archivo `.env.local` basado en `env.example`:

```bash
# Credenciales de Primary API
PRIMARY_USERNAME=tu_usuario_aqui
PRIMARY_PASSWORD=tu_password_aqui
PRIMARY_ACCOUNT=tu_cuenta_aqui

# Configuración
PRIMARY_API_URL=https://api.primary.com.ar
PRIMARY_CACHE_TTL=300
PRIMARY_DEV_MODE=false
PRIMARY_SANDBOX_MODE=false
```

## 🚀 APIs Disponibles

### API de Trading
- **Market Data en tiempo real**
- **Protocolos**: REST, WebSocket, FIX
- **Documentación**: https://apihub.primary.com.ar/docs

### API Post Trade
- **Operaciones concertadas**
- **Márgenes y garantías**
- **Información contable**

### API Risk
- **Consulta de posiciones**
- **Impacto en tiempo real**
- **Cotización de monedas**

## 📊 Instrumentos Agrícolas MATBA-ROFEX

### Nomenclatura de Símbolos

| Símbolo | Producto | Moneda | Descripción |
|---------|----------|---------|-------------|
| DO | Trigo | USD | Futuro de Trigo en Dólares |
| DOA | Trigo | ARS | Futuro de Trigo en Pesos |
| MA | Maíz | USD | Futuro de Maíz en Dólares |
| MAA | Maíz | ARS | Futuro de Maíz en Pesos |
| SO | Soja | USD | Futuro de Soja en Dólares |
| SOA | Soja | ARS | Futuro de Soja en Pesos |
| GF | Girasol | USD | Futuro de Girasol en Dólares |
| GFA | Girasol | ARS | Futuro de Girasol en Pesos |

### Formato de Ticker

La nomenclatura completa incluye el vencimiento:
- **Formato**: `CódigoProducto + Mes + Año`
- **Ejemplo**: `DO/ENE26` (Trigo Enero 2026)

## 🔧 Implementación Técnica

### Servicio Principal

El servicio `PrimaryApiService` maneja:

1. **Autenticación** con tokens JWT
2. **Obtención de instrumentos** agrícolas
3. **Market Data** en tiempo real
4. **Conversión** al formato interno

### Endpoints Utilizados

```typescript
// Autenticación
POST /auth/getToken

// Instrumentos
GET /rest/instruments/all

// Market Data
GET /rest/marketdata/get/{symbol}
POST /rest/marketdata/get (múltiples símbolos)
```

### Manejo de Errores

El sistema incluye:
- **Fallback** a datos simulados si falla la API
- **Cache** en memoria para mejorar performance
- **Logging** detallado para debugging

## 🧪 Entorno de Pruebas

### reMarkets

Para pruebas y desarrollo:
1. Registrarse en: https://remarkets.primary.ventures/
2. Usar credenciales de sandbox
3. Probar estrategias de trading

### Configuración de Sandbox

```bash
PRIMARY_SANDBOX_MODE=true
PRIMARY_API_URL=https://api-sandbox.primary.com.ar
```

## 📈 Uso en la Aplicación

### Componente AgroMarket

El componente `AgroMarket` automáticamente:

1. **Detecta** si hay credenciales configuradas
2. **Intenta** obtener datos reales de Primary API
3. **Fallback** a datos simulados si es necesario
4. **Muestra** el origen de los datos al usuario

### Botón de Alternancia

Los usuarios pueden alternar entre:
- **Datos Reales** (Primary API)
- **Datos Simulados** (JSON local)

## 🔍 Debugging

### Logs del Servicio

```bash
# En desarrollo, revisar la consola del servidor
🔄 Obteniendo datos agrícolas de MATBA-ROFEX...
📊 Símbolos encontrados: DO/ENE26, MA/ENE26, SO/ENE26
✅ Se obtuvieron 12 activos agrícolas de MATBA-ROFEX
```

### Verificación de Credenciales

```bash
❌ Error en autenticación Primary API: 401 Unauthorized
🔧 PRIMARY API: Credenciales no configuradas. Usando datos simulados.
```

## 📞 Soporte

### Contactos Útiles

- **API Support**: remarkets@primary.com.ar
- **Documentación**: https://apihub.primary.com.ar/
- **GitHub**: https://github.com/matbarofex

### Recursos Adicionales

- **Postman Collections**: Disponibles en la documentación
- **Librerías**: .NET, R, Java, Python
- **Guías de implementación**: MD, MD + OR

## 🚨 Consideraciones Importantes

1. **Rate Limiting**: Respetar los límites de la API
2. **Cache**: Implementar cache apropiado
3. **SSL**: Usar siempre HTTPS en producción
4. **Tokens**: Manejar expiración de tokens automáticamente
5. **Fallback**: Siempre tener datos de respaldo

## 📝 Próximos Pasos

1. **Obtener credenciales** de Primary API
2. **Configurar variables** de entorno
3. **Probar** en entorno sandbox
4. **Implementar** actualizaciones en tiempo real
5. **Optimizar** performance y cache




