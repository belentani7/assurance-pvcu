# Hallazgos de auditoría visual

La página de inicio carga correctamente en la URL de preview y muestra el encabezado, el hero, las llamadas a la acción y el contenido principal. La ruta `/demo` aparece enlazada desde los botones de navegación.

El selector de idioma es visible como botón desplegable con bandera y nombre. El interruptor de tema responde al clic: el hint cambia de `Switch to dark mode` a `Switch to light mode`, y la vista cambia al tema oscuro. En la captura, el tema oscuro presenta un contraste visual muy bajo en varias zonas del contenido; debe revisarse porque el texto claro aparece sobre una superficie que sigue viéndose casi blanca en parte del hero. Este es un defecto de estabilidad visual que debe corregirse antes de declarar la web lista.

El build y TypeScript pasan, pero el build aún informa un warning de tamaño de chunk JavaScript superior a 500 kB. No bloquea la compilación, pero queda registrado como mejora de rendimiento.

La recarga en modo oscuro muestra ahora un fondo oscuro real, texto claro y tarjetas oscuras con bordes visibles. El contraste del hero y las secciones principales quedó corregido.

El menú de idioma se abre correctamente y muestra Español, Català, Português e English. Queda pendiente probar el cambio real de idioma en la Demo y comprobar la navegación de esa ruta.

La prueba de navegación descubrió un fallo crítico: desde Home, el enlace `/demo` abre la página 404. El componente Demo existe en `client/src/pages/Demo.tsx`, pero no está conectado a una ruta válida en `App.tsx` o la configuración de rutas no coincide. Debe corregirse antes de continuar.

El cambio de idioma a Català sí actualizó correctamente el título, el texto del hero y el selector de idioma.

Después de conectar la ruta, `/demo` carga correctamente. La Demo muestra los bloques de Python, el selector de idioma, el tema oscuro y la explicación lateral. Al pulsar `Variable`, aparece una explicación en lenguaje sencillo, un ejemplo y el nivel Principiante.

## Segunda pasada visual — 2026-08-21

La Home carga en preview sin error y muestra la navegación, el selector de idioma, el enlace a `/demo`, el hero y el contenido principal. El interruptor cambia de modo oscuro a modo claro: el botón cambia su indicación y el contraste de la interfaz se mantiene legible. El preview muestra una franja informativa propia del entorno de preview en la parte inferior; no pertenece a LUPA publicada.

## Segunda pasada de Demo — 2026-08-21

`/demo` carga correctamente y muestra cinco ejemplos de Python, etiquetas de conceptos y el panel de explicación vacío antes de seleccionar un concepto. El menú desplegable de idiomas abre correctamente y muestra Español, Català, Português e English. No se observó un error de navegación.

## Demo en Català — 2026-08-21

El cambio a Català actualiza el encabezado, el botón de volver, la sección de código, el texto de ayuda y la explicación seleccionada. Al pulsar `Variable`, aparece una explicación sencilla en catalán, un ejemplo de código y la dificultad `Principiant`. Las etiquetas de algunos ejemplos siguen mostrando términos del mapa que no están completamente traducidos (por ejemplo, `Número Entero` y `Parámetro`); no impide la interacción, pero queda registrado como mejora de cobertura lingüística.

## Corrección de etiquetas multilingües — 2026-08-21

Tras ampliar `conceptMapMultilang.ts`, la Demo en Català ya muestra `Text`, `Nombre enter`, `Dada que entregues` y `Resultat que torna` en lugar de etiquetas españolas. El menú mantiene las cuatro opciones. La explicación seleccionada conserva el idioma activo.

## Demo en Português — 2026-08-21

Português actualiza la navegación y el contenido de la Demo. Las etiquetas aparecen como `Texto`, `Número inteiro`, `Dado que entregas` y `Resultado que volta`. Al seleccionar `Texto`, el panel muestra una explicación sencilla en portugués, ejemplo y dificultad `Iniciante`.
