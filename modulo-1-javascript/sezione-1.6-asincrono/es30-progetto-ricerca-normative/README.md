# ES30 - [PROGETTO FINALE] Ricerca Normative

## 📘 Tipo: PROGETTO UDA - Diritto

## 🎯 Obiettivi Progetto
- App completa con Fetch
- Ricerca Costituzione/Codici
- Filtri avanzati
- Salvataggio preferiti

## 🔗 Connessione: Diritto - Ricerca Articoli Legali

## 📚 Funzionalità

**Core:**
- Ricerca full-text articoli
- Filtro per codice (Costituzione, Civile, Penale)
- Navigazione per numero articolo
- Visualizzazione testo completo

**Features:**
- Preferiti/segnalibri
- Note personali su articoli
- Storico ricerche
- Export risultati PDF/JSON
- Condivisione link articolo

**UI:**
- Barra ricerca
- Filtri laterali
- Lista risultati
- Dettaglio articolo
- Loading states

## 🏗️ Architettura
```javascript
const AppNormative = {
  // State
  state: {
    articoli: [],
    preferiti: [],
    filtri: {},
    loading: false
  },
  
  // API
  async cercaArticolo(query) {
    this.state.loading = true;
    try {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      this.state.articoli = data;
      return data;
    } catch (err) {
      this.handleError(err);
    } finally {
      this.state.loading = false;
    }
  },
  
  // Preferiti
  aggiungiPreferito(id) {
    const articolo = this.state.articoli.find(a => a.id === id);
    this.state.preferiti.push(articolo);
    this.salvaSuLocalStorage();
  },
  
  // Render
  render() {
    // UI update
  }
};
```

## ✏️ Implementazione

### Step 1: Setup Dati
Crea database locale con:
- 20+ articoli Costituzione
- Codice Civile (selezione)
- Codice Penale (selezione)

### Step 2: Ricerca
- Input search
- Filter per tipo codice
- Ricerca case-insensitive
- Highlight risultati

### Step 3: API Mock
```javascript
const mockAPI = {
  async search(query, filters) {
    // Simula delay
    await new Promise(r => setTimeout(r, 500));
    // Filtra database locale
    return database.filter(art => 
      art.testo.toLowerCase().includes(query.toLowerCase())
    );
  }
};
```

### Step 4: UI e Stati
- Loading spinner
- Error messages
- Empty states
- Risultati formattati

### Step 5: Persistenza
- localStorage per preferiti
- sessionStorage per ricerche

## 🧪 Dati Esempio
```javascript
const costituzione = [
  {
    id: 1,
    codice: "Costituzione",
    numero: 1,
    titolo: "Art. 1",
    testo: "L'Italia è una Repubblica democratica..."
  },
  // ...
];
```

## 💡 Suggerimenti
- async/await per tutte le operazioni
- try/catch robusto
- State management centralizzato
- localStorage JSON.parse/stringify

## 🚀 Estensioni
1. Vera API (Normattiva, EUR-Lex)
2. Commenti e annotazioni
3. Confronto versioni articoli
4. Chat AI per spiegazioni

## ➡️ Prossimo Modulo: TypeScript (ES31)
