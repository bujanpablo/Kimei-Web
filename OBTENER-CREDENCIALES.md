# 📧 Cómo Obtener Credenciales MATBA-ROFEX

## 🎯 Contacto Directo

**Email oficial:** `mpi@primary.com.ar`

## 📝 Template de Email

Copia y pega este email, personalizándolo con tu información:

```
Asunto: Solicitud de credenciales API para proyecto web Kimei Cereales

Estimados,

Soy [TU NOMBRE] de Kimei Cereales S.A. Estamos desarrollando una plataforma web para mostrar precios de commodities agrícolas en tiempo real y necesitamos acceso a la API de MATBA-ROFEX.

**Detalles del proyecto:**
- Empresa: Kimei Cereales S.A.
- Proyecto: Sitio web corporativo
- Propósito: Mostrar precios de futuros agrícolas (trigo, maíz, soja, girasol)
- Tipo de acceso: Solo lectura de datos de mercado (Market Data)
- Entorno: Producción

**Información solicitada:**
- Credenciales de acceso (username, password, account)
- Documentación técnica de la API
- Información sobre costos y licencias
- Proceso de activación

**Datos de contacto:**
- Nombre: [TU NOMBRE]
- Email: [TU EMAIL]
- Teléfono: [TU TELÉFONO]
- Empresa: Kimei Cereales S.A.

Muchas gracias por su atención. Esperamos su respuesta.

Saludos cordiales,
[TU NOMBRE]
```

## 🔄 Alternativas

### 1. Entorno de Pruebas (reMarkets)
- **URL:** https://remarkets.primary.com.ar/
- **Propósito:** Testing y desarrollo
- **Ventaja:** Gratuito para pruebas

### 2. Contacto Telefónico
- **Primary Argentina**
- Buscar número en su sitio web oficial

## ⚙️ Configuración Una Vez Obtenidas las Credenciales

1. **Crear archivo `.env.local`:**
```bash
cp env.example .env.local
```

2. **Editar `.env.local` con tus credenciales:**
```env
ROFEX_USERNAME=tu_usuario_real
ROFEX_PASSWORD=tu_password_real
ROFEX_ACCOUNT=tu_cuenta_real
ROFEX_API_URL=https://api.primary.com.ar
ROFEX_CACHE_TTL=300
ROFEX_DEV_MODE=false
```

3. **Reiniciar el servidor:**
```bash
npm run dev
```

4. **Probar conexión:**
- Ir a la sección "Mercado Agro"
- Click en "Usar Reales"
- Verificar que aparezca "📡 Datos Reales"

## 🚨 Estado Actual

**El sistema está configurado para:**
- ✅ Funcionar con datos simulados (por defecto)
- ✅ Cambiar automáticamente a datos reales cuando tengas credenciales
- ✅ Mostrar fallback si falla la conexión real
- ✅ Indicar claramente la fuente de datos

## 📞 Próximos Pasos

1. **Enviar email** a `mpi@primary.com.ar`
2. **Esperar respuesta** (generalmente 1-3 días hábiles)
3. **Configurar credenciales** cuando las recibas
4. **Probar conexión** real

## 💡 Tips

- **Sé específico** sobre el tipo de datos que necesitas
- **Menciona que es solo lectura** (Market Data)
- **Incluye información de la empresa** (Kimei Cereales)
- **Pregunta sobre costos** si es relevante para tu presupuesto





