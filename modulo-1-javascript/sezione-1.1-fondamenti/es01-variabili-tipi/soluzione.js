// ==========================================
// ES01 - Variabili e Tipi di Dati
// Soluzione Completa
// ==========================================

console.log("=== PARTE 1: Dichiarazioni Base ===\n");

// 1. Nome utente
let nomeUtente = "Mario Rossi";

// 2. Anno di nascita (costante)
const ANNO_NASCITA = 1995;

// 3. Calcolo età
let età = 2024 - ANNO_NASCITA;

// 4. Stampa variabili
console.log(`Nome: ${nomeUtente}`);
console.log(`Anno di nascita: ${ANNO_NASCITA}`);
console.log(`Età: ${età}`);

console.log("\n=== PARTE 2: Tipi di Dati ===\n");

// Creazione variabili per ogni tipo primitivo
let messaggio = "Ciao, mondo!";  // string
let numero = 42;                  // number
let booleano = true;              // boolean
let indefinito;                   // undefined
let nullo = null;                 // null

// Verifica tipo e stampa
console.log(`La variabile 'messaggio' è di tipo ${typeof messaggio}`);
console.log(`La variabile 'numero' è di tipo ${typeof numero}`);
console.log(`La variabile 'booleano' è di tipo ${typeof booleano}`);
console.log(`La variabile 'indefinito' è di tipo ${typeof indefinito}`);
console.log(`La variabile 'nullo' è di tipo ${typeof nullo}`); // "object" - bug storico!

console.log("\n=== PARTE 3: Riassegnazione ===\n");

// Incremento e modifica punteggio
let punteggio = 0;
console.log(`Punteggio iniziale: ${punteggio}`);

punteggio = punteggio + 10;  // oppure: punteggio += 10
console.log(`Dopo incremento: ${punteggio}`);

punteggio = punteggio * 2;   // oppure: punteggio *= 2
console.log(`Punteggio finale: ${punteggio}`);

console.log("\n=== PARTE 4: Scope ===\n");

// Variabile globale
var globale = "globale";

if (true) {
  let locale = "locale";
  console.log(`Dentro il blocco: ${globale} e ${locale}`);
}

console.log(`Fuori dal blocco: ${globale}`);
// console.log(locale); // ❌ ReferenceError: locale is not defined

console.log("\n=== PARTE 5: Errori Comuni ===\n");

// Errore 1: Riassegnare const (commentato)
const COSTANTE = 100;
// COSTANTE = 200; // ❌ TypeError: Assignment to constant variable
console.log("✓ Le costanti non possono essere riassegnate");

// Errore 2: Uso prima della dichiarazione
// console.log(futura); // ❌ ReferenceError
let futura = "valore";
console.log("✓ Le variabili devono essere dichiarate prima dell'uso");

// Errore 3: typeof null
console.log(`typeof null = ${typeof null}`); // "object" - bug storico di JavaScript!

console.log("\n=== TEST AUTOMATICI ===\n");

// Test 1: Variabili esistono e hanno il tipo corretto
console.assert(typeof nomeUtente === 'string', '✓ Test 1: nomeUtente è una stringa');

// Test 2: Costante è un numero
console.assert(typeof ANNO_NASCITA === 'number', '✓ Test 2: ANNO_NASCITA è un numero');

// Test 3: Età calcolata correttamente
console.assert(età === 2024 - ANNO_NASCITA, '✓ Test 3: Età calcolata correttamente');

// Test 4: Punteggio finale
console.assert(punteggio === 20, '✓ Test 4: Punteggio è 20');

console.log("\n=== SFIDE EXTRA ===\n");

// Sfida 1: Naming conventions
let camelCase = "convenzione JavaScript";
let snake_case = "convenzione Python";
let PascalCase = "convenzione Classi";
console.log("✓ Naming conventions applicate");

// Sfida 2: Number speciali
let notANumber = NaN;
let infinito = Infinity;
let menoInfinito = -Infinity;
console.log(`NaN: ${notANumber}, Infinity: ${infinito}, -Infinity: ${menoInfinito}`);

// Sfida 3: Conversioni automatiche (coercion)
let sommaStrana = 5 + "5";  // "55" (string)
let differenza = 10 - "5";   // 5 (number)
console.log(`5 + "5" = ${sommaStrana} (tipo: ${typeof sommaStrana})`);
console.log(`10 - "5" = ${differenza} (tipo: ${typeof differenza})`);

// Sfida 4: Template literals multiline
let poesia = `
  Roses are red,
  Violets are blue,
  JavaScript is weird,
  And so are you! 😄
`;
console.log(poesia);

console.log("\n=== ESERCIZIO COMPLETATO ===");
