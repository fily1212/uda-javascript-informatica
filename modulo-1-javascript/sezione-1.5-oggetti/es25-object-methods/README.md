# ES25 - Object Methods Essenziali

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Object.keys, values, entries
- Object.assign per merge
- Iterare oggetti
- Convertire oggetti in array

## 📚 Teoria

### Object.keys() - Ottieni chiavi
```javascript
const persona = {nome: "Mario", età: 30, città: "Roma"};

const chiavi = Object.keys(persona);
console.log(chiavi);  // ["nome", "età", "città"]
```

### Object.values() - Ottieni valori
```javascript
const valori = Object.values(persona);
console.log(valori);  // ["Mario", 30, "Roma"]
```

### Object.entries() - Ottieni coppie [chiave, valore]
```javascript
const entries = Object.entries(persona);
console.log(entries);
// [["nome", "Mario"], ["età", 30], ["città", "Roma"]]

// Utile per iterare
for (let [chiave, valore] of Object.entries(persona)) {
  console.log(`${chiave}: ${valore}`);
}
```

### Object.assign() - Merge oggetti
```javascript
const base = {a: 1, b: 2};
const extra = {c: 3, d: 4};
const merged = Object.assign({}, base, extra);
console.log(merged);  // {a: 1, b: 2, c: 3, d: 4}

// Spread operator (alternativa moderna)
const merged2 = {...base, ...extra};
```

## 💡 Esempio Guidato - Statistiche Studente

```javascript
const studente = {
  nome: "Mario Rossi",
  classe: "3A",
  voti: {
    matematica: 8,
    italiano: 7,
    inglese: 9,
    storia: 6.5,
    scienze: 8.5
  }
};

// Calcola media voti
const materie = Object.keys(studente.voti);
const votiArray = Object.values(studente.voti);

let somma = 0;
for (let voto of votiArray) {
  somma += voto;
}
const media = somma / votiArray.length;

console.log(`Studente: ${studente.nome}`);
console.log(`Classe: ${studente.classe}`);
console.log(`Materie: ${materie.length}`);
console.log(`Media voti: ${media.toFixed(2)}`);

// Stampa voti per materia
console.log("\nVoti per materia:");
for (let [materia, voto] of Object.entries(studente.voti)) {
  console.log(`  ${materia}: ${voto}`);
}
```

## ✏️ Esercizio

### Parte 1: Analisi Prodotti
```javascript
const prodotto = {
  nome: "Laptop",
  marca: "Dell",
  prezzo: 800,
  disponibile: true,
  specifiche: {
    ram: "16GB",
    cpu: "i7",
    disco: "512GB SSD"
  }
};
```
1. Ottieni tutte le chiavi di `prodotto`
2. Ottieni tutti i valori
3. Itera le specifiche e stampale

### Parte 2: Merge Configurazioni
```javascript
const configDefault = {
  tema: "light",
  lingua: "it",
  notifiche: true
};

const configUtente = {
  tema: "dark",
  fontSize: 14
};
```
Crea `configFinale` che merge i due (configUtente vince su default)

### Parte 3: Statistiche Oggetto
Crea funzione `analizzaOggetto(obj)` che restituisce:
- Numero di proprietà
- Array delle chiavi
- Tipi dei valori

### Parte 4: Convertitore
Converti oggetto in array di stringhe formato "chiave: valore"
```javascript
const obj = {nome: "Mario", età: 30};
// Output: ["nome: Mario", "età: 30"]
```

## 💡 Suggerimenti
- Object.keys() utile per contare proprietà
- Object.entries() perfetto per iterazione
- Object.assign() crea shallow copy
- Spread {...} è più moderno di assign

## 🚀 Sfida Extra
Crea funzione che filtra oggetto mantenendo solo alcune chiavi

## ➡️ Prossimo: ES26 - [PROGETTO] Database Eventi Storici
