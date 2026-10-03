# LUPA - Arquitectura Técnica y Especificación de Diseño

**Versión:** 1.0  
**Fecha:** Junio 2026  
**Autor:** Manus AI

---

## 1. Visión General

LUPA es un asistente visual que funciona como una capa de realidad aumentada sobre sistemas operativos y entornos de desarrollo. Su propósito es traducir conceptos técnicos complejos a explicaciones visuales y accesibles en tiempo real, empoderando a principiantes en programación a transitar desde interfaces gráficas (iconos, doble click) hacia interfaces de línea de comandos y código.

### Analogía de Referencia

LUPA opera de manera similar a **Google Translate en vivo para fotos**: cuando el usuario señala un elemento en pantalla, LUPA automáticamente captura, analiza y proporciona una traducción contextual de qué es ese elemento, qué hace, y cómo se relaciona con conceptos más amplios.

### Diferenciadores Clave

| Aspecto           | LUPA                                         | Herramientas Existentes                |
| ----------------- | -------------------------------------------- | -------------------------------------- |
| **Invisibilidad** | Capa flotante sobre contenido existente      | Ventanas separadas o paneles laterales |
| **Contexto**      | Explica el "qué", "por qué" y "cómo"         | Solo traducción literal                |
| **Aprendizaje**   | Guía progresiva con confirmación del usuario | Información pasiva                     |
| **Plataformas**   | Windows, macOS, Web, Android, Termux         | Generalmente una sola plataforma       |
| **Minimalismo**   | UI casi invisible, información bajo demanda  | UI visible permanentemente             |

---

## 2. Filosofía de Diseño: Glassmorphism Minimalista

### Principios Fundamentales

LUPA adopta un enfoque de **glassmorphism minimalista** que comunica su naturaleza como una capa transparente sobre el sistema operativo. Esta filosofía se basa en tres pilares:

1. **Transparencia Estratégica:** Los overlays utilizan fondos translúcidos con efecto de vidrio esmerilado (frosted glass), permitiendo que el usuario vea el contenido subyacente mientras recibe explicaciones contextuales.

2. **Espaciado Generoso:** Amplio uso de whitespace reduce la ansiedad cognitiva, especialmente importante para principiantes que pueden sentirse abrumados por la complejidad técnica.

3. **Gradientes Sutiles:** Cambios de color muy suaves guían la atención sin distraer, creando una experiencia calmante y profesional.

### Paleta de Colores (OKLCH)

```
Fondo Primario:       oklch(0.95 0.001 0)      // Gris claro, casi blanco
Fondo Secundario:     oklch(1 0 0)             // Blanco puro
Glassmorphism:        rgba(255, 255, 255, 0.8) con blur(10px)
Acento Azul:          oklch(0.6 0.15 260)      // Azul suave para acciones
Acento Verde:         oklch(0.7 0.12 150)      // Verde menta para éxito
Texto Primario:       oklch(0.3 0.01 65)       // Gris oscuro, máximo contraste
Texto Secundario:     oklch(0.5 0.01 65)       // Gris medio
Borde Sutil:          oklch(0.9 0.002 0)       // Casi imperceptible
```

### Sistema Tipográfico

| Uso           | Fuente          | Peso | Tamaño  | Propósito                   |
| ------------- | --------------- | ---- | ------- | --------------------------- |
| **Títulos**   | Outfit Bold     | 700  | 28-32px | Encabezados de overlays     |
| **Cuerpo**    | Outfit Regular  | 400  | 15px    | Texto explicativo principal |
| **Etiquetas** | Outfit SemiBold | 600  | 13px    | Identificadores y tags      |
| **Código**    | IBM Plex Mono   | 400  | 12px    | Ejemplos de código          |

### Espaciado y Dimensiones

- **Grid Base:** 8px
- **Padding Estándar:** 16px (componentes), 24px (secciones), 32px (contenedores principales)
- **Margin Estándar:** 8px (elementos cercanos), 16px (elementos relacionados), 24px (secciones)
- **Border Radius:** 12px (componentes secundarios), 16px (elementos principales)
- **Sombra Suave:** `0 8px 32px rgba(0, 0, 0, 0.1)`

