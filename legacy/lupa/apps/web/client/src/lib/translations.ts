import { Language } from "@/contexts/LanguageContext";

export const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navegación
    "nav.title": "LUPA",
    "nav.demo": "Probar",

    // Hero
    "hero.title": "Entiende el código línea por línea",
    "hero.description":
      'LUPA te explica qué hace cada parte del código. Es como tener a alguien al lado diciéndote: "Esto significa esto, esto hace aquello". Sin jerga complicada. Solo explicaciones claras.',
    "hero.cta1": "Ver Cómo Funciona",
    "hero.cta2": "Más Información",

    // Sección: Por qué LUPA
    "why.title": "¿Por qué LUPA?",
    "why.description":
      "Aprender a programar es difícil cuando nadie te explica qué significa cada cosa.",
    "why.feature1.title": "Explicaciones Claras",
    "why.feature1.description":
      "Haz clic en cualquier parte del código. LUPA te dice exactamente qué es y para qué sirve. Sin palabras raras.",
    "why.feature2.title": "Ejemplos Reales",
    "why.feature2.description":
      "Cada concepto se explica con cosas que usas todos los días: WhatsApp, TikTok, tu teléfono, tu ordenador.",
    "why.feature3.title": "A Tu Ritmo",
    "why.feature3.description":
      "No hay prisa. Aprende lo básico primero, luego lo más complicado. Tú decides cuándo estás listo.",

    // Sección: Cómo Funciona
    "how.title": "Así Funciona LUPA",
    "how.description":
      "El código parece complicado porque nadie te explica qué significa. LUPA cambia eso. Te muestra qué hace cada línea, cada palabra, cada símbolo.",
    "how.step1": "Ves un código",
    "how.step2": "Haces clic en lo que no entiendes",
    "how.step3": "LUPA te lo explica con ejemplos simples",

    // Sección: Explicación Línea por Línea
    "explain.title": "Cada Línea Explicada",
    "explain.description":
      "Cuando ves código, puede parecer un montón de letras raras. LUPA te muestra qué hace cada parte y por qué está ahí.",
    "explain.item1.title": "Qué Significa",
    "explain.item1.description": "Te dice qué es cada cosa en palabras simples",
    "explain.item2.title": "Ejemplos",
    "explain.item2.description": "Te muestra cómo se usa en la vida real",
    "explain.item3.title": "Conexiones",
    "explain.item3.description": "Te muestra qué otras cosas necesitas saber",

    // Sección: Viaje de Aprendizaje
    "journey.title": "De Confundido a Confiado",
    "journey.description":
      'Todos empezamos sin entender nada. LUPA te ayuda a pasar de "¿Qué es esto?" a "Ah, ya lo entiendo" paso a paso.',
    "journey.level1": "Lo Básico",
    "journey.level1.description": "Qué es una variable, un número, un texto",
    "journey.level2": "Decisiones",
    "journey.level2.description": "Si esto, entonces aquello. Repetir cosas",
    "journey.level3": "Lo Complicado",
    "journey.level3.description": "Listas, diccionarios, funciones avanzadas",

    // CTA Final
    "cta.title": "Comienza Ahora",
    "cta.description":
      "No importa si nunca has programado. LUPA está hecho para ti. Pruébalo gratis.",
    "cta.button": "Probar Ahora",

    // Footer
    "footer.text": "© 2026 LUPA. Aprender a programar debería ser fácil.",
    "footer.privacy": "Privacidad",
    "footer.terms": "Términos",

    // Demo
    "demo.title": "LUPA - Demo Interactiva",
    "demo.back": "Volver",
    "demo.settings": "Configuración",
    "demo.platform": "Plataforma",
    "demo.difficulty": "Nivel de Dificultad",
    "demo.difficulty.beginner": "Principiante",
    "demo.difficulty.intermediate": "Intermedio",
    "demo.difficulty.advanced": "Avanzado",
    "demo.code": "Código",
    "demo.explanation": "Explicación",
    "demo.click":
      "Haz click en cualquier concepto para ver su explicación aquí.",
    "demo.language": "Lenguaje",
    "demo.example": "Ejemplo",
    "demo.related": "Conceptos Relacionados",
    "demo.difficulty.label": "Dificultad",
  },

  ca: {
    // Navegació
    "nav.title": "LUPA",
    "nav.demo": "Provar",

    // Hero
    "hero.title": "Entén el codi línia per línia",
    "hero.description":
      'LUPA et explica què fa cada part del codi. És com tenir algú al costat dient-te: "Això significa això, això fa allò". Sense jerga complicada. Només explicacions clares.',
    "hero.cta1": "Veure Com Funciona",
    "hero.cta2": "Més Informació",

    // Secció: Per què LUPA
    "why.title": "Per què LUPA?",
    "why.description":
      "Aprendre a programar és difícil quan ningú et explica què significa cada cosa.",
    "why.feature1.title": "Explicacions Clares",
    "why.feature1.description":
      "Fes clic en qualsevol part del codi. LUPA et diu exactament què és i per a què serveix. Sense paraules estranyes.",
    "why.feature2.title": "Exemples Reals",
    "why.feature2.description":
      "Cada concepte s'explica amb coses que uses cada dia: WhatsApp, TikTok, el teu telèfon, el teu ordinador.",
    "why.feature3.title": "Al Teu Ritme",
    "why.feature3.description":
      "No hi ha pressa. Aprèn el bàsic primer, després el més complicat. Tu decides quan estàs llest.",

    // Secció: Com Funciona
    "how.title": "Així Funciona LUPA",
    "how.description":
      "El codi sembla complicat perquè ningú et explica què significa. LUPA canvia això. Et mostra què fa cada línia, cada paraula, cada símbol.",
    "how.step1": "Veus un codi",
    "how.step2": "Fes clic en el que no entens",
    "how.step3": "LUPA te l'explica amb exemples simples",

    // Secció: Explicació Línia per Línia
    "explain.title": "Cada Línia Explicada",
    "explain.description":
      "Quan veus codi, pot semblar un munt de lletres estranyes. LUPA et mostra què fa cada part i per què hi és.",
    "explain.item1.title": "Què Significa",
    "explain.item1.description": "Et diu què és cada cosa en paraules simples",
    "explain.item2.title": "Exemples",
    "explain.item2.description": "Et mostra com s'usa en la vida real",
    "explain.item3.title": "Connexions",
    "explain.item3.description":
      "Et mostra quines altres coses necessites saber",

    // Secció: Viatge d'Aprenentatge
    "journey.title": "De Confós a Confiat",
    "journey.description":
      'Tots comencem sense entendre res. LUPA t\'ajuda a passar de "Què és això?" a "Ah, ja ho entenc" pas a pas.',
    "journey.level1": "Lo Bàsic",
    "journey.level1.description": "Què és una variable, un número, un text",
    "journey.level2": "Decisions",
    "journey.level2.description": "Si això, aleshores allò. Repetir coses",
    "journey.level3": "Lo Complicat",
    "journey.level3.description": "Llistes, diccionaris, funcions avançades",

    // CTA Final
    "cta.title": "Comença Ara",
    "cta.description":
      "No importa si mai has programat. LUPA està fet per a tu. Prova'l gratis.",
    "cta.button": "Provar Ara",

    // Footer
    "footer.text": "© 2026 LUPA. Aprendre a programar hauria de ser fàcil.",
    "footer.privacy": "Privacitat",
    "footer.terms": "Termes",

    // Demo
    "demo.title": "LUPA - Demo Interactiva",
    "demo.back": "Enrere",
    "demo.settings": "Configuració",
    "demo.platform": "Plataforma",
    "demo.difficulty": "Nivell de Dificultat",
    "demo.difficulty.beginner": "Principiant",
    "demo.difficulty.intermediate": "Intermedi",
    "demo.difficulty.advanced": "Avançat",
    "demo.code": "Codi",
    "demo.explanation": "Explicació",
    "demo.click":
      "Fes clic en qualsevol concepte per veure la seva explicació aquí.",
    "demo.language": "Idioma",
    "demo.example": "Exemple",
    "demo.related": "Conceptes Relacionats",
    "demo.difficulty.label": "Dificultat",
  },

  pt: {
    // Navegação
    "nav.title": "LUPA",
    "nav.demo": "Testar",

    // Hero
    "hero.title": "Entenda o código linha por linha",
    "hero.description":
      'LUPA explica o que cada parte do código faz. É como ter alguém ao seu lado dizendo: "Isso significa isso, isso faz aquilo". Sem jargão complicado. Apenas explicações claras.',
    "hero.cta1": "Ver Como Funciona",
    "hero.cta2": "Mais Informações",

    // Seção: Por que LUPA
    "why.title": "Por que LUPA?",
    "why.description":
      "Aprender a programar é difícil quando ninguém explica o que significa cada coisa.",
    "why.feature1.title": "Explicações Claras",
    "why.feature1.description":
      "Clique em qualquer parte do código. LUPA diz exatamente o que é e para que serve. Sem palavras estranhas.",
    "why.feature2.title": "Exemplos Reais",
    "why.feature2.description":
      "Cada conceito é explicado com coisas que você usa todos os dias: WhatsApp, TikTok, seu telefone, seu computador.",
    "why.feature3.title": "No Seu Ritmo",
    "why.feature3.description":
      "Sem pressa. Aprenda o básico primeiro, depois o mais complicado. Você decide quando está pronto.",

    // Seção: Como Funciona
    "how.title": "Assim Funciona LUPA",
    "how.description":
      "O código parece complicado porque ninguém explica o que significa. LUPA muda isso. Mostra o que cada linha, cada palavra, cada símbolo faz.",
    "how.step1": "Você vê um código",
    "how.step2": "Clique no que não entende",
    "how.step3": "LUPA explica com exemplos simples",

    // Seção: Explicação Linha por Linha
    "explain.title": "Cada Linha Explicada",
    "explain.description":
      "Quando você vê código, pode parecer um monte de letras estranhas. LUPA mostra o que cada parte faz e por que está lá.",
    "explain.item1.title": "O Que Significa",
    "explain.item1.description": "Diz o que é cada coisa em palavras simples",
    "explain.item2.title": "Exemplos",
    "explain.item2.description": "Mostra como é usado na vida real",
    "explain.item3.title": "Conexões",
    "explain.item3.description": "Mostra que outras coisas você precisa saber",

    // Seção: Jornada de Aprendizado
    "journey.title": "De Confuso a Confiante",
    "journey.description":
      'Todos começamos sem entender nada. LUPA ajuda você a passar de "O que é isso?" para "Ah, já entendi" passo a passo.',
    "journey.level1": "O Básico",
    "journey.level1.description": "O que é uma variável, um número, um texto",
    "journey.level2": "Decisões",
    "journey.level2.description": "Se isso, então aquilo. Repetir coisas",
    "journey.level3": "O Complicado",
    "journey.level3.description": "Listas, dicionários, funções avançadas",

    // CTA Final
    "cta.title": "Comece Agora",
    "cta.description":
      "Não importa se você nunca programou. LUPA foi feito para você. Teste gratuitamente.",
    "cta.button": "Testar Agora",

    // Footer
    "footer.text": "© 2026 LUPA. Aprender a programar deveria ser fácil.",
    "footer.privacy": "Privacidade",
    "footer.terms": "Termos",

    // Demo
    "demo.title": "LUPA - Demo Interativa",
    "demo.back": "Voltar",
    "demo.settings": "Configurações",
    "demo.platform": "Plataforma",
    "demo.difficulty": "Nível de Dificuldade",
    "demo.difficulty.beginner": "Iniciante",
    "demo.difficulty.intermediate": "Intermediário",
    "demo.difficulty.advanced": "Avançado",
    "demo.code": "Código",
    "demo.explanation": "Explicação",
    "demo.click": "Clique em qualquer conceito para ver sua explicação aqui.",
    "demo.language": "Idioma",
    "demo.example": "Exemplo",
    "demo.related": "Conceitos Relacionados",
    "demo.difficulty.label": "Dificuldade",
  },

  en: {
    // Navigation
    "nav.title": "LUPA",
    "nav.demo": "Try",

    // Hero
    "hero.title": "Understand code line by line",
    "hero.description":
      'LUPA explains what each part of the code does. It\'s like having someone by your side saying: "This means this, this does that". No complicated jargon. Just clear explanations.',
    "hero.cta1": "See How It Works",
    "hero.cta2": "More Information",

    // Section: Why LUPA
    "why.title": "Why LUPA?",
    "why.description":
      "Learning to code is hard when nobody explains what each thing means.",
    "why.feature1.title": "Clear Explanations",
    "why.feature1.description":
      "Click on any part of the code. LUPA tells you exactly what it is and what it does. No strange words.",
    "why.feature2.title": "Real Examples",
    "why.feature2.description":
      "Each concept is explained with things you use every day: WhatsApp, TikTok, your phone, your computer.",
    "why.feature3.title": "At Your Pace",
    "why.feature3.description":
      "No rush. Learn the basics first, then the more complicated stuff. You decide when you're ready.",

    // Section: How It Works
    "how.title": "How LUPA Works",
    "how.description":
      "Code seems complicated because nobody explains what it means. LUPA changes that. It shows you what each line, each word, each symbol does.",
    "how.step1": "You see a code",
    "how.step2": "Click on what you don't understand",
    "how.step3": "LUPA explains it with simple examples",

    // Section: Line by Line Explanation
    "explain.title": "Every Line Explained",
    "explain.description":
      "When you see code, it can look like a bunch of strange letters. LUPA shows you what each part does and why it's there.",
    "explain.item1.title": "What It Means",
    "explain.item1.description": "Tells you what each thing is in simple words",
    "explain.item2.title": "Examples",
    "explain.item2.description": "Shows you how it's used in real life",
    "explain.item3.title": "Connections",
    "explain.item3.description": "Shows you what other things you need to know",

    // Section: Learning Journey
    "journey.title": "From Confused to Confident",
    "journey.description":
      'We all start without understanding anything. LUPA helps you go from "What is this?" to "Ah, I get it" step by step.',
    "journey.level1": "The Basics",
    "journey.level1.description": "What is a variable, a number, text",
    "journey.level2": "Decisions",
    "journey.level2.description": "If this, then that. Repeating things",
    "journey.level3": "The Complicated Stuff",
    "journey.level3.description": "Lists, dictionaries, advanced functions",

    // Final CTA
    "cta.title": "Start Now",
    "cta.description":
      "It doesn't matter if you've never coded. LUPA is made for you. Try it free.",
    "cta.button": "Try Now",

    // Footer
    "footer.text": "© 2026 LUPA. Learning to code should be easy.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",

    // Demo
    "demo.title": "LUPA - Interactive Demo",
    "demo.back": "Back",
    "demo.settings": "Settings",
    "demo.platform": "Platform",
    "demo.difficulty": "Difficulty Level",
    "demo.difficulty.beginner": "Beginner",
    "demo.difficulty.intermediate": "Intermediate",
    "demo.difficulty.advanced": "Advanced",
    "demo.code": "Code",
    "demo.explanation": "Explanation",
    "demo.click": "Click on any concept to see its explanation here.",
    "demo.language": "Language",
    "demo.example": "Example",
    "demo.related": "Related Concepts",
    "demo.difficulty.label": "Difficulty",
  },
};

export function getTranslation(language: Language, key: string): string {
  return translations[language][key] || key;
}
