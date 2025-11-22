# ES01 - Variabili e Tipi di Dati

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi

- Comprendere la differenza tra `var`, `let` e `const`
- Conoscere i tipi primitivi di JavaScript
- Saper dichiarare e inizializzare variabili
- Capire lo scope delle variabili
- Utilizzare `typeof` per verificare i tipi

## 📚 Teoria

### Dichiarazione di Variabili

JavaScript offre tre modi per dichiarare variabili:

```javascript
var nome = "Mario";      // vecchio stile, function-scoped
let età = 25;            // moderno, block-scoped, riassegnabile
const PI = 3.14159;      // moderno, block-scoped, NON riassegnabile
```

### Tipi Primitivi

JavaScript ha 7 tipi primitivi:

1. **string** - Testo: `"ciao"`, `'mondo'`
2. **number** - Numeri: `42`, `3.14`, `NaN`, `Infinity`
3. **boolean** - Booleani: `true`, `false`
4. **undefined** - Valore non assegnato
5. **null** - Assenza intenzionale di valore
6. **symbol** - Identificatore unico (ES6)
7. **bigint** - Numeri interi grandi (ES2020)

### typeof Operator

```javascript
typeof "ciao"        // "string"
typeof 42            // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof null          // "object" (bug storico!)
typeof Symbol()      // "symbol"
typeof 123n          // "bigint"
```

### Differenze var, let, const

| Caratteristica | var | let | const |
|---------------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Sì (undefined) | Sì (TDZ) | Sì (TDZ) |
| Riassegnabile | Sì | Sì | No |
| Ridichiarabile | Sì | No | No |

## 💡 Esempio Guidato

```javascript
// 1. String
let nome = "Ada";
let cognome = 'Lovelace';
let messaggio = `Ciao, ${nome}!`; // template literal

console.log(typeof nome);  // "string"

// 2. Number
let intero = 42;
let decimale = 3.14;
let negativo = -273.15;

console.log(typeof intero);  // "number"

// 3. Boolean
let vero = true;
let falso = false;
let confronto = 5 > 3;  // true

console.log(typeof vero);  // "boolean"

// 4. Undefined
let nonDefinito;
console.log(nonDefinito);  // undefined
console.log(typeof nonDefinito);  // "undefined"

// 5. Null
let vuoto = null;
console.log(typeof vuoto);  // "object" (quirk di JS!)

// 6. const vs let
let variabile = 10;
variabile = 20;  // OK

const costante = 10;
// costante = 20;  // ❌ Error: Assignment to constant variable

// 7. Scope
if (true) {
  var x = 1;  // visibile fuori dal blocco
  let y = 2;  // visibile solo nel blocco
  const z = 3;  // visibile solo nel blocco
}

console.log(x);  // 1
// console.log(y);  // ❌ ReferenceError
// console.log(z);  // ❌ ReferenceError
```

## ✏️ Esercizio

Crea un file `esercizio.js` e completa le seguenti attività:

### Parte 1: Dichiarazioni Base

1. Dichiara una variabile `let` chiamata `nomeUtente` con il tuo nome
2. Dichiara una costante `ANNO_NASCITA` con il tuo anno di nascita
3. Dichiara una variabile `età` e calcolala come `2024 - ANNO_NASCITA`
4. Stampa in console tutte le variabili

### Parte 2: Tipi di Dati

1. Crea 5 variabili, una per ogni tipo primitivo (esclusi symbol e bigint)
2. Usa `typeof` per verificare il tipo di ognuna
3. Stampa in console: `"La variabile X è di tipo Y"`

### Parte 3: Riassegnazione

1. Dichiara una variabile `let punteggio = 0`
2. Incrementa il punteggio di 10
3. Raddoppia il punteggio
4. Stampa il risultato

### Parte 4: Scope

1. Dichiara una variabile globale `var globale = "globale"`
2. Crea un blocco `if(true) { ... }` con:
   - Una variabile `let locale = "locale"`
   - Un console.log di entrambe le variabili
3. Fuori dal blocco, prova a stampare `locale` (commenta la riga per evitare errori)

### Parte 5: Errori Comuni

Sperimenta (commentando dopo) questi errori:

1. Prova a riassegnare una `const`
2. Usa una variabile prima di dichiararla
3. Verifica il tipo di `null`

## 🎯 Output Atteso

```
Nome: Mario
Anno di nascita: 1995
Età: 29
La variabile 'messaggio' è di tipo string
La variabile 'numero' è di tipo number
La variabile 'booleano' è di tipo boolean
La variabile 'indefinito' è di tipo undefined
La variabile 'nullo' è di tipo object
Punteggio finale: 20
Dentro il blocco: globale e locale
Fuori dal blocco: solo globale
```

## 🧪 Testing

Verifica il tuo codice:

```javascript
// Test 1: Variabili esistono
console.assert(typeof nomeUtente === 'string', 'nomeUtente deve essere una stringa');

// Test 2: Costante non modificabile
console.assert(typeof ANNO_NASCITA === 'number', 'ANNO_NASCITA deve essere un numero');

// Test 3: Calcolo età
console.assert(età === 2024 - ANNO_NASCITA, 'Età calcolata correttamente');
```

## 💡 Suggerimenti

- Usa sempre `const` a meno che tu non debba riassegnare
- Evita `var`, usa `let` o `const`
- Dai nomi descrittivi alle variabili
- `typeof` è utile per debug
- Ricorda: `typeof null === "object"` è un bug storico

## 🚀 Sfida Extra

1. **Naming Conventions**: Crea variabili seguendo camelCase, snake_case e PascalCase
2. **Number Speciali**: Sperimenta con `NaN`, `Infinity`, `-Infinity`
3. **Conversioni**: Prova a sommare un numero e una stringa (`5 + "5"`)
4. **Template Literals**: Crea una frase complessa con interpolazione e multiline

## 📖 Approfondimenti

- [MDN: var, let, const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)
- [MDN: Data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [JavaScript.info: Variables](https://javascript.info/variables)

## ➡️ Prossimo Esercizio

ES02 - Operatori e Espressioni