### Animaciones

| Acción      | Duración | Easing   | Propósito                   |
| ----------- | -------- | -------- | --------------------------- |
| **Entrada** | 200ms    | ease-out | Aparición suave de overlays |
| **Salida**  | 150ms    | ease-out | Desvanecimiento natural     |
| **Hover**   | 150ms    | ease-out | Respuesta a interacción     |
| **Click**   | 100ms    | ease-out | Confirmación inmediata      |

**Easing Personalizado:**

- `ease-out: cubic-bezier(0.23, 1, 0.32, 1)` - Para entradas/salidas
- `ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)` - Para movimientos suaves

---

## 3. Arquitectura de Componentes

### 3.1 Componentes Principales

#### LupaOverlay (Contenedor Base)

El componente raíz que gestiona la visualización flotante de información. Características:

- **Posicionamiento:** Flotante, anclado a elementos específicos de la pantalla
- **Backdrop Filter:** `blur(10px)` para efecto glassmorphism
- **Opacidad:** 80% por defecto, 90% en hover
- **Z-index:** 9999 (siempre encima del contenido)
- **Responsividad:** Se reposiciona automáticamente si se acerca a bordes

```tsx
<LupaOverlay
  targetElement={element}
  position="top-right"
  content={explanation}
  onClose={handleClose}
/>
```

#### TranslationCard (Tarjeta de Explicación)

Componente que contiene la traducción de un concepto técnico. Estructura:

- **Encabezado:** Título del concepto (ej: "Terminal de Windows")
- **Icono:** Representación visual del concepto
- **Explicación:** Párrafo corto (2-3 líneas máximo)
- **Ejemplo:** Código o acción equivalente
- **Botones de Acción:** "Entendido", "Mostrar más", "Copiar"

#### ContextualTooltip (Tooltip Contextual)

Información adicional que aparece al pasar el mouse sobre elementos específicos:

- **Trigger:** Hover sobre palabra clave o elemento
- **Contenido:** Definición breve (1-2 líneas)
- **Duración:** Aparece después de 300ms, desaparece después de 5s o al salir

#### CodeExample (Bloque de Código)

Muestra ejemplos de código con sintaxis resaltada:

- **Lenguaje:** Detectado automáticamente (Python, PowerShell, HTML, etc.)
- **Copiar:** Botón para copiar al portapapeles
- **Explicación Línea por Línea:** Hover sobre líneas muestra explicación

#### ProgressIndicator (Indicador de Progreso)

Muestra el progreso del usuario en el aprendizaje de un concepto:

- **Pasos:** Visual de pasos completados
- **Porcentaje:** Progreso en porcentaje
- **Siguiente:** Sugerencia del siguiente paso

### 3.2 Estructura de Carpetas

```
client/src/
├── components/
│   ├── lupa/
│   │   ├── LupaOverlay.tsx          // Contenedor principal
│   │   ├── TranslationCard.tsx      // Tarjeta de explicación
│   │   ├── ContextualTooltip.tsx    // Tooltip contextual
│   │   ├── CodeExample.tsx          // Bloque de código
│   │   ├── ProgressIndicator.tsx    // Indicador de progreso
│   │   └── LupaPanel.tsx            // Panel de configuración
│   ├── ui/                          // Componentes shadcn/ui
│   └── ...
├── hooks/
│   ├── useLupaDetection.ts          // Detecta elementos en pantalla
│   ├── useTranslation.ts            // Gestiona traducciones
│   └── useProgress.ts               // Rastrea progreso del usuario
├── lib/
│   ├── translationEngine.ts         // Lógica de traducción
│   ├── conceptMap.ts                // Mapa de conceptos
│   └── platformDetector.ts          // Detecta SO/plataforma
├── pages/
│   ├── Home.tsx                     // Página principal
│   ├── Demo.tsx                     // Demostración interactiva
│   └── Settings.tsx                 // Configuración
└── contexts/
    └── LupaContext.tsx              // Estado global de LUPA
```

---

## 4. Flujos de Datos y Lógica

### 4.1 Flujo Principal de Traducción

