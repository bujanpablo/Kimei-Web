# 🚀 Guía Completa: Conectar con la API de MATBA-ROFEX

## ❗ Problema Actual
Node.js está instalado pero no está en el PATH del sistema. Esto impide ejecutar `npm` desde la terminal.

## 🔧 Solución 1: Arreglar PATH de Node.js

### Opción A: Reiniciar Terminal
1. **Cerrar completamente** tu terminal/IDE
2. **Reabrir** la terminal
3. **Verificar**: `node --version` y `npm --version`

### Opción B: Configurar PATH Manualmente
1. **Buscar Node.js**: `C:\Program Files\nodejs\`
2. **Añadir al PATH**:
   - Abrir "Variables de entorno" en Windows
   - Editar PATH del sistema
   - Añadir: `C:\Program Files\nodejs\`
3. **Reiniciar terminal**

### Opción C: Usar Ruta Completa
```bash
# En lugar de: npm install
"C:\Program Files\nodejs\npm.exe" install

# En lugar de: npm run dev
"C:\Program Files\nodejs\npm.exe" run dev
```

## 📋 Pasos para Conectar con la API

### 1. **Obtener Credenciales de Primary API**
- **Contactar**: remarkets@primary.com.ar
- **Solicitar**: Acceso a Primary API Trading
- **Proporcionar**: Información sobre el uso previsto
- **Recibir**: username, password, account

### 2. **Configurar Variables de Entorno**
Crear archivo `.env.local` en la raíz del proyecto:

```bash
# Credenciales de Primary API Hub
PRIMARY_USERNAME=tu_usuario_real
PRIMARY_PASSWORD=tu_password_real
PRIMARY_ACCOUNT=tu_cuenta_real

# Configuración
PRIMARY_API_URL=https://api.primary.com.ar
PRIMARY_CACHE_TTL=300
PRIMARY_DEV_MODE=false
PRIMARY_SANDBOX_MODE=false
```

### 3. **Instalar Dependencias**
```bash
npm install
```

### 4. **Ejecutar la Aplicación**
```bash
npm run dev
```

### 5. **Verificar Conexión**
- Abrir: http://localhost:3000
- Ir a la sección "Mercado Agro"
- Click en "Ver Reales"
- Debería mostrar datos reales de MATBA-ROFEX

## 🔍 Verificación de Funcionamiento

### ✅ Indicadores de Éxito:
- **Badge verde**: "📡 Datos Reales MATBA-ROFEX"
- **Datos actualizados**: Precios reales de Primary API
- **Sin errores**: En la consola del navegador

### ❌ Indicadores de Error:
- **Badge azul**: "🎯 Datos Simulados" (fallback)
- **Mensaje**: "Error obteniendo datos agrícolas"
- **Console errors**: Problemas de autenticación

## 🛠️ Troubleshooting

### Error: "Credenciales no configuradas"
- Verificar archivo `.env.local` existe
- Verificar variables están correctas
- Reiniciar aplicación

### Error: "Error de autenticación"
- Verificar username/password
- Contactar Primary para verificar credenciales
- Verificar conectividad a internet

### Error: "No se obtuvieron datos"
- Verificar que Primary API esté funcionando
- Verificar símbolos de instrumentos
- Revisar logs de consola

## 📞 Contactos de Soporte

### Primary API Support:
- **Email**: remarkets@primary.com.ar
- **Documentación**: https://apihub.primary.com.ar/
- **reMarkets**: https://remarkets.primary.ventures/

### Para Problemas Técnicos:
- **GitHub**: https://github.com/matbarofex
- **Postman Collections**: Disponibles en documentación

## 🎯 Estado Actual del Proyecto

### ✅ Implementado:
- ✅ Servicio Primary API completo
- ✅ Manejo de errores y fallback
- ✅ Interfaz para alternar datos reales/simulados
- ✅ Filtrado por productos específicos
- ✅ Diseño responsive con cards

### 🔄 Pendiente:
- ⏳ Configurar credenciales reales
- ⏳ Probar conexión con Primary API
- ⏳ Optimizar cache y performance

## 📊 Datos Disponibles

### Con API Real (MATBA-ROFEX):
- **DO**: Trigo (USD)
- **DOA**: Trigo (ARS)
- **MA**: Maíz (USD)
- **MAA**: Maíz (ARS)
- **SO**: Soja (USD)
- **SOA**: Soja (ARS)
- **GF**: Girasol (USD)
- **GFA**: Girasol (ARS)

### Con Datos Simulados:
- 12 instrumentos con precios realistas
- Variaciones calculadas
- Sparklines históricos
- Timestamps actualizados

---

**Próximo paso**: Obtener credenciales de Primary API y configurar `.env.local`




