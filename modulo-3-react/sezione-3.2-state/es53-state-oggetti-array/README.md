# ES53 - State con Oggetti e Array

## 📘 Tipo: UDA - Storia + Informatica

## 🎯 Obiettivi
- Gestire state con oggetti complessi
- Gestire state con array
- Capire l'immutabilità
- **Applicazione**: Timeline eventi storici

## 📚 Teoria - Immutabilità e State Complessi

### Il Problema: Modificare Direttamente lo State

```typescript
// ❌ SBAGLIATO - Non funziona!
const [user, setUser] = useState({ nome: "Mario", età: 25 });

function cambiaEtà() {
  user.età = 26;  // ❌ Modifica diretta!
  // React NON rileva il cambiamento!
}
```

**Perché non funziona?** React confronta il riferimento dell'oggetto, non il contenuto. Se modifichi direttamente, il riferimento rimane lo stesso!

### La Soluzione: Creare Nuovi Oggetti

```typescript
// ✅ CORRETTO - Crea nuovo oggetto
function cambiaEtà() {
  setUser({ ...user, età: 26 });  // Spread operator!
}
```

### State con Oggetti - Immutabilità

#### Aggiornare una Proprietà

```typescript
const [persona, setPersona] = useState({
  nome: "Mario",
  cognome: "Rossi",
  età: 25,
  città: "Roma"
});

// Cambia solo età
setPersona({ ...persona, età: 26 });

// Cambia città
setPersona({ ...persona, città: "Milano" });

// Cambia più proprietà
setPersona({ ...persona, età: 26, città: "Milano" });
```

**Spread operator `...`** copia tutte le proprietà dell'oggetto originale, poi sovrascrive quelle specificate.

#### Oggetti Annidati

```typescript
const [user, setUser] = useState({
  nome: "Mario",
  indirizzo: {
    via: "Via Roma",
    città: "Milano",
    cap: "20100"
  }
});

// Cambia proprietà annidata
setUser({
  ...user,
  indirizzo: {
    ...user.indirizzo,
    città: "Roma"  // Cambia solo città
  }
});
```

### State con Array - Operazioni Immutabili

#### Aggiungere Elemento

```typescript
const [tasks, setTasks] = useState<string[]>([]);

// ❌ SBAGLIATO
tasks.push("Nuova task");  // Modifica diretta!

// ✅ CORRETTO - Spread
setTasks([...tasks, "Nuova task"]);

// ✅ CORRETTO - concat
setTasks(tasks.concat("Nuova task"));
```

#### Rimuovere Elemento

```typescript
const [items, setItems] = useState(["A", "B", "C"]);

// Rimuovi per indice
setItems(items.filter((_, index) => index !== 1));  // Rimuove "B"

// Rimuovi per valore
setItems(items.filter(item => item !== "B"));
```

#### Modificare Elemento

```typescript
const [numeri, setNumeri] = useState([1, 2, 3, 4, 5]);

// Raddoppia elemento all'indice 2
setNumeri(numeri.map((n, i) => i === 2 ? n * 2 : n));
```

#### Array di Oggetti

```typescript
interface Task {
  id: number;
  testo: string;
  completata: boolean;
}

const [tasks, setTasks] = useState<Task[]>([
  { id: 1, testo: "Studiare", completata: false },
  { id: 2, testo: "Esercizi", completata: true }
]);

// Aggiungi task
const nuovaTask: Task = { id: 3, testo: "Progetto", completata: false };
setTasks([...tasks, nuovaTask]);

// Rimuovi task
setTasks(tasks.filter(t => t.id !== 2));

// Toggle completata
setTasks(tasks.map(t =>
  t.id === 1 ? { ...t, completata: !t.completata } : t
));

// Modifica testo
setTasks(tasks.map(t =>
  t.id === 1 ? { ...t, testo: "Nuovo testo" } : t
));
```

## 💡 Esempio Guidato - Timeline Storica (UDA Storia)

