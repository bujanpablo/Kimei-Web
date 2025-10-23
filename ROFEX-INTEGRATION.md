# 🔗 Conexión con MATBA-ROFEX (A3)

Este proyecto incluye integración completa con la API oficial de MATBA-ROFEX para obtener precios reales de commodities agrícolas.

## 📋 Requisitos Previos

1. **Cuenta en MATBA-ROFEX**: Necesitas registrarte en [store.rofex.com/servicios/](https://store.rofex.com/servicios/)
2. **Credenciales API**: Obtener username, password y account de MATBA-ROFEX
3. **Acceso a datos**: Verificar que tu cuenta tenga permisos para Market Data

## ⚙️ Configuración

### 1. Variables de Entorno

Copia el archivo `env.example` a `.env.local` y configura tus credenciales:

```bash
cp env.example .env.local
```

Edita `.env.local` con tus credenciales reales:

```env
ROFEX_USERNAME=tu_usuario_real
ROFEX_PASSWORD=tu_password_real  
ROFEX_ACCOUNT=tu_cuenta_real
ROFEX_API_URL=https://api.primary.com.ar
ROFEX_CACHE_TTL=300
ROFEX_DEV_MODE=false
```

### 2. Instalación de Dependencias

```bash
npm install
```

### 3. Configuración de la API

El servicio está configurado para:
- ✅ **Autenticación automática** con renovación de tokens
- ✅ **Cache inteligente** para optimizar rendimiento
- ✅ **Fallback a datos simulados** si falla la conexión
- ✅ **Manejo de errores** robusto

## 🚀 Uso

### Datos Reales vs Simulados

El sistema funciona en dos modos:

1. **Datos Simulados** (por defecto):
   ```
   GET /api/agro-prices
   ```

2. **Datos Reales de MATBA-ROFEX**:
   ```
   GET /api/agro-prices?real=true
   ```

### En el Frontend

El componente `AgroMarket` incluye un botón para alternar entre fuentes:

- 🎯 **Datos Simulados**: Para desarrollo y testing
- 📡 **Datos Reales**: Precios en tiempo real de MATBA-ROFEX

## 📊 Instrumentos Soportados

### Futuros Agrícolas MATBA-ROFEX:
- **DO** - Trigo
- **MA** - Maíz  
- **SO** - Soja
- **GF** - Girasol

### Datos Obtenidos:
- ✅ Precios de mercado (bid, ask, last)
- ✅ Volumen de negociación
- ✅ Timestamps de actualización
- ✅ Información de instrumentos

## 🔧 Servicios Implementados

### `lib/services/rofex.ts`
- **RofexService**: Clase principal para conexión
- **getRofexAgriculturalData()**: Función helper para datos agrícolas
- **Autenticación automática** con renovación de tokens
- **Conversión de datos** al formato de la aplicación

### `app/api/agro-prices/route.ts`
- **Endpoint híbrido** que soporta datos reales y simulados
- **Parámetro `real=true`** para activar datos de MATBA-ROFEX
- **Fallback automático** a datos simulados en caso de error
- **Cache optimizado** con headers CDN

## 🛠️ Desarrollo

### Modo Desarrollo
```env
ROFEX_DEV_MODE=true
```
- Usa datos simulados por defecto
- Permite testing sin credenciales reales

### Modo Producción
```env
ROFEX_DEV_MODE=false
```
- Intenta usar datos reales por defecto
- Requiere credenciales válidas

## 🔍 Debugging

### Logs del Servidor
```bash
npm run dev
```

Los logs mostrarán:
- ✅ Intentos de autenticación
- ✅ Datos obtenidos de MATBA-ROFEX
- ❌ Errores de conexión
- 🔄 Fallbacks a datos simulados

### Verificar Conexión
```bash
curl "http://localhost:3000/api/agro-prices?real=true"
```

## 📈 Próximos Pasos

1. **WebSocket**: Implementar conexión en tiempo real
2. **Datos Históricos**: Agregar sparklines reales
3. **Más Mercados**: Integrar Bolsa de Rosario
4. **Alertas**: Sistema de notificaciones de precios

## 🆘 Troubleshooting

### Error de Autenticación
- Verificar credenciales en `.env.local`
- Confirmar que la cuenta tiene permisos de Market Data
- Revisar logs del servidor

### Datos No Disponibles
- El sistema automáticamente usa datos simulados como fallback
- Verificar conectividad a internet
- Revisar estado de la API de MATBA-ROFEX

### Performance
- Los datos se cachean por 5 minutos
- Usar parámetros de filtro para reducir datos
- Considerar implementar WebSocket para datos en tiempo real

## 📞 Soporte

Para problemas con la API de MATBA-ROFEX:
- 📧 Email: mpi@primary.com.ar
- 🌐 Web: [primary.com.ar](https://primary.com.ar)
- 📚 Docs: [github.com/matbarofex](https://github.com/matbarofex)





