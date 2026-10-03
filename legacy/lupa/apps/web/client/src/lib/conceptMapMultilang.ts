import { Language } from "@/contexts/LanguageContext";

export interface ConceptTranslation {
  name: string;
  description: string;
  example?: string;
}

export interface MultilingualConcept {
  id: string;
  language: Record<Language, ConceptTranslation>;
  language_code?: string;
  relatedConcepts: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
}

export const conceptMapMultilang: Record<string, MultilingualConcept> = {
  variable: {
    id: "variable",
    language: {
      es: {
        name: "Variable",
        description:
          'Es como un apodo o etiqueta que le das a algo. Si quieres recordar el nombre de tu amigo, en lugar de escribir "Juan" cada vez, le das un apodo y lo usas. El ordenador hace lo mismo: le pones un nombre a algo para poder usarlo después.',
        example: 'nombre = "Juan"\nedad = 25\ntemperatura = 37.5',
      },
      ca: {
        name: "Variable",
        description:
          "És com un sobrenom o etiqueta que li dones a alguna cosa. Si vols recordar el nom del teu amic, en lloc d'escriure \"Joan\" cada vegada, li poses un sobrenom i l'uses. L'ordinador fa el mateix: li poses un nom a alguna cosa per poder-la usar després.",
        example: 'nom = "Joan"\nedat = 25\ntemperatura = 37.5',
      },
      pt: {
        name: "Variável",
        description:
          'É como um apelido ou etiqueta que você dá a algo. Se quer lembrar do nome do seu amigo, em vez de escrever "João" toda vez, você dá um apelido e o usa. O computador faz o mesmo: você dá um nome a algo para poder usá-lo depois.',
        example: 'nome = "João"\nidade = 25\ntemperatura = 37.5',
      },
      en: {
        name: "Variable",
        description:
          "It's like a nickname or label you give to something. If you want to remember your friend's name, instead of writing \"John\" every time, you give it a nickname and use it. The computer does the same: you give a name to something so you can use it later.",
        example: 'name = "John"\nage = 25\ntemperature = 37.5',
      },
    },
    relatedConcepts: ["data_type", "assignment"],
    difficulty: "beginner",
    category: "Fundamentos",
  },

  function: {
    id: "function",
    language: {
      es: {
        name: "Función",
        description:
          "Es como una máquina que hace algo específico. Tú le das cosas, ella las procesa y te devuelve el resultado. Por ejemplo, una máquina de refrescos: tú le das dinero, ella te da el refresco. Puedes usar la máquina muchas veces sin tener que construir una nueva cada vez.",
        example:
          'def saludar(nombre):\n    print("Hola, " + nombre)\n\nsaludar("María")\nsaludar("Carlos")',
      },
      ca: {
        name: "Funció",
        description:
          "És com una màquina que fa alguna cosa específica. Tu li dones coses, ella les processa i te retorna el resultat. Per exemple, una màquina de refrescos: tu li dones diners, ella et dona el refresc. Pots usar la màquina moltes vegades sense haver de construir-ne una de nova cada vegada.",
        example:
          'def saludar(nom):\n    print("Hola, " + nom)\n\nsaludar("Maria")\nsaludar("Carles")',
      },
      pt: {
        name: "Função",
        description:
          "É como uma máquina que faz algo específico. Você dá coisas a ela, ela as processa e devolve o resultado. Por exemplo, uma máquina de refrigerantes: você dá dinheiro, ela dá o refrigerante. Você pode usar a máquina muitas vezes sem ter que construir uma nova cada vez.",
        example:
          'def saudar(nome):\n    print("Olá, " + nome)\n\nsaudar("Maria")\nsaudar("Carlos")',
      },
      en: {
        name: "Function",
        description:
          "It's like a machine that does something specific. You give it things, it processes them and returns the result. For example, a soda machine: you give it money, it gives you a soda. You can use the machine many times without having to build a new one each time.",
        example:
          'def greet(name):\n    print("Hello, " + name)\n\ngreet("Mary")\ngreet("Charles")',
      },
    },
    relatedConcepts: ["parameter", "return", "call"],
    difficulty: "beginner",
    category: "Funciones",
  },

  string: {
    id: "string",
    language: {
      es: {
        name: "Texto",
        description:
          "Es una frase o palabra escrita, como un mensaje de WhatsApp.",
        example: 'nombre = "Juan"',
      },
      ca: {
        name: "Text",
        description:
          "És una frase o una paraula escrita, com un missatge de WhatsApp.",
        example: 'nom = "Joan"',
      },
      pt: {
        name: "Texto",
        description:
          "É uma frase ou palavra escrita, como uma mensagem do WhatsApp.",
        example: 'nome = "João"',
      },
      en: {
        name: "Text",
        description:
          "It is a written word or sentence, like a WhatsApp message.",
        example: 'name = "John"',
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Fundamentos",
  },

  integer: {
    id: "integer",
    language: {
      es: {
        name: "Número entero",
        description:
          "Es un número sin decimales, como la edad de una persona o el número de mensajes.",
        example: "edad = 14",
      },
      ca: {
        name: "Nombre enter",
        description:
          "És un número sense decimals, com l'edat d'una persona o el nombre de missatges.",
        example: "edat = 14",
      },
      pt: {
        name: "Número inteiro",
        description:
          "É um número sem casas decimais, como a idade de uma pessoa ou o número de mensagens.",
        example: "idade = 14",
      },
      en: {
        name: "Whole number",
        description:
          "It is a number without decimals, like a person's age or the number of messages.",
        example: "age = 14",
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Fundamentos",
  },

  parameter: {
    id: "parameter",
    language: {
      es: {
        name: "Dato que entregas",
        description:
          "Es la información que le pasas a una acción para que sepa con qué trabajar, como escribir un nombre en un formulario.",
        example: 'saludar("María")',
      },
      ca: {
        name: "Dada que entregues",
        description:
          "És la informació que passes a una acció perquè sàpiga amb què treballar, com escriure un nom en un formulari.",
        example: 'saludar("Maria")',
      },
      pt: {
        name: "Dado que entregas",
        description:
          "É a informação que passas para uma ação saber com o que trabalhar, como escrever um nome num formulário.",
        example: 'saudar("Maria")',
      },
      en: {
        name: "Information you pass in",
        description:
          "It is information you give an action so it knows what to work with, like typing a name into a form.",
        example: 'greet("Mary")',
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Funciones",
  },

  return: {
    id: "return",
    language: {
      es: {
        name: "Resultado que vuelve",
        description:
          "Es lo que una acción te entrega cuando termina, como una máquina que te devuelve una bebida.",
        example: 'return "Hola"',
      },
      ca: {
        name: "Resultat que torna",
        description:
          "És el que una acció et lliura quan acaba, com una màquina que et torna una beguda.",
        example: 'return "Hola"',
      },
      pt: {
        name: "Resultado que volta",
        description:
          "É o que uma ação entrega quando termina, como uma máquina que devolve uma bebida.",
        example: 'return "Olá"',
      },
      en: {
        name: "Result that comes back",
        description:
          "It is what an action gives you when it finishes, like a machine giving you a drink.",
        example: 'return "Hello"',
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Funciones",
  },

  command: {
    id: "command",
    language: {
      es: {
        name: "Orden",
        description:
          "Es una frase corta que escribes para decirle al ordenador qué quieres que haga.",
        example: "dir",
      },
      ca: {
        name: "Ordre",
        description:
          "És una frase curta que escrius per dir-li a l'ordinador què vols que faci.",
        example: "dir",
      },
      pt: {
        name: "Comando",
        description:
          "É uma frase curta que escreves para dizer ao computador o que queres que faça.",
        example: "dir",
      },
      en: {
        name: "Command",
        description:
          "It is a short instruction you type to tell the computer what to do.",
        example: "dir",
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Terminal",
  },

  directory: {
    id: "directory",
    language: {
      es: {
        name: "Carpeta",
        description:
          "Es un lugar donde el ordenador guarda archivos juntos, como una carpeta de fotos.",
        example: "cd Desktop",
      },
      ca: {
        name: "Carpeta",
        description:
          "És un lloc on l'ordinador guarda fitxers junts, com una carpeta de fotos.",
        example: "cd Desktop",
      },
      pt: {
        name: "Pasta",
        description:
          "É um lugar onde o computador guarda ficheiros juntos, como uma pasta de fotografias.",
        example: "cd Desktop",
      },
      en: {
        name: "Folder",
        description:
          "It is a place where the computer keeps files together, like a photo folder.",
        example: "cd Desktop",
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Terminal",
  },

  path: {
    id: "path",
    language: {
      es: {
        name: "Camino",
        description:
          "Es la dirección que indica dónde está una carpeta o un archivo.",
        example: "Desktop/proyecto",
      },
      ca: {
        name: "Camí",
        description: "És l'adreça que indica on és una carpeta o un fitxer.",
        example: "Desktop/projecte",
      },
      pt: {
        name: "Caminho",
        description:
          "É o endereço que indica onde está uma pasta ou um ficheiro.",
        example: "Desktop/projeto",
      },
      en: {
        name: "Path",
        description: "It is the address that shows where a folder or file is.",
        example: "Desktop/project",
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Terminal",
  },

  file: {
    id: "file",
    language: {
      es: {
        name: "Archivo",
        description:
          "Es un documento guardado en el ordenador, como una foto, una canción o un texto.",
        example: "script.py",
      },
      ca: {
        name: "Fitxer",
        description:
          "És un document guardat a l'ordinador, com una foto, una cançó o un text.",
        example: "script.py",
      },
      pt: {
        name: "Ficheiro",
        description:
          "É um documento guardado no computador, como uma fotografia, uma música ou um texto.",
        example: "script.py",
      },
      en: {
        name: "File",
        description:
          "It is a document saved on the computer, like a photo, song, or text.",
        example: "script.py",
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Terminal",
  },

  tag: {
    id: "tag",
    language: {
      es: {
        name: "Etiqueta HTML",
        description:
          "Es una marca que dice al navegador qué es una parte de la página, como título, texto o imagen.",
        example: "<p>Hola</p>",
      },
      ca: {
        name: "Etiqueta HTML",
        description:
          "És una marca que diu al navegador què és una part de la pàgina, com un títol, text o imatge.",
        example: "<p>Hola</p>",
      },
      pt: {
        name: "Etiqueta HTML",
        description:
          "É uma marca que diz ao navegador o que é uma parte da página, como título, texto ou imagem.",
        example: "<p>Olá</p>",
      },
      en: {
        name: "HTML label",
        description:
          "It is a mark that tells the browser what a page part is, such as a title, text, or image.",
        example: "<p>Hello</p>",
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Web",
  },

  event: {
    id: "event",
    language: {
      es: {
        name: "Evento",
        description:
          "Es algo que ocurre y hace que el ordenador responda, como pulsar un botón.",
        example: "al pulsar el botón, mostrar un aviso",
      },
      ca: {
        name: "Esdeveniment",
        description:
          "És una cosa que passa i fa que l'ordinador respongui, com prémer un botó.",
        example: "en prémer el botó, mostrar un avís",
      },
      pt: {
        name: "Evento",
        description:
          "É algo que acontece e faz o computador responder, como clicar num botão.",
        example: "ao clicar no botão, mostrar um aviso",
      },
      en: {
        name: "Event",
        description:
          "It is something that happens and makes the computer respond, like pressing a button.",
        example: "when the button is pressed, show a message",
      },
    },
    relatedConcepts: [],
    difficulty: "beginner",
    category: "Interacción",
  },

  loop: {
    id: "loop",
    language: {
      es: {
        name: "Repetir",
        description:
          'Es hacer lo mismo varias veces sin tener que escribirlo cada vez. Como cuando TikTok te muestra un video tras otro, sigue haciendo lo mismo: mostrar un video. En el código, le dices al ordenador "repite esto 5 veces" o "repite esto mientras sea verdadero".',
        example:
          "for i in range(5):\n    print(i)  # Imprime 0, 1, 2, 3, 4\n\nwhile contador < 10:\n    print(contador)\n    contador = contador + 1",
      },
      ca: {
        name: "Repetir",
        description:
          'És fer el mateix vàries vegades sense haver d\'escriure-ho cada vegada. Com quan TikTok et mostra un vídeo rere l\'altre, segueix fent el mateix: mostrar un vídeo. En el codi, li dius a l\'ordinador "repeteix això 5 vegades" o "repeteix això mentre sigui veritat".',
        example:
          "for i in range(5):\n    print(i)  # Imprimeix 0, 1, 2, 3, 4\n\nwhile comptador < 10:\n    print(comptador)\n    comptador = comptador + 1",
      },
      pt: {
        name: "Repetir",
        description:
          'É fazer a mesma coisa várias vezes sem ter que escrever toda vez. Como quando TikTok mostra um vídeo após outro, continua fazendo o mesmo: mostrar um vídeo. No código, você diz ao computador "repita isso 5 vezes" ou "repita isso enquanto for verdadeiro".',
        example:
          "for i in range(5):\n    print(i)  # Imprime 0, 1, 2, 3, 4\n\nwhile contador < 10:\n    print(contador)\n    contador = contador + 1",
      },
      en: {
        name: "Loop",
        description:
          'It\'s doing the same thing several times without having to write it each time. Like when TikTok shows you one video after another, it keeps doing the same thing: show a video. In code, you tell the computer "repeat this 5 times" or "repeat this while it\'s true".',
        example:
          "for i in range(5):\n    print(i)  # Prints 0, 1, 2, 3, 4\n\nwhile counter < 10:\n    print(counter)\n    counter = counter + 1",
      },
    },
    relatedConcepts: ["for_loop", "while_loop", "iteration"],
    difficulty: "beginner",
    category: "Control de Flujo",
  },

  conditional: {
    id: "conditional",
    language: {
      es: {
        name: "Si... Entonces",
        description:
          'Es tomar una decisión. Como cuando tu mamá dice: "Si terminas la tarea, puedes jugar. Si no, no puedes". El ordenador hace lo mismo: si algo es verdadero, hace una cosa; si es falso, hace otra.',
        example:
          'edad = 18\n\nif edad >= 18:\n    print("Eres mayor de edad")\nelse:\n    print("Eres menor de edad")',
      },
      ca: {
        name: "Si... Aleshores",
        description:
          'És prendre una decisió. Com quan la teva mare diu: "Si acabes la tasca, pots jugar. Si no, no pots". L\'ordinador fa el mateix: si alguna cosa és veritat, fa una cosa; si és falsa, fa una altra.',
        example:
          'edat = 18\n\nif edat >= 18:\n    print("Ets major d\'edat")\nelse:\n    print("Ets menor d\'edat")',
      },
      pt: {
        name: "Se... Então",
        description:
          'É tomar uma decisão. Como quando sua mãe diz: "Se você terminar a tarefa, pode brincar. Se não, não pode". O computador faz o mesmo: se algo é verdadeiro, faz uma coisa; se é falso, faz outra.',
        example:
          'idade = 18\n\nif idade >= 18:\n    print("Você é maior de idade")\nelse:\n    print("Você é menor de idade")',
      },
      en: {
        name: "If... Then",
        description:
          "It's making a decision. Like when your mom says: \"If you finish your homework, you can play. If not, you can't\". The computer does the same: if something is true, it does one thing; if it's false, it does another.",
        example:
          'age = 18\n\nif age >= 18:\n    print("You are an adult")\nelse:\n    print("You are a minor")',
      },
    },
    relatedConcepts: ["boolean", "comparison"],
    difficulty: "beginner",
    category: "Control de Flujo",
  },

  list: {
    id: "list",
    language: {
      es: {
        name: "Lista",
        description:
          "Es como una lista de compras. Escribes varios cosas en una lista y luego puedes usarlas. El ordenador guarda varias cosas juntas y las ordena. Puedes pedirle la primera, la segunda, la tercera, etc.",
        example:
          'frutas = ["manzana", "plátano", "naranja"]\nnumeros = [1, 2, 3, 4, 5]\n\nprint(frutas[0])  # Imprime "manzana" (la primera)\nprint(numeros[2])  # Imprime 3 (la tercera)',
      },
      ca: {
        name: "Llista",
        description:
          "És com una llista de la compra. Escrius vàries coses en una llista i després pots usar-les. L'ordinador guarda vàries coses juntes i les ordena. Pots demanar-li la primera, la segona, la tercera, etc.",
        example:
          'fruites = ["poma", "plàtan", "taronja"]\nnumeros = [1, 2, 3, 4, 5]\n\nprint(fruites[0])  # Imprimeix "poma" (la primera)\nprint(numeros[2])  # Imprimeix 3 (la tercera)',
      },
      pt: {
        name: "Lista",
        description:
          "É como uma lista de compras. Você escreve várias coisas em uma lista e depois pode usá-las. O computador guarda várias coisas juntas e as ordena. Você pode pedir a primeira, a segunda, a terceira, etc.",
        example:
          'frutas = ["maçã", "banana", "laranja"]\nnumeros = [1, 2, 3, 4, 5]\n\nprint(frutas[0])  # Imprime "maçã" (a primeira)\nprint(numeros[2])  # Imprime 3 (a terceira)',
      },
      en: {
        name: "List",
        description:
          "It's like a shopping list. You write several things in a list and then you can use them. The computer stores several things together and orders them. You can ask for the first, the second, the third, etc.",
        example:
          'fruits = ["apple", "banana", "orange"]\nnumbers = [1, 2, 3, 4, 5]\n\nprint(fruits[0])  # Prints "apple" (the first)\nprint(numbers[2])  # Prints 3 (the third)',
      },
    },
    relatedConcepts: ["index", "iteration"],
    difficulty: "beginner",
    category: "Estructuras de Datos",
  },

  html: {
    id: "html",
    language: {
      es: {
        name: "HTML (Estructura de Página Web)",
        description:
          'Es como el esqueleto de una página web. Le dice al navegador: "Aquí va un título", "Aquí va un párrafo", "Aquí va una imagen". Sin HTML, el navegador no sabe qué mostrar.',
        example:
          '<h1>Mi Primer Página</h1>\n<p>Este es un párrafo.</p>\n<img src="imagen.jpg" alt="Mi imagen">',
      },
      ca: {
        name: "HTML (Estructura de Pàgina Web)",
        description:
          'És com l\'esquelet d\'una pàgina web. Li diu al navegador: "Aquí va un títol", "Aquí va un paràgraf", "Aquí va una imatge". Sense HTML, el navegador no sap què mostrar.',
        example:
          '<h1>La Meva Primera Pàgina</h1>\n<p>Aquest és un paràgraf.</p>\n<img src="imatge.jpg" alt="La meva imatge">',
      },
      pt: {
        name: "HTML (Estrutura de Página Web)",
        description:
          'É como o esqueleto de uma página web. Diz ao navegador: "Aqui vai um título", "Aqui vai um parágrafo", "Aqui vai uma imagem". Sem HTML, o navegador não sabe o que mostrar.',
        example:
          '<h1>Minha Primeira Página</h1>\n<p>Este é um parágrafo.</p>\n<img src="imagem.jpg" alt="Minha imagem">',
      },
      en: {
        name: "HTML (Web Page Structure)",
        description:
          'It\'s like the skeleton of a web page. It tells the browser: "Here goes a title", "Here goes a paragraph", "Here goes an image". Without HTML, the browser doesn\'t know what to show.',
        example:
          '<h1>My First Page</h1>\n<p>This is a paragraph.</p>\n<img src="image.jpg" alt="My image">',
      },
    },
    relatedConcepts: ["tag", "element", "css"],
    difficulty: "beginner",
    category: "Web",
  },

  terminal: {
    id: "terminal",
    language: {
      es: {
        name: "Terminal (Línea de Comandos)",
        description:
          "Es como hablar con el ordenador escribiendo órdenes. En lugar de hacer clic en iconos, escribes lo que quieres que haga. Es más poderoso porque puedes hacer cosas más complicadas solo escribiendo.",
        example:
          "C:\\Users\\Juan> dir                    # Ver archivos\nC:\\Users\\Juan> cd Desktop             # Ir a Escritorio\nC:\\Users\\Juan\\Desktop> python script.py  # Ejecutar un programa",
      },
      ca: {
        name: "Terminal (Línia de Comandos)",
        description:
          "És com parlar amb l'ordinador escrivint ordres. En lloc de fer clic en icones, escrius el que vols que faci. És més poderós perquè pots fer coses més complicades només escrivint.",
        example:
          "C:\\Users\\Joan> dir                    # Veure arxius\nC:\\Users\\Joan> cd Desktop             # Anar a Escriptori\nC:\\Users\\Joan\\Desktop> python script.py  # Executar un programa",
      },
      pt: {
        name: "Terminal (Linha de Comando)",
        description:
          "É como falar com o computador digitando comandos. Em vez de clicar em ícones, você digita o que quer que ele faça. É mais poderoso porque você pode fazer coisas mais complicadas apenas digitando.",
        example:
          "C:\\Users\\João> dir                    # Ver arquivos\nC:\\Users\\João> cd Desktop             # Ir para Área de Trabalho\nC:\\Users\\João\\Desktop> python script.py  # Executar um programa",
      },
      en: {
        name: "Terminal (Command Line)",
        description:
          "It's like talking to the computer by typing commands. Instead of clicking icons, you type what you want it to do. It's more powerful because you can do more complicated things just by typing.",
        example:
          "C:\\Users\\John> dir                    # See files\nC:\\Users\\John> cd Desktop             # Go to Desktop\nC:\\Users\\John\\Desktop> python script.py  # Run a program",
      },
    },
    relatedConcepts: ["command", "directory", "file"],
    difficulty: "beginner",
    category: "Terminal",
  },

  api: {
    id: "api",
    language: {
      es: {
        name: "API (Conexión entre Programas)",
        description:
          "Es como un mesero en un restaurante. Tú le pides algo, él va a la cocina, trae lo que pediste. Una API es lo mismo: tú le pides información a otro programa, ella te la trae. Los programas hablan entre sí a través de APIs.",
        example:
          '# Pedir información a otro programa\nimport requests\n\nresponse = requests.get("https://api.ejemplo.com/usuarios")\ndatos = response.json()',
      },
      ca: {
        name: "API (Connexió entre Programes)",
        description:
          "És com un cambrer en un restaurant. Tu li demanes alguna cosa, ell va a la cuina, porta el que vas demanar. Una API és el mateix: tu li demanes informació a un altre programa, ella te la porta. Els programes parlen entre sí a través d'APIs.",
        example:
          '# Demanar informació a un altre programa\nimport requests\n\nresponse = requests.get("https://api.exemple.com/usuaris")\ndades = response.json()',
      },
      pt: {
        name: "API (Conexão entre Programas)",
        description:
          "É como um garçom em um restaurante. Você pede algo, ele vai à cozinha, traz o que você pediu. Uma API é o mesmo: você pede informações a outro programa, ela as traz. Os programas falam entre si através de APIs.",
        example:
          '# Pedir informações a outro programa\nimport requests\n\nresponse = requests.get("https://api.exemplo.com/usuarios")\ndados = response.json()',
      },
      en: {
        name: "API (Connection Between Programs)",
        description:
          "It's like a waiter in a restaurant. You ask him for something, he goes to the kitchen, brings what you asked for. An API is the same: you ask another program for information, it brings it to you. Programs talk to each other through APIs.",
        example:
          '# Ask another program for information\nimport requests\n\nresponse = requests.get("https://api.example.com/users")\ndata = response.json()',
      },
    },
    relatedConcepts: ["request", "json", "endpoint"],
    difficulty: "intermediate",
    category: "Programación Avanzada",
  },
};

export function getConceptMultilang(id: string, language: Language) {
  const concept = conceptMapMultilang[id];
  if (!concept) return null;
  return concept.language[language];
}

export function getAllConceptsMultilang(language: Language) {
  return Object.entries(conceptMapMultilang).map(([id, concept]) => ({
    id,
    ...concept.language[language],
    relatedConcepts: concept.relatedConcepts,
    difficulty: concept.difficulty,
    category: concept.category,
  }));
}
