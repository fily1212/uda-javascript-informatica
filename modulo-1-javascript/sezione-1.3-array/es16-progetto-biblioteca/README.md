# ES16 - [PROGETTO] Sistema Gestione Biblioteca

## 📘 Tipo: PROGETTO UDA - Italiano

## 🎯 Obiettivi Progetto
- Applicare tutti i metodi array
- Creare CRUD completo
- Gestire ricerca e filtri
- Generare statistiche

## 🔗 Connessione: Italiano - Catalogazione Opere Letterarie

## 📚 Specifiche Progetto

### Struttura Dati
```javascript
let biblioteca = [
  {
    id: 1,
    titolo: "I Promessi Sposi",
    autore: "Alessandro Manzoni",
    anno: 1827,
    genere: "romanzo",
    pagine: 624,
    disponibile: true
  },
  // ... altri libri
];
```

### Funzionalità Richieste

**CRUD Operations:**
1. `aggiungiLibro(libro)` - Aggiunge nuovo libro
2. `rimuoviLibro(id)` - Rimuove per ID
3. `modificaLibro(id, nuoviDati)` - Aggiorna libro
4. `trovaLibro(id)` - Trova per ID

**Ricerca e Filtri:**
5. `cercaPerAutore(autore)` - Filtra per autore
6. `cercaPerGenere(genere)` - Filtra per genere
7. `cercaPerTitolo(parola)` - Ricerca parziale titolo
8. `libriDisponibili()` - Solo disponibili
9. `libriPerPeriodo(annoInizio, annoFine)` - Range anni

**Statistiche:**
10. `totaleLibri()` - Conta libri
11. `mediaPagine()` - Media pagine
12. `autoriPiùPresenti()` - Top 3 autori
13. `generiPresenti()` - Array generi unici
14. `libroPiùLungo()` - Libro con più pagine

**Ordinamento:**
15. `ordinaPerTitolo()` - Alfabetico
16. `ordinaPerAnno()` - Cronologico
17. `ordinaPerPagine()` - Per lunghezza

## 🏗️ Architettura

```javascript
const Biblioteca = {
  libri: [],
  
  // CRUD
  aggiungiLibro(libro) { /*...*/ },
  rimuoviLibro(id) { /*...*/ },
  modificaLibro(id, dati) { /*...*/ },
  trovaLibro(id) { /*...*/ },
  
  // Ricerca
  cercaPerAutore(autore) { /*...*/ },
  cercaPerGenere(genere) { /*...*/ },
  
  // Statistiche
  totaleLibri() { /*...*/ },
  mediaPagine() { /*...*/ },
  
  // Export
  esportaJSON() { /*...*/ },
  importaJSON(json) { /*...*/ }
};
```

## ✏️ Implementazione

### Step 1: Setup
1. Crea oggetto Biblioteca
2. Inizializza con 5-10 libri italiani
3. Test operazioni base

### Step 2: CRUD
Implementa le 4 operazioni CRUD con validazione:
- ID auto-incrementale
- Controllo campi obbligatori
- Gestione errori

### Step 3: Ricerca
Implementa filtri usando:
- `filter()` per ricerche
- `find()` per match unici
- `includes()` per ricerca parziale

### Step 4: Statistiche
Usa `reduce()`, `map()`, `sort()` per calcoli e ordinamento

### Step 5: Export/Import
Implementa JSON.stringify/parse per persistenza

## 🧪 Test

```javascript
// Test CRUD
Biblioteca.aggiungiLibro({
  titolo: "Divina Commedia",
  autore: "Dante Alighieri",
  anno: 1321,
  genere: "poesia",
  pagine: 798,
  disponibile: true
});

// Test ricerca
let manzoniani = Biblioteca.cercaPerAutore("Manzoni");
console.log(manzoniani.length);  // 1

// Test statistiche
let media = Biblioteca.mediaPagine();
console.log(`Media pagine: ${media}`);
```

## 🎯 Output Atteso

```
=== BIBLIOTECA LETTERARIA ===
Totale libri: 15
Libri disponibili: 12
Media pagine: 412

Top 3 Autori:
1. Dante Alighieri (3 opere)
2. Alessandro Manzoni (2 opere)
3. Italo Calvino (2 opere)

Generi: romanzo, poesia, racconto, saggio

Libro più lungo: "Promessi Sposi" (624 pagine)

=== RICERCA ===
Libri del '900: 8 risultati
Romanzi disponibili: 5 risultati
```

## 💡 Suggerimenti
- Usa array methods, non for loops
- Immutabilità: copia array prima di modificare
- Validazione input
- ID unici e auto-increment
- Case-insensitive per ricerche

## 🚀 Estensioni
1. Sistema prestito/restituzione
2. Rating libri (1-5 stelle)
3. Note e recensioni
4. Categorizzazione complessa (sottogeneri)
5. Import da file CSV

## 📖 Risorse Letterarie
Libri consigliati per dataset:
- Dante: Divina Commedia, Vita Nova
- Manzoni: Promessi Sposi
- Calvino: Il Barone Rampante, Il Visconte Dimezzato
- Pirandello: Il Fu Mattia Pascal
- Svevo: La Coscienza di Zeno

## ➡️ Prossimo: ES17 - Function Declaration
