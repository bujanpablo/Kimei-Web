# 📸 Instrucciones para Reemplazar Imágenes

## 🎯 **Cómo Agregar el Logo de Kimei**

### **Paso 1: Preparar el Logo**
1. **Busca tu logo** de Kimei en formato PNG o SVG
2. **Si es muy grande**, redimensiona a aproximadamente **200x80 píxeles**
3. **Si tiene fondo blanco**, hazlo transparente (PNG con transparencia)

### **Paso 2: Colocar el Logo**
1. **Copia tu logo** y pégalo en la carpeta:
   ```
   C:\Users\bujan\Desktop\Kimei Web\public\images\logos\
   ```
2. **Renómbralo** como: `logo-kimei-full.png`
3. **Si no existe la carpeta**, créala

### **Paso 3: Verificar**
1. **Abre** `preview.html` en tu navegador
2. **Deberías ver** tu logo real en lugar del placeholder con la "K"

---

## 🖼️ **Estructura de Carpetas para Imágenes**

```
public/
├── images/
│   ├── logos/
│   │   ├── logo-kimei-full.png     ← TU LOGO AQUÍ
│   │   ├── logo-kimei-symbol.png   ← Logo solo símbolo
│   │   └── logo-kimei-white.png    ← Logo en blanco
│   ├── hero/
│   │   └── hero-wheat-field.jpg    ← Imagen de campo de trigo
│   ├── gallery/
│   │   └── (fotos de la empresa)
│   └── icons/
│       └── (íconos personalizados)
```

---

## 🌾 **Cómo Agregar la Imagen del Campo de Trigo**

### **Paso 1: Conseguir la Imagen**
- **Busca** una foto de campo de trigo dorado
- **Dimensiones recomendadas**: 1920x1080 píxeles
- **Formato**: JPG de alta calidad

### **Paso 2: Colocar la Imagen**
1. **Guarda** la imagen como: `hero-wheat-field.jpg`
2. **Colócala** en: `public/images/hero/`
3. **Crea la carpeta** si no existe

### **Paso 3: Actualizar el Código**
El código ya está preparado para usar la imagen real automáticamente.

---

## 🚀 **Formas de Probar los Cambios**

### **Opción 1: Preview HTML (Más Fácil)**
1. **Modifica** las imágenes en la carpeta `public/images/`
2. **Abre** `preview.html` en tu navegador
3. **Recarga** la página para ver los cambios

### **Opción 2: Servidor de Desarrollo (Completo)**
```bash
npm install
npm run dev
```

---

## 📝 **Checklist de Imágenes**

- [ ] **Logo principal** (`logo-kimei-full.png`) en header
- [ ] **Imagen hero** (`hero-wheat-field.jpg`) en sección principal
- [ ] **Favicon** (`favicon.ico`) para la pestaña del navegador
- [ ] **Fotos de la empresa** para la sección "Kimei"
- [ ] **Imágenes de productos** para la sección "Mercados"

---

## 🎨 **Consejos para las Imágenes**

### **Logo:**
- ✅ **Fondo transparente** (PNG)
- ✅ **Alta resolución** (mínimo 200px de ancho)
- ✅ **Colores corporativos** de Kimei
- ✅ **Legible** en tamaño pequeño

### **Imagen Hero:**
- ✅ **Campo de trigo** dorado
- ✅ **Cielo azul** o atardecer
- ✅ **Buena iluminación**
- ✅ **Formato horizontal** (16:9)
- ✅ **Alta calidad** pero optimizada para web

### **Optimización:**
- **Comprime** las imágenes para que carguen rápido
- **Usa** herramientas como TinyPNG o similar
- **Mantén** archivos menores a 500KB

---

## 🔧 **Si Algo No Funciona**

1. **Verifica** que el archivo esté en la carpeta correcta
2. **Comprueba** que el nombre del archivo sea exacto
3. **Recarga** el navegador (Ctrl+F5)
4. **Revisa** la consola del navegador (F12) por errores

¿Necesitas ayuda con algún paso específico? ¡Estoy aquí para ayudarte! 🚀



