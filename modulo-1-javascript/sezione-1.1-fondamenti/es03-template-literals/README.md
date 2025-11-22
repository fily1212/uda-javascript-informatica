# ES03 - Template Literals e Stringhe

## 📘 Tipo: UDA - Italiano

## 🎯 Obiettivi
- Utilizzare template literals con backticks
- Padroneggiare l'interpolazione di stringhe
- Conoscere i metodi principali delle stringhe
- Applicare le stringhe all'analisi letteraria
- Creare stringhe multilinea

## 🔗 Connessione Interdisciplinare
**Materia**: Italiano
**Argomento**: Analisi di citazioni letterarie, formattazione testi, conteggio caratteri e parole

## 📚 Teoria

### Template Literals (ES6)
```javascript
// Vecchio metodo
let nome = "Dante";
let msg = "Ciao, " + nome + "!";

// Template literals
let msg2 = `Ciao, ${nome}!`;  // Interpolazione
```

### Interpolazione
```javascript
let autore = "Manzoni";
let anno = 1827;
let frase = `"${autore}" pubblicò i Promessi Sposi nel ${anno}`;
```

### Stringhe Multilinea
```javascript
let poesia = `Nel mezzo del cammin di nostra vita
mi ritrovai per una selva oscura,
ché la diritta via era smarrita.`;
```

### Metodi String Comuni
```javascript
let testo = "I Promessi Sposi";

testo.length              // 17
testo.toUpperCase()       // "I PROMESSI SPOSI"
testo.toLowerCase()       // "i promessi sposi"
testo.includes("Promessi") // true
testo.startsWith("I")     // true
testo.endsWith("Sposi")   // true
testo.split(" ")          // ["I", "Promessi", "Sposi"]
testo.slice(2, 10)        // "Promessi"
testo.replace("I", "Gli") // "Gli Promessi Sposi"
```

## ✏️ Esercizio

### Parte 1: Citazioni Letterarie
Crea variabili per:
- Autore: "Dante Alighieri"
- Opera: "Divina Commedia"
- Anno: 1321
- Verso: "Nel mezzo del cammin di nostra vita"

Formatta una citazione:
```
"Verso" - Opera (Anno) di Autore
```

### Parte 2: Analisi Testo
Dato il verso:
```javascript
let verso = "Amor ch'a nullo amato amar perdona";
```

Calcola:
1. Numero caratteri totali
2. Numero parole (split)
3. Verso in maiuscolo
4. Verso in minuscolo
5. Prima parola
6. Ultima parola
7. Contiene "amor"? (case-insensitive)

### Parte 3: Formattazione
Crea una scheda libro con template literal multilinea:
```
=========================
Titolo: [titolo]
Autore: [autore]
Anno: [anno]
Genere: [genere]
=========================
```

### Parte 4: Manipolazione
Data una frase, crea funzioni per:
1. Contare vocali
2. Contare consonanti
3. Invertire la stringa
4. Verificare se è palindroma

## 🎯 Output Atteso
```
Citazione: "Nel mezzo del cammin di nostra vita"
  - Divina Commedia (1321) di Dante Alighieri

Analisi verso:
- Caratteri: 37
- Parole: 6
- Prima parola: Amor
- Ultima parola: perdona
- Contiene 'amor': true

=========================
Titolo: I Promessi Sposi
Autore: Alessandro Manzoni
Anno: 1842
Genere: Romanzo storico
=========================
```

## 💡 Suggerimenti
- Usa backticks ` per template literals
- `${}` funziona con qualsiasi espressione JavaScript
- `.trim()` rimuove spazi inizio/fine
- `.split(" ")` divide in array di parole
- `.toLowerCase()` prima di `.includes()` per ricerca case-insensitive

## 🚀 Sfida Extra
1. Crea un generatore di bibliografie in formato APA
2. Implementa un contatore sillabe semplice
3. Formatta testo poetico con indentazione
4. Crea un "censuratore" che sostituisce parole specifiche con asterischi

## 📖 Approfondimenti
- [MDN: Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [MDN: String Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## ➡️ Prossimo: ES04 - Type Coercion e Conversioni
