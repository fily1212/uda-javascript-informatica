# ES56 - useEffect Hook

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire cos'è un side effect
- Usare useEffect hook
- Sincronizzare con sistemi esterni
- Gestire lifecycle del componente

## 📚 Teoria - Side Effects in React

### Cos'è un Side Effect?

Finora abbiamo visto **rendering puro**: componenti che prendono props/state e ritornano JSX.

Ma spesso dobbiamo fare operazioni **fuori** dal rendering:
- 🌐 Chiamate API
- ⏱️ Timer (setTimeout, setInterval)
- 📡 WebSocket / EventSource
- 🗄️ LocalStorage
- 🖨️ Console.log
- 📊 Analytics tracking
- 📄 Modificare il DOM direttamente

Queste sono **side effects** (effetti collaterali) = operazioni che influenzano cose esterne al componente.

### Il Problema: Dove Mettere i Side Effects?

```typescript
// ❌ SBAGLIATO - Side effect durante il rendering!
function Contatore() {
  const [count, setCount] = useState(0);

  // Questo viene eseguito AD OGNI RENDERING!
  console.log("Rendering..."); // 😱 Troppi log!
  document.title = `Count: ${count}`; // 😱 Modifica DOM ogni volta!

  return <div>{count}</div>;
}
```

**Problema:** Il codice viene eseguito **ogni volta** che il componente renderizza, anche quando non vogliamo!

### La Soluzione: useEffect Hook

```typescript
import { useState, useEffect } from 'react'

function Contatore() {
  const [count, setCount] = useState(0);

  // ✅ Side effect nel posto giusto!
  useEffect(() => {
    document.title = `Count: ${count}`;
    console.log("Effect eseguito!");
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

**useEffect** = "Esegui questo codice DOPO il rendering"

### Anatomia di useEffect

```typescript
useEffect(() => {
  // 👉 Codice del side effect
  console.log("Sono un side effect!");
});
```

**Quando viene eseguito?**
- Dopo il **primo rendering** (mount)
- Dopo **ogni re-rendering** (update)

### useEffect con Dependency Array

Possiamo controllare **quando** l'effect viene eseguito con il **dependency array**:

```typescript
// 1. Esegue SEMPRE (ad ogni rendering)
useEffect(() => {
  console.log("Ogni rendering");
});

// 2. Esegue SOLO al mount (una volta)
useEffect(() => {
  console.log("Solo al mount!");
}, []); // 👈 Array vuoto

// 3. Esegue quando 'count' cambia
useEffect(() => {
  console.log("Count è cambiato:", count);
}, [count]); // 👈 Dipende da count

// 4. Esegue quando 'count' O 'name' cambiano
useEffect(() => {
  console.log("Count o Name cambiati");
}, [count, name]); // 👈 Dipende da entrambi
```

**Regola d'oro:** Metti nel dependency array **tutte** le variabili che usi nell'effect!

### Casi d'Uso Comuni

#### 1. Modificare il Titolo della Pagina

```typescript
function Contatore() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Hai cliccato ${count} volte`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Cliccato {count} volte
    </button>
  );
}
```

#### 2. Salvare in LocalStorage

```typescript
function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);

  // Salva todos quando cambiano
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log("Todos salvati!");
  }, [todos]);

  return <div>{/* todo list */}</div>;
}
```

#### 3. Chiamata API al Mount

```typescript
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Esegue solo al mount o quando userId cambia
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchUser();
  }, [userId]); // Ri-fetch quando userId cambia

  if (loading) return <p>Caricamento...</p>;
  return <div>Ciao, {user?.name}!</div>;
}
```

#### 4. Log per Debugging

```typescript
function DebugComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("=== Component Rendered ===");
    console.log("Count:", count);
    console.log("Timestamp:", new Date().toISOString());
  });

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### useEffect vs Rendering

```typescript
function Example() {
  const [count, setCount] = useState(0);

  // 1️⃣ Rendering (esegue per primo)
  console.log("1. Rendering con count =", count);

  // 2️⃣ Effect (esegue DOPO il rendering)
  useEffect(() => {
    console.log("2. Effect eseguito con count =", count);
  });

  return <button onClick={() => setCount(count + 1)}>Click</button>;
}
```

**Output al primo click:**
```
1. Rendering con count = 1
2. Effect eseguito con count = 1
```

**Ordine di esecuzione:**
1. React renderizza il componente → JSX
2. React aggiorna il DOM
3. **POI** esegue gli effects

## 💡 Esempio Completo - Orologio Digitale

```typescript
import { useState, useEffect } from 'react'
import './Orologio.css'

