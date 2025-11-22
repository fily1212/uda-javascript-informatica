# ES26 - [PROGETTO] Database Eventi Storici

## 📘 Tipo: PROGETTO UDA - Storia

## 🎯 Obiettivi Progetto
- Gestire database eventi storici
- CRUD completo con oggetti
- Filtri per periodo/tipo
- Export JSON

## 🔗 Connessione: Storia - Timeline Eventi

## 📚 Struttura Dati
```javascript
const eventi = [
  {
    id: 1,
    titolo: "Scoperta America",
    data: new Date(1492, 9, 12),
    tipo: "scoperta",
    luogo: "Bahamas",
    descrizione: "Colombo sbarca...",
    protagonisti: ["Cristoforo Colombo"]
  }
];
```

## 🏗️ Funzionalità

**CRUD:**
- aggiungiEvento(evento)
- rimuoviEvento(id)
- modificaEvento(id, dati)
- trovaEvento(id)

**Ricerca:**
- filtraPerPeriodo(inizio, fine)
- filtraPerTipo(tipo)
- filtraPerProtagonista(nome)
- cercaNelTitolo(query)

**Statistiche:**
- eventiPerSecolo()
- tipiEventi()
- protagonistiPiùAttivi()
- timelineCompleta()

**Export:**
- esportaJSON()
- esportaCSV()
- stampaTimeline()

## ✏️ Implementazione
1. Setup struttura dati (10+ eventi)
2. CRUD operations
3. Filtri e ricerca
4. Statistiche
5. Export/visualizzazione

## 🧪 Dati Esempio
- 1492: Scoperta America
- 1789: Rivoluzione Francese
- 1861: Unità d'Italia
- 1914-1918: Prima Guerra Mondiale
- 1969: Sbarco sulla Luna

## 💡 Suggerimenti
- Usa Date objects
- Object methods per statistiche
- Immutabilità con spread
- JSON.stringify per export

## 🚀 Estensioni
- Relazioni tra eventi
- Import da Wikipedia API
- Visualizzazione grafica timeline

## ➡️ Prossimo: ES27 - Promises
