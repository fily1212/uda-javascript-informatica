# ES11 - Array Base e Metodi CRUD

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Creare e manipolare array
- Usare push, pop, shift, unshift
- Accedere a elementi per indice
- Comprendere length

## 📚 Teoria
```javascript
// Creazione
let frutti = ["mela", "pera", "banana"];
let numeri = [1, 2, 3, 4, 5];
let misto = [1, "due", true, null];

// Accesso
frutti[0]        // "mela"
frutti[frutti.length - 1]  // ultimo elemento

// CRUD Operations
frutti.push("arancia");     // aggiungi in fondo
frutti.pop();               // rimuovi da fondo
frutti.unshift("fragola");  // aggiungi all'inizio
frutti.shift();             // rimuovi da inizio

// Proprietà
frutti.length  // numero elementi
```

## ✏️ Esercizio
Crea sistema gestione playlist musicale:
1. Array canzoni iniziale (5 canzoni)
2. Aggiungi canzone in fondo (push)
3. Aggiungi canzone all'inizio (unshift)
4. Rimuovi ultima canzone (pop)
5. Rimuovi prima canzone (shift)
6. Mostra lunghezza playlist
7. Accedi alla canzone centrale

## 💡 Suggerimenti
- length è proprietà, non metodo
- Indici partono da 0
- push/pop sono stack (LIFO)
- shift/unshift sono queue (FIFO)

## ➡️ Prossimo: ES12 - Iterazione Array