function OrologioDigitale() {
  const [tempo, setTempo] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);

  // Effect: Aggiorna ogni secondo
  useEffect(() => {
    console.log("Effect eseguito - Setup timer");

    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTempo(new Date());
    }, 1000);

    // Cleanup function (vedremo nel prossimo esercizio)
    return () => {
      console.log("Cleanup - Rimuovo timer");
      clearInterval(intervalId);
    };
  }, [isRunning]); // Re-run quando isRunning cambia

  // Effect: Aggiorna titolo pagina
  useEffect(() => {
    document.title = `⏰ ${tempo.toLocaleTimeString()}`;
  }, [tempo]);

  // Format time
  const ore = tempo.getHours().toString().padStart(2, '0');
  const minuti = tempo.getMinutes().toString().padStart(2, '0');
  const secondi = tempo.getSeconds().toString().padStart(2, '0');
  const data = tempo.toLocaleDateString('it-IT', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="orologio">
      <h1>⏰ Orologio Digitale</h1>

      <div className="display">
        <div className="time">
          <span className="digit">{ore}</span>
          <span className="separator">:</span>
          <span className="digit">{minuti}</span>
          <span className="separator">:</span>
          <span className="digit">{secondi}</span>
        </div>

        <div className="date">{data}</div>
      </div>

      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '⏸️ Pausa' : '▶️ Avvia'}
      </button>
    </div>
  );
}

export default OrologioDigitale;
```

## ✏️ Esercizio

### Parte 1: Document Title Updater
```typescript
function TitleUpdater() {
  const [name, setName] = useState("");

  // TODO: useEffect che aggiorna document.title
  // con "Benvenuto {name}" quando name cambia

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Il tuo nome"
    />
  );
}
```

### Parte 2: View Counter
```typescript
function ViewCounter() {
  const [views, setViews] = useState(0);

  // TODO: useEffect che incrementa views di 1
  // SOLO al primo mount (una volta)

  return <p>Visualizzazioni: {views}</p>;
}
```

### Parte 3: Logger Component
```typescript
function Logger() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  // TODO: 3 useEffect separati
  // 1. Log "Component mounted" solo al mount
  // 2. Log "Count changed: X" quando count cambia
  // 3. Log "Name or Count changed" quando uno dei due cambia

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}
```

### Parte 4: LocalStorage Persistence
```typescript
function NotePersistenti() {
  const [note, setNote] = useState("");

  // TODO: useEffect che:
  // 1. Al mount: carica note da localStorage
  // 2. Quando note cambia: salva in localStorage

  return (
    <textarea
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="Le tue note (salvate automaticamente)"
    />
  );
}
```

### Parte 5: Mouse Position Tracker
```typescript
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // TODO: Aggiungi event listener per mousemove
    // che aggiorna position.x e position.y

    function handleMouseMove(event: MouseEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener('mousemove', handleMouseMove);

    // TODO: Cleanup - rimuovi listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Solo al mount

  return (
    <div>
      <p>Mouse X: {position.x}</p>
      <p>Mouse Y: {position.y}</p>
    </div>
  );
}
```

## 🎯 Output Atteso

```
⏰ Orologio Digitale

┌─────────────────┐
│   14 : 32 : 05  │
│                 │
│ giovedì 23      │
│ novembre 2025   │
└─────────────────┘

[⏸️ Pausa]

---

Console:
Effect eseguito - Setup timer
```

## 💡 Suggerimenti

- **Import**: `import { useEffect } from 'react'`
- **After Rendering**: useEffect esegue DOPO il rendering
- **Dependency Array**: `[]` = solo mount, `[var]` = quando var cambia
- **Cleanup**: Ritorna una funzione per pulire (prossimo esercizio)
- **Multiple Effects**: OK avere più useEffect per separare concerns
- **Debugging**: Usa console.log dentro useEffect per capire quando esegue

## 🚀 Sfida Extra

1. **Counter con Log**: Conta quante volte il componente ha renderizzato
2. **Window Resize**: Traccia dimensioni finestra in real-time
3. **Scroll Position**: Mostra posizione scroll della pagina
4. **Online Status**: Mostra se utente è online/offline

## 📖 Concetti Chiave

- ✅ **Side Effect** = operazione esterna al rendering
- ✅ **useEffect** = hook per side effects
- ✅ **After Rendering** = effect esegue dopo rendering
- ✅ **Dependency Array** = controlla quando effect esegue
- ✅ **Empty Array `[]`** = solo al mount
- ✅ **Variables in Array** = ri-esegue quando cambiano
- ✅ **Multiple Effects** = separazione concerns

## ➡️ Prossimo: ES57 - useEffect Dependencies
