# ES15 - Consolidamento Array Methods

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Consolidare map, filter, find
- Combinare metodi array
- Risolvere problemi pratici
- Esercizi vari di applicazione

## 📚 Teoria - Ripasso Metodi Array

Hai già imparato questi metodi. Ora li combiniamo per risolvere problemi reali!

### Map - Trasforma ogni elemento
```javascript
// Trasforma array di numeri
let numeri = [1, 2, 3, 4, 5];
let doppi = numeri.map(n => n * 2);
console.log(doppi);  // [2, 4, 6, 8, 10]

// Trasforma array di oggetti
let studenti = [
  {nome: "Mario", voto: 7},
  {nome: "Luigi", voto: 8}
];
let nomi = studenti.map(s => s.nome);
console.log(nomi);  // ["Mario", "Luigi"]
```

### Filter - Seleziona elementi
```javascript
let numeri = [1, 2, 3, 4, 5, 6];
let pari = numeri.filter(n => n % 2 === 0);
console.log(pari);  // [2, 4, 6]

// Filtra oggetti
let promossi = studenti.filter(s => s.voto >= 6);
```

### Find - Trova primo elemento
```javascript
let numeri = [1, 2, 3, 4, 5];
let primoMaggioreDi3 = numeri.find(n => n > 3);
console.log(primoMaggioreDi3);  // 4

// Trova studente
let mario = studenti.find(s => s.nome === "Mario");
```

### Combinare Metodi (Chaining)
```javascript
let numeri = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Prendi numeri pari e raddoppiali
let risultato = numeri
  .filter(n => n % 2 === 0)  // [2, 4, 6, 8, 10]
  .map(n => n * 2);           // [4, 8, 12, 16, 20]

console.log(risultato);
```

## 💡 Esempio Guidato Completo

```javascript
// Database prodotti
let prodotti = [
  {nome: "Penna", prezzo: 1.50, categoria: "cancelleria", disponibile: true},
  {nome: "Quaderno", prezzo: 3.00, categoria: "cancelleria", disponibile: true},
  {nome: "Zaino", prezzo: 25.00, categoria: "scuola", disponibile: false},
  {nome: "Matita", prezzo: 0.50, categoria: "cancelleria", disponibile: true},
  {nome: "Astuccio", prezzo: 5.00, categoria: "scuola", disponibile: true}
];

// 1. Trova tutti i prodotti di cancelleria
let cancelleria = prodotti.filter(p => p.categoria === "cancelleria");
console.log(cancelleria);
// [{nome: "Penna", ...}, {nome: "Quaderno", ...}, {nome: "Matita", ...}]

// 2. Trova prodotti disponibili sotto 5€
let economici = prodotti.filter(p => p.disponibile && p.prezzo < 5);
console.log(economici);
// [{nome: "Penna", ...}, {nome: "Quaderno", ...}, {nome: "Matita", ...}]

// 3. Ottieni solo i nomi dei prodotti disponibili
let nomiDisponibili = prodotti
  .filter(p => p.disponibile)
  .map(p => p.nome);
console.log(nomiDisponibili);
// ["Penna", "Quaderno", "Matita", "Astuccio"]

// 4. Applica sconto 10% a tutti i prezzi
let conSconto = prodotti.map(p => {
  return {
    ...p,
    prezzo: p.prezzo * 0.9  // -10%
  };
});
console.log(conSconto);

// 5. Trova il primo prodotto di scuola
let primoScuola = prodotti.find(p => p.categoria === "scuola");
console.log(primoScuola);  // {nome: "Zaino", ...}
```

## ✏️ Esercizio

Dato questo array di studenti:
```javascript
let studenti = [
  {nome: "Mario", cognome: "Rossi", classe: "3A", voto: 7.5, assenze: 5},
  {nome: "Luigi", cognome: "Verdi", classe: "3A", voto: 8.0, assenze: 2},
  {nome: "Anna", cognome: "Bianchi", classe: "3B", voto: 6.5, assenze: 8},
  {nome: "Sara", cognome: "Neri", classe: "3A", voto: 9.0, assenze: 1},
  {nome: "Paolo", cognome: "Gialli", classe: "3B", voto: 5.5, assenze: 12},
  {nome: "Giulia", cognome: "Blu", classe: "3A", voto: 7.0, assenze: 4}
];
```

### Parte 1: Filter
1. Trova tutti gli studenti della 3A
2. Trova studenti con voto >= 7
3. Trova studenti con meno di 5 assenze
4. Trova studenti promossi (voto >= 6) della 3A

### Parte 2: Map
1. Crea array con solo i nomi completi (nome + cognome)
2. Crea array con oggetti {nome, voto}
3. Aggiungi 0.5 a tutti i voti (ma max 10)

### Parte 3: Find
1. Trova il primo studente con voto >= 9
2. Trova lo studente di cognome "Rossi"
3. Trova il primo studente della 3B

### Parte 4: Combinazioni
1. Studenti 3A con voto >= 7, mostra solo nome e voto
2. Studenti promossi (>=6), mostra nome completo
3. Studenti con poche assenze (<5) e buon voto (>=7)

## 🎯 Output Atteso

```
=== PARTE 1: FILTER ===
Studenti 3A: 4 studenti
Studenti con voto >= 7: 4 studenti
Studenti con < 5 assenze: 3 studenti

=== PARTE 2: MAP ===
Nomi completi: ["Mario Rossi", "Luigi Verdi", ...]

=== PARTE 3: FIND ===
Primo con voto >= 9: Sara Neri

=== PARTE 4: COMBINAZIONI ===
3A con voto >= 7:
  - Mario Rossi: 7.5
  - Luigi Verdi: 8.0
  - Sara Neri: 9.0
```

## 💡 Suggerimenti

- `filter()` non modifica array originale
- `map()` crea sempre nuovo array
- Usa chaining: `.filter().map()`
- `find()` restituisce primo match o `undefined`

## 🚀 Sfida Extra

1. **Sistema Biblioteca**: Dato array libri, trova tutti disponibili di un autore
2. **Negozio Online**: Filtra prodotti per categoria, applica sconto
3. **Registro Classe**: Crea pagella con media e assenze

## ➡️ Prossimo: ES16 - [PROGETTO] Sistema Gestione Biblioteca