```
Usuario señala elemento
    ↓
Detector de elementos identifica tipo
    ↓
Motor de traducción busca en mapa de conceptos
    ↓
Generador de explicación crea contenido contextual
    ↓
Overlay flotante aparece con animación
    ↓
Usuario interactúa (lee, copia, confirma)
    ↓
Sistema registra comprensión
    ↓
Progreso se actualiza
```

### 4.2 Motor de Traducción

El motor de traducción funciona en capas:

| Capa                  | Responsabilidad                              | Ejemplo                                  |
| --------------------- | -------------------------------------------- | ---------------------------------------- |
| **Detección**         | Identifica qué elemento está siendo señalado | "Esto es un icono de carpeta en Windows" |
| **Clasificación**     | Categoriza el elemento en un concepto        | "Concepto: Sistema de Archivos"          |
| **Búsqueda**          | Encuentra traducción en mapa de conceptos    | Busca en base de datos de conceptos      |
| **Contextualización** | Adapta explicación al nivel del usuario      | Principiante vs. Intermedio              |
| **Generación**        | Crea explicación con ejemplos                | Texto + código + visual                  |

### 4.3 Mapa de Conceptos

Estructura de datos que mapea elementos visuales a conceptos técnicos:

```typescript
interface ConceptMap {
  [key: string]: {
    name: string;
    description: string;
    equivalents: {
      windows?: string;
      macos?: string;
      linux?: string;
      web?: string;
    };
    examples: {
      icon?: string;
      code: string[];
      action: string;
    };
    relatedConcepts: string[];
    difficulty: "beginner" | "intermediate" | "advanced";
  };
}
```

Ejemplo de entrada:

```typescript
"folder_icon": {
  name: "Carpeta (Directorio)",
  description: "Contenedor que almacena archivos y otras carpetas",
  equivalents: {
    windows: "Carpeta en Explorador de Archivos",
    macos: "Carpeta en Finder",
    linux: "Directorio en terminal",
    web: "Carpeta en navegador de archivos"
  },
  examples: {
    code: [
      "mkdir mi_carpeta  # Crear carpeta en terminal",
      "os.mkdir('mi_carpeta')  # Python"
    ],
    action: "Doble click para abrir"
  },
  relatedConcepts: ["file", "path", "directory_structure"],
  difficulty: "beginner"
}
```

---

## 5. Especificaciones de Interfaz

### 5.1 Página Principal (Home)

**Propósito:** Introducción a LUPA y acceso a funcionalidades principales.

**Secciones:**

- **Hero:** Título, subtítulo y CTA principal ("Comenzar Demostración")
- **Características:** 3-4 tarjetas con beneficios clave
- **Demostración Interactiva:** Simulación de cómo funciona LUPA
- **Plataformas Soportadas:** Iconos de Windows, macOS, Web, Android
- **Llamada a Acción:** Botón para descargar o acceder a versión web

### 5.2 Página de Demostración (Demo)

**Propósito:** Experiencia interactiva donde el usuario puede probar LUPA.

**Elementos:**

- **Pantalla Simulada:** Muestra de terminal, explorador de archivos o editor de código
- **Overlay Interactivo:** Usuario puede hacer click en elementos para ver explicaciones
- **Panel de Control:** Selector de plataforma, nivel de dificultad, lenguaje
- **Historial:** Conceptos vistos recientemente
- **Progreso:** Barra de progreso de aprendizaje

### 5.3 Panel de Configuración (Settings)

**Propósito:** Personalización de la experiencia LUPA.

**Opciones:**

- **Nivel de Dificultad:** Principiante, Intermedio, Avanzado
- **Plataforma Predeterminada:** Windows, macOS, Linux, Web
- **Lenguajes de Programación:** Seleccionar cuáles mostrar
- **Idioma de Interfaz:** Español, Inglés, etc.
- **Temas:** Claro, Oscuro (futuro)
- **Notificaciones:** Activar/desactivar sugerencias

---

## 6. Flujos de Usuario

### 6.1 Flujo: Principiante Explora Terminal

