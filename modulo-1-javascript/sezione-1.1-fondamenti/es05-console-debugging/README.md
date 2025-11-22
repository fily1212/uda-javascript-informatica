# ES05 - Console e Debugging Base

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Padroneggiare i metodi `console`
- Usare DevTools per debugging
- Trovare e correggere errori comuni
- Applicare tecniche di debugging sistematico
- Comprendere tipi di errori JavaScript

## 📚 Teoria

### Metodi Console

```javascript
// Log base
console.log("Messaggio semplice");
console.log("Valore x:", x, "Valore y:", y);

// Livelli di log
console.info("Informazione");
console.warn("Attenzione!");
console.error("Errore critico!");

// Tabella
let users = [
  {nome: "Mario", età: 25},
  {nome: "Luigi", età: 30}
];
console.table(users);

// Gruppo
console.group("Dettagli utente");
console.log("Nome:", nome);
console.log("Età:", età);
console.groupEnd();

// Timer
console.time("operazione");
// ... codice ...
console.timeEnd("operazione");

// Assert
console.assert(x > 0, "x deve essere positivo!");

// Clear
console.clear();  // Pulisce console
```

### Tipi di Errori

**SyntaxError**: Errore di sintassi
```javascript
let x = ;  // ❌ SyntaxError
```

**ReferenceError**: Variabile non definita
```javascript
console.log(variabileNonEsistente);  // ❌ ReferenceError
```

**TypeError**: Tipo non corretto
```javascript
null.toString();  // ❌ TypeError
```

**RangeError**: Valore fuori range
```javascript
let arr = new Array(-1);  // ❌ RangeError
```

### Debugging Sistematico

1. **Leggi l'errore**: Stack trace indica dove
2. **Isola il problema**: Commenta codice
3. **Usa console.log**: Stampa valori intermedi
4. **Verifica assunzioni**: Usa assert
5. **Debugger**: Usa breakpoints

## ✏️ Esercizio

### Parte 1: Console Methods

Crea uno script che:
1. Logga un messaggio di benvenuto con `console.log`
2. Stampa una tabella con 3 prodotti (nome, prezzo, quantità)
3. Crea un gruppo "Statistiche" con media prezzi
4. Misu il tempo di un ciclo for (1-1000000)
5. Usa assert per verificare che un numero sia pari

### Parte 2: Debug Errors

Trova e correggi gli errori in questo codice:

```javascript
// Errore 1
let nome = "Mario;
console.log(nome);

// Errore 2
let x = 10;
console.log(y);

// Errore 3
const PI = 3.14;
PI = 3.14159;

// Errore 4
let numeri = [1, 2, 3];
console.log(numeri[5].toString());

// Errore 5
function saluta(nome) {
  return "Ciao " + nome;
}
console.log(saluta());
```

### Parte 3: Debugging Pratico

Debug questo calcolo:
```javascript
function calcolaSomma(a, b) {
  let risultato = a + b;
  return risultato;
}

let x = "5";
let y = 3;
let somma = calcolaSomma(x, y);
console.log("Somma:", somma);  // Expected: 8, Got: "53"
```

### Parte 4: Log Formattato

Crea una funzione `debugLog(variabile, nome)` che stampa:
```
[DEBUG] Nome variabile: valore (tipo: tipo)
```

Esempio:
```javascript
debugLog(42, "età");
// [DEBUG] età: 42 (tipo: number)
```

## 🎯 Output Atteso
```
Benvenuto al corso JavaScript!

Prodotti:
┌─────────┬────────────┬───────┬──────────┐
│ (index) │    nome    │ prezzo│ quantità │
├─────────┼────────────┼───────┼──────────┤
│    0    │   "Penna"  │  1.50 │    10    │
│    1    │  "Quaderno"│  3.00 │     5    │
│    2    │  "Zaino"   │ 25.00 │     2    │
└─────────┴────────────┴───────┴──────────┘

Statistiche:
  Prezzo medio: 9.83€

operazione: 5.234ms

Assertion passed: Numero pari

[DEBUG] età: 42 (tipo: number)
[DEBUG] nome: Mario (tipo: string)
```

## 💡 Suggerimenti
- Usa DevTools (F12) del browser
- `console.table()` è ottimo per array/oggetti
- Leggi sempre lo stack trace degli errori
- `typeof` aiuta a identificare type errors
- Commenta codice per isolare problemi
- Usa `debugger;` per breakpoint programmatico

## 🚀 Sfida Extra
1. Crea un logger custom con timestamp
2. Implementa different log levels (DEBUG, INFO, WARN, ERROR)
3. Crea funzione che cattura e logga errori con try/catch
4. Implementa un profiler di performance per funzioni

## 🛠️ DevTools Shortcuts
- `F12` - Apri DevTools
- `Ctrl+Shift+I` - Ispeziona elemento
- `Ctrl+Shift+J` - Console diretta
- `Ctrl+Shift+C` - Seleziona elemento
- `F8` - Pausa/Riprendi debugger

## 📖 Approfondimenti
- [MDN: Console](https://developer.mozilla.org/en-US/docs/Web/API/console)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [JavaScript Errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors)

## ➡️ Prossimo: ES06 - If/Else e Condizionali