```typescript
import { useState } from 'react'

interface EventoStorico {
  id: number;
  anno: number;
  titolo: string;
  descrizione: string;
  importanza: "bassa" | "media" | "alta";
}

function TimelineStorica() {
  const [eventi, setEventi] = useState<EventoStorico[]>([
    {
      id: 1,
      anno: 1492,
      titolo: "Scoperta dell'America",
      descrizione: "Cristoforo Colombo raggiunge le Americhe",
      importanza: "alta"
    },
    {
      id: 2,
      anno: 1789,
      titolo: "Rivoluzione Francese",
      descrizione: "Presa della Bastiglia",
      importanza: "alta"
    }
  ]);

  const [formData, setFormData] = useState({
    anno: 2000,
    titolo: "",
    descrizione: "",
    importanza: "media" as const
  });

  const aggiungiEvento = () => {
    if (!formData.titolo) return;

    const nuovoEvento: EventoStorico = {
      id: Date.now(),
      anno: formData.anno,
      titolo: formData.titolo,
      descrizione: formData.descrizione,
      importanza: formData.importanza
    };

    setEventi([...eventi, nuovoEvento]);

    // Reset form
    setFormData({
      anno: 2000,
      titolo: "",
      descrizione: "",
      importanza: "media"
    });
  };

  const rimuoviEvento = (id: number) => {
    setEventi(eventi.filter(e => e.id !== id));
  };

  const cambiaImportanza = (id: number) => {
    setEventi(eventi.map(e => {
      if (e.id === id) {
        const nuovaImportanza =
          e.importanza === "bassa" ? "media" :
          e.importanza === "media" ? "alta" : "bassa";
        return { ...e, importanza: nuovaImportanza };
      }
      return e;
    }));
  };

  // Ordina per anno
  const eventiOrdinati = [...eventi].sort((a, b) => a.anno - b.anno);

  return (
    <div className="timeline">
      <h1>📜 Timeline Storica</h1>

      {/* Form Aggiungi */}
      <div className="form">
        <input
          type="number"
          value={formData.anno}
          onChange={(e) => setFormData({ ...formData, anno: Number(e.target.value) })}
          placeholder="Anno"
        />
        <input
          type="text"
          value={formData.titolo}
          onChange={(e) => setFormData({ ...formData, titolo: e.target.value })}
          placeholder="Titolo evento"
        />
        <textarea
          value={formData.descrizione}
          onChange={(e) => setFormData({ ...formData, descrizione: e.target.value })}
          placeholder="Descrizione"
        />
        <select
          value={formData.importanza}
          onChange={(e) => setFormData({ ...formData, importanza: e.target.value as any })}
        >
          <option value="bassa">Bassa</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <button onClick={aggiungiEvento}>Aggiungi Evento</button>
      </div>

      {/* Timeline */}
      <div className="eventi">
        {eventiOrdinati.map(evento => (
          <div key={evento.id} className={`evento importanza-${evento.importanza}`}>
            <div className="anno">{evento.anno}</div>
            <div className="contenuto">
              <h3>{evento.titolo}</h3>
              <p>{evento.descrizione}</p>
              <span className="badge">{evento.importanza}</span>
            </div>
            <div className="azioni">
              <button onClick={() => cambiaImportanza(evento.id)}>
                Cambia Importanza
              </button>
              <button onClick={() => rimuoviEvento(evento.id)}>
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>

      <p>Eventi totali: {eventi.length}</p>
    </div>
  );
}

export default TimelineStorica;
```

## ✏️ Esercizio

### Parte 1: Profilo Utente (Oggetto)
```typescript
interface Profilo {
  nome: string;
  email: string;
  bio: string;
  preferences: {
    tema: "light" | "dark";
    notifiche: boolean;
  };
}

function ProfiloUtente() {
  const [profilo, setProfilo] = useState<Profilo>({
    nome: "",
    email: "",
    bio: "",
    preferences: {
      tema: "light",
      notifiche: true
    }
  });

  // TODO: Implementa funzioni per:
  // - Cambiare nome
  // - Cambiare email
  // - Toggle tema
  // - Toggle notifiche
}
```

### Parte 2: Shopping Cart (Array di Oggetti)
```typescript
interface Prodotto {
  id: number;
  nome: string;
  prezzo: number;
  quantità: number;
}

function CarrelloSpesa() {
  const [carrello, setCarrello] = useState<Prodotto[]>([]);

  // TODO: Implementa:
  // - aggiungiProdotto(prodotto)
  // - rimuoviProdotto(id)
  // - aumentaQuantità(id)
  // - diminuisciQuantità(id)
  // - svuotaCarrello()
  // - calcolaTotale()
}
```

### Parte 3: Todo List Completa
```typescript
interface Todo {
  id: number;
  testo: string;
  completata: boolean;
  priorità: "bassa" | "media" | "alta";
}

function TodoListAvanzata() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtro, setFiltro] = useState<"tutte" | "attive" | "completate">("tutte");

  // TODO: Implementa tutte le funzioni CRUD
}
```

## 🎯 Output Atteso

```
📜 Timeline Storica

[Anno: 1492] [Titolo: ...] [Descrizione: ...]
[Aggiungi Evento]

────────────────────

1492 | Scoperta dell'America
      Cristoforo Colombo raggiunge le Americhe
      [alta] [Cambia Importanza] [❌]

1789 | Rivoluzione Francese
      Presa della Bastiglia
      [alta] [Cambia Importanza] [❌]

Eventi totali: 2
```

## 💡 Suggerimenti

- **Spread `...`**: Copia oggetto/array creandone uno nuovo
- **filter()**: Rimuovi elementi
- **map()**: Modifica elementi
- **concat()** o `[...array, item]`: Aggiungi elementi
- **Immutabilità**: MAI modificare direttamente state
- **Oggetti annidati**: Spread multipli necessari

## 🚀 Sfida Extra

1. **Undo/Redo**: Salva history degli stati precedenti
2. **Local Storage**: Persisti state nel browser
3. **Bulk Operations**: Seleziona multipli e opera su tutti
4. **Ordinamento**: Ordina array per diversi criteri

## 📖 Concetti Chiave

- ✅ **Immutabilità** = non modificare mai direttamente
- ✅ **Spread operator `...`** = copia + modifica
- ✅ **filter()** = rimuovi da array
- ✅ **map()** = trasforma array
- ✅ **Oggetti annidati** = spread multipli
- ✅ **Array di oggetti** = pattern comune in React

## 🎓 Connessione con Storia

Applicazione pratica alla storia:
- **Timeline**: Visualizzazione cronologica eventi
- **Periodizzazione**: Classificazione per importanza
- **Relazioni causa-effetto**: Collegamenti tra eventi
- **Storiografia**: Gestione fonti e interpretazioni

## ➡️ Prossimo: ES54 - Lifting State Up