```
1. Usuario abre página de demostración
2. Selecciona "Windows PowerShell" como plataforma
3. Ve simulación de terminal con comandos
4. Hace click en comando "dir"
5. LUPA muestra overlay:
   - Título: "Comando: dir"
   - Explicación: "Lista archivos y carpetas en la carpeta actual"
   - Equivalente GUI: "Como hacer doble click en Explorador de Archivos"
   - Ejemplo: "Muestra: nombre, tamaño, fecha de modificación"
6. Usuario hace click en "Entendido"
7. Progreso se actualiza
8. Sistema sugiere siguiente concepto: "cd" (cambiar directorio)
```

### 6.2 Flujo: Aprendiz Descubre Código

```
1. Usuario está en página de demostración
2. Selecciona "Python" como lenguaje
3. Ve bloque de código con función
4. Hace hover sobre palabra "def"
5. Tooltip aparece: "Palabra clave para definir una función"
6. Hace click en línea completa
7. LUPA muestra overlay con explicación línea por línea
8. Usuario puede copiar código
9. Sistema registra que entiende funciones
```

---

## 7. Consideraciones Técnicas de Implementación

### 7.1 Detección de Elementos (Futuro: Overlay Real)

Para versiones futuras que funcionen como overlay de escritorio:

- **Windows:** Usar Windows API (GetWindowText, GetClassName) para capturar elementos
- **macOS:** Usar Accessibility API de macOS
- **Linux:** Usar X11 o Wayland APIs
- **Web:** Usar Event Listeners y DOM APIs

### 7.2 OCR y Reconocimiento (Futuro)

Para traducir texto en imágenes o pantallas:

- **Tesseract.js:** OCR en navegador
- **Google Vision API:** OCR en servidor
- **EasyOCR:** Para caracteres asiáticos

### 7.3 Almacenamiento Local

- **LocalStorage:** Guardar preferencias de usuario
- **IndexedDB:** Guardar historial de conceptos vistos
- **Service Worker:** Permitir funcionamiento offline

---

## 8. Hoja de Ruta de Desarrollo

### Fase 1: Prototipo Web (Actual)

- Página principal con presentación de LUPA
- Página de demostración con simulación interactiva
- Panel de configuración básico
- Mapa de conceptos inicial (50-100 conceptos)

### Fase 2: Expansión de Contenido

- Ampliar mapa de conceptos a 500+ conceptos
- Agregar más lenguajes de programación
- Implementar sistema de progreso persistente
- Agregar cuestionarios de verificación

### Fase 3: Overlay de Escritorio

- Aplicación de escritorio para Windows (Electron)
- Integración con PowerShell y CMD
- Captura de pantalla en tiempo real
- Detección automática de elementos

### Fase 4: Plataformas Adicionales

- Aplicación macOS nativa
- Aplicación Linux
- Integración con Termux en Android
- Extensión de navegador

### Fase 5: Características Avanzadas

- Modo colaborativo (compartir explicaciones)
- Integración con IDEs (VS Code, PyCharm)
- Análisis de código en tiempo real
- Sugerencias de aprendizaje personalizadas

---

## 9. Métricas de Éxito

| Métrica                     | Objetivo                                           | Método de Medición                  |
| --------------------------- | -------------------------------------------------- | ----------------------------------- |
| **Tiempo de Comprensión**   | Reducir en 50% el tiempo para entender un concepto | Analytics en página de demostración |
| **Retención de Usuario**    | 60% de usuarios vuelven en 7 días                  | Cookies y sesiones                  |
| **Satisfacción**            | 4.5+ estrellas en reseñas                          | Encuestas en app                    |
| **Conceptos Aprendidos**    | Promedio 10+ conceptos por sesión                  | Tracker de progreso                 |
| **Adopción de Plataformas** | 70% de usuarios prueban 2+ plataformas             | Analytics                           |

---

## 10. Referencias Técnicas

Este documento se basa en investigación de proyectos similares de traducción en tiempo real, incluyendo RSTGameTranslation, OCR-Translator, y análisis de interfaces HUD modernas para desarrollo de software.

**Inspiraciones:**

- Google Translate en vivo (interfaz invisible)
- Interfaces HUD para desarrollo ágil (Hyperdev)
- Traducción de pantalla en tiempo real (OCR-Translator)
- Diseño glassmorphism (Apple, Microsoft Fluent Design)
