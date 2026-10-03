export interface Concept {
  id: string;
  name: string;
  description: string;
  example?: string;
  language?: string;
  relatedConcepts: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
}

export const conceptMap: Record<string, Concept> = {
  /* ===== CONCEPTOS BÁSICOS ===== */

  variable: {
    id: "variable",
    name: "Variable",
    description:
      'Es como un apodo o etiqueta que le das a algo. Si quieres recordar el nombre de tu amigo, en lugar de escribir "Juan" cada vez, le das un apodo y lo usas. El ordenador hace lo mismo: le pones un nombre a algo para poder usarlo después.',
    example: 'nombre = "Juan"\nedad = 25\ntemperatura = 37.5',
    language: "python",
    relatedConcepts: ["data_type", "assignment"],
    difficulty: "beginner",
    category: "Fundamentos",
  },

  data_type: {
    id: "data_type",
    name: "Tipo de Dato",
    description:
      "Es como decir qué tipo de cosa estás guardando. Si guardas un nombre, es texto. Si guardas cuántos años tienes, es un número. Si guardas si algo es verdadero o falso, es una respuesta de sí o no. El ordenador necesita saber qué tipo de cosa es para tratarla correctamente.",
    example:
      'nombre = "Ana"        # texto (como escribir en un papel)\nedad = 30              # número entero (como contar)\naltura = 1.75          # número con decimales (como medir)\nes_estudiante = True   # verdadero o falso (sí o no)',
    language: "python",
    relatedConcepts: ["variable", "string", "integer"],
    difficulty: "beginner",
    category: "Fundamentos",
  },

  string: {
    id: "string",
    name: "Texto",
    description:
      "Es cualquier cosa que escribes con letras. Como cuando escribes un mensaje en WhatsApp. El ordenador lo guarda exactamente como lo escribiste, letra por letra.",
    example:
      'mensaje = "Hola, mundo"\npalabra = \'Python\'\nfrase = "El código es arte"',
    language: "python",
    relatedConcepts: ["data_type", "variable"],
    difficulty: "beginner",
    category: "Tipos de Datos",
  },

  integer: {
    id: "integer",
    name: "Número Entero",
    description:
      "Es un número sin decimales. Como cuando cuentas: 1, 2, 3, 4. Puede ser positivo (más), negativo (menos) o cero.",
    example: "cantidad = 42\ntemperatura = -5\nresultado = 0\ndeuda = -1000",
    language: "python",
    relatedConcepts: ["data_type", "arithmetic"],
    difficulty: "beginner",
    category: "Tipos de Datos",
  },

  function: {
    id: "function",
    name: "Función",
    description:
      "Es como una máquina que hace algo específico. Tú le das cosas, ella las procesa y te devuelve el resultado. Por ejemplo, una máquina de refrescos: tú le das dinero, ella te da el refresco. Puedes usar la máquina muchas veces sin tener que construir una nueva cada vez.",
    example:
      'def saludar(nombre):\n    print("Hola, " + nombre)\n\nsaludar("María")\nsaludar("Carlos")',
    language: "python",
    relatedConcepts: ["parameter", "return", "call"],
    difficulty: "beginner",
    category: "Funciones",
  },

  parameter: {
    id: "parameter",
    name: "Parámetro",
    description:
      'Es lo que le das a una función para que trabaje. Como cuando pides un café en una cafetería: le dices "sin azúcar" o "con leche". Eso que le dices es el parámetro. La función usa esa información para hacer su trabajo.',
    example:
      "def multiplicar(a, b):  # a y b son parámetros\n    return a * b\n\nresultado = multiplicar(5, 3)  # 5 y 3 son lo que le pasas",
    language: "python",
    relatedConcepts: ["function", "argument"],
    difficulty: "beginner",
    category: "Funciones",
  },

  return: {
    id: "return",
    name: "Devolver Resultado",
    description:
      'Es lo que la función te da cuando termina. Como cuando vas a un restaurante, pides comida y te la traen. Lo que te traen es el "return". Es lo que la función te devuelve después de trabajar.',
    example:
      "def sumar(a, b):\n    resultado = a + b\n    return resultado  # Esto es lo que devuelves\n\ntotal = sumar(10, 5)  # total ahora es 15",
    language: "python",
    relatedConcepts: ["function", "output"],
    difficulty: "beginner",
    category: "Funciones",
  },

  loop: {
    id: "loop",
    name: "Repetir",
    description:
      'Es hacer lo mismo varias veces sin tener que escribirlo cada vez. Como cuando TikTok te muestra un video tras otro, sigue haciendo lo mismo: mostrar un video. En el código, le dices al ordenador "repite esto 5 veces" o "repite esto mientras sea verdadero".',
    example:
      "for i in range(5):\n    print(i)  # Imprime 0, 1, 2, 3, 4\n\nwhile contador < 10:\n    print(contador)\n    contador = contador + 1",
    language: "python",
    relatedConcepts: ["for_loop", "while_loop", "iteration"],
    difficulty: "beginner",
    category: "Control de Flujo",
  },

  conditional: {
    id: "conditional",
    name: "Si... Entonces",
    description:
      'Es tomar una decisión. Como cuando tu mamá dice: "Si terminas la tarea, puedes jugar. Si no, no puedes". El ordenador hace lo mismo: si algo es verdadero, hace una cosa; si es falso, hace otra.',
    example:
      'edad = 18\n\nif edad >= 18:\n    print("Eres mayor de edad")\nelse:\n    print("Eres menor de edad")',
    language: "python",
    relatedConcepts: ["boolean", "comparison"],
    difficulty: "beginner",
    category: "Control de Flujo",
  },

  list: {
    id: "list",
    name: "Lista",
    description:
      "Es como una lista de compras. Escribes varios cosas en una lista y luego puedes usarlas. El ordenador guarda varias cosas juntas y las ordena. Puedes pedirle la primera, la segunda, la tercera, etc.",
    example:
      'frutas = ["manzana", "plátano", "naranja"]\nnumeros = [1, 2, 3, 4, 5]\n\nprint(frutas[0])  # Imprime "manzana" (la primera)\nprint(numeros[2])  # Imprime 3 (la tercera)',
    language: "python",
    relatedConcepts: ["index", "iteration"],
    difficulty: "beginner",
    category: "Estructuras de Datos",
  },

  index: {
    id: "index",
    name: "Posición",
    description:
      'Es el número que le dices al ordenador para que te dé una cosa específica de una lista. Es como decir "dame el primero", "dame el segundo", etc. Pero cuidado: el ordenador empieza a contar desde 0, no desde 1.',
    example:
      'colores = ["rojo", "verde", "azul"]\nprint(colores[0])  # "rojo" (el primero, posición 0)\nprint(colores[1])  # "verde" (el segundo, posición 1)\nprint(colores[2])  # "azul" (el tercero, posición 2)',
    language: "python",
    relatedConcepts: ["list", "array"],
    difficulty: "beginner",
    category: "Estructuras de Datos",
  },

  /* ===== CONCEPTOS DE WINDOWS/TERMINAL ===== */

  directory: {
    id: "directory",
    name: "Carpeta",
    description:
      "Es como las carpetas que tienes en tu escritorio. Dentro puedes guardar archivos o más carpetas. En la terminal, en lugar de hacer doble clic, escribes comandos para entrar y salir de carpetas.",
    example:
      "mkdir mi_proyecto      # Crear una carpeta\ncd mi_proyecto         # Entrar en la carpeta\nls                     # Ver qué hay dentro",
    language: "bash",
    relatedConcepts: ["file", "path", "terminal"],
    difficulty: "beginner",
    category: "Sistema de Archivos",
  },

  file: {
    id: "file",
    name: "Archivo",
    description:
      "Es como un papel con información. Tiene un nombre y una extensión (como .txt, .py, .html). La extensión le dice al ordenador qué tipo de información tiene dentro.",
    example:
      "documento.txt          # Un archivo de texto\nscript.py              # Un archivo de código Python\nindice.html            # Un archivo de página web",
    language: "text",
    relatedConcepts: ["directory", "extension", "path"],
    difficulty: "beginner",
    category: "Sistema de Archivos",
  },

  path: {
    id: "path",
    name: "Ruta",
    description:
      "Es la dirección de dónde está un archivo. Como la dirección de tu casa: calle, número, ciudad. El ordenador necesita saber dónde buscar. Puede ser desde el inicio (ruta absoluta) o desde donde estás ahora (ruta relativa).",
    example:
      "C:\\Users\\Juan\\Documents\\proyecto.py    # Ruta absoluta (desde el inicio)\n/home/juan/documentos/proyecto.py        # Ruta absoluta (en Linux)\n./proyecto.py                            # Ruta relativa (en la carpeta actual)",
    language: "bash",
    relatedConcepts: ["directory", "file"],
    difficulty: "beginner",
    category: "Sistema de Archivos",
  },

  terminal: {
    id: "terminal",
    name: "Terminal (Línea de Comandos)",
    description:
      "Es como hablar con el ordenador escribiendo órdenes. En lugar de hacer clic en iconos, escribes lo que quieres que haga. Es más poderoso porque puedes hacer cosas más complicadas solo escribiendo.",
    example:
      "C:\\Users\\Juan> dir                    # Ver archivos\nC:\\Users\\Juan> cd Desktop             # Ir a Escritorio\nC:\\Users\\Juan\\Desktop> python script.py  # Ejecutar un programa",
    language: "powershell",
    relatedConcepts: ["command", "directory", "file"],
    difficulty: "beginner",
    category: "Terminal",
  },

  command: {
    id: "command",
    name: "Comando",
    description:
      'Es una orden que le das al ordenador escribiendo. Como cuando le dices a Alexa "pon música". Escribes el comando y el ordenador lo hace. Cada comando hace algo específico.',
    example:
      "dir                    # Ver qué hay en la carpeta\ncd Desktop             # Ir a la carpeta Escritorio\npython script.py       # Ejecutar un programa\nmkdir nueva_carpeta    # Crear una carpeta nueva",
    language: "powershell",
    relatedConcepts: ["terminal", "flag", "argument"],
    difficulty: "beginner",
    category: "Terminal",
  },

  /* ===== CONCEPTOS WEB ===== */

  html: {
    id: "html",
    name: "HTML (Estructura de Página Web)",
    description:
      'Es como el esqueleto de una página web. Le dice al navegador: "Aquí va un título", "Aquí va un párrafo", "Aquí va una imagen". Sin HTML, el navegador no sabe qué mostrar.',
    example:
      '<h1>Mi Primer Página</h1>\n<p>Este es un párrafo.</p>\n<img src="imagen.jpg" alt="Mi imagen">',
    language: "html",
    relatedConcepts: ["tag", "element", "css"],
    difficulty: "beginner",
    category: "Web",
  },

  tag: {
    id: "tag",
    name: "Etiqueta",
    description:
      'Es como una instrucción que le das al navegador. Es como decir "esto es importante" o "esto es una imagen". Las etiquetas usan < y > para que el navegador las entienda.',
    example:
      '<p>Este es un párrafo</p>\n<h1>Este es un título</h1>\n<img src="foto.jpg">\n<a href="https://google.com">Enlace</a>',
    language: "html",
    relatedConcepts: ["html", "element", "attribute"],
    difficulty: "beginner",
    category: "Web",
  },

  css: {
    id: "css",
    name: "CSS (Diseño y Colores)",
    description:
      "Es como la ropa y el maquillaje de una página web. HTML es el esqueleto, CSS es lo que lo hace verse bonito. Con CSS cambias colores, tamaños, posiciones, fuentes.",
    example:
      "p {\n  color: blue;\n  font-size: 16px;\n}\n\n.titulo {\n  background-color: yellow;\n  padding: 10px;\n}",
    language: "css",
    relatedConcepts: ["html", "selector", "property"],
    difficulty: "beginner",
    category: "Web",
  },

  javascript: {
    id: "javascript",
    name: "JavaScript (Interactividad)",
    description:
      "Es lo que hace que una página web sea interactiva. Es como darle vida a la página. Con JavaScript, puedes responder a clicks, cambiar cosas cuando el usuario hace algo, validar formularios.",
    example:
      'function saludar() {\n  alert("¡Hola!");\n}\n\nbutton.addEventListener("click", saludar);',
    language: "javascript",
    relatedConcepts: ["function", "event", "dom"],
    difficulty: "intermediate",
    category: "Web",
  },

  /* ===== CONCEPTOS INTERMEDIOS ===== */

  object: {
    id: "object",
    name: "Objeto",
    description:
      'Es como una mochila donde guardas varias cosas relacionadas. En lugar de tener muchas variables separadas, las juntas todas en una. Por ejemplo, en lugar de nombre, edad, ciudad separados, los juntas en una "persona".',
    example:
      'persona = {\n  "nombre": "Juan",\n  "edad": 30,\n  "ciudad": "Madrid"\n}\n\nprint(persona["nombre"])  # Imprime "Juan"',
    language: "python",
    relatedConcepts: ["dictionary", "property", "key"],
    difficulty: "intermediate",
    category: "Estructuras de Datos",
  },

  dictionary: {
    id: "dictionary",
    name: "Diccionario",
    description:
      'Es como un diccionario real: buscas una palabra y encuentras su significado. En el código, buscas una clave (como "nombre") y encuentras el valor (como "Juan"). Es muy útil para guardar información relacionada.',
    example:
      'estudiante = {\n  "nombre": "María",\n  "edad": 20,\n  "carrera": "Ingeniería"\n}\n\nprint(estudiante["nombre"])  # "María"',
    language: "python",
    relatedConcepts: ["object", "key", "value"],
    difficulty: "intermediate",
    category: "Estructuras de Datos",
  },

  api: {
    id: "api",
    name: "API (Conexión entre Programas)",
    description:
      "Es como un mesero en un restaurante. Tú le pides algo, él va a la cocina, trae lo que pediste. Una API es lo mismo: tú le pides información a otro programa, ella te la trae. Los programas hablan entre sí a través de APIs.",
    example:
      '# Pedir información a otro programa\nimport requests\n\nresponse = requests.get("https://api.ejemplo.com/usuarios")\ndatos = response.json()',
    language: "python",
    relatedConcepts: ["request", "json", "endpoint"],
    difficulty: "intermediate",
    category: "Programación Avanzada",
  },

  json: {
    id: "json",
    name: "JSON (Formato de Información)",
    description:
      "Es una forma estándar de escribir información para que los programas se entiendan. Es como un idioma universal entre programas. Usa llaves, comillas y dos puntos para organizar la información de forma clara.",
    example:
      '{\n  "nombre": "Juan",\n  "edad": 30,\n  "hobbies": ["lectura", "deportes"],\n  "activo": true\n}',
    language: "json",
    relatedConcepts: ["api", "data", "format"],
    difficulty: "intermediate",
    category: "Formatos de Datos",
  },
};

export function getConceptById(id: string): Concept | undefined {
  return conceptMap[id];
}

export function getConceptsByCategory(category: string): Concept[] {
  return Object.values(conceptMap).filter(
    concept => concept.category === category
  );
}

export function getConceptsByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): Concept[] {
  return Object.values(conceptMap).filter(
    concept => concept.difficulty === difficulty
  );
}

export function getAllCategories(): string[] {
  const categories = new Set(Object.values(conceptMap).map(c => c.category));
  return Array.from(categories).sort();
}
