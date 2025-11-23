# ES57 - useEffect Dependencies

## 📘 Tipo: UDA - TLC + Informatica

## 🎯 Obiettivi
- Capire il dependency array
- Evitare infinite loops
- Ottimizzare performance
- **Applicazione**: Monitoraggio segnale rete

## 📚 Teoria - Dependency Array: Controllo Preciso

### Il Dependency Array

Il secondo parametro di `useEffect` è un **array di dipendenze** che controlla **quando** l'effect viene eseguito.

```typescript
useEffect(() => {
  // Effect code
}, [dep1, dep2, dep3]); // 👈 Dependency array
```

**Regola:** L'effect si esegue quando **una qualsiasi** delle dipendenze cambia.

### I Tre Casi Fondamentali

#### 1. Nessun Dependency Array → Esegue SEMPRE

```typescript
useEffect(() => {
  console.log("Ogni rendering");
});
// Esegue ad OGNI rendering del componente
```

**Quando usare:** Quasi mai! Troppo frequente.

#### 2. Array Vuoto `[]` → Esegue SOLO al Mount

```typescript
useEffect(() => {
  console.log("Solo una volta al mount");
}, []); // 👈 Array vuoto
```

**Quando usare:**
- Setup iniziali (chiamate API una tantum)
- Event listeners globali
- Inizializzazioni che servono solo una volta

#### 3. Array con Variabili → Esegue Quando Cambiano

```typescript
useEffect(() => {
  console.log("Count o Name cambiati");
}, [count, name]); // 👈 Dipende da count e name
```

**Quando usare:**
- Quando l'effect dipende da props o state
- Sincronizzazioni basate su dati specifici

### Regola Fondamentale: Exhaustive Dependencies

**IMPORTANTE:** Metti nel dependency array **tutte** le variabili che usi nell'effect!

```typescript
// ❌ SBAGLIATO - count usato ma non nelle deps
function Componente() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Count:", count); // Usa count...
  }, [name]); // ...ma dipende solo da name! ❌

  return <div>...</div>;
}

// ✅ CORRETTO - tutte le variabili usate sono nelle deps
useEffect(() => {
  console.log("Count:", count);
}, [count]); // ✅ count è nelle dependencies
```

**Perché è importante?** Altrimenti l'effect usa valori **vecchi** (stale)!

### Il Problema: Infinite Loop

```typescript
// ❌ INFINITE LOOP!
function Componente() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Cambia count...
  }, [count]); // ...che triggera l'effect...
  // ...che cambia count...
  // ...che triggera l'effect...
  // LOOP INFINITO! 😱

  return <div>{count}</div>;
}
```

**Come evitare:**
1. Non cambiare state che è nelle dependencies
2. Usa functional updates: `setCount(c => c + 1)`
3. Rimuovi la dependency se non necessaria

### Dependencies con Oggetti e Array

**ATTENZIONE:** Oggetti e array vengono **ri-creati** ad ogni rendering!

```typescript
// ❌ PROBLEMA - options è un nuovo oggetto ogni volta!
function Componente() {
  const options = { filter: "all" }; // Nuovo oggetto ad ogni rendering

  useEffect(() => {
    fetchData(options);
  }, [options]); // Effect esegue SEMPRE!
}

// ✅ SOLUZIONE 1 - Sposta dentro effect
useEffect(() => {
  const options = { filter: "all" };
  fetchData(options);
}, []); // Ora options non è dependency

// ✅ SOLUZIONE 2 - Usa solo proprietà primitive
useEffect(() => {
  fetchData({ filter });
}, [filter]); // Dipende da 'filter' (string)

// ✅ SOLUZIONE 3 - useMemo (vediamo dopo)
const options = useMemo(() => ({ filter: "all" }), []);
```

### Casi Pratici

#### Fetch Data al Mount (Una Volta)

```typescript
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    }

    fetchUsers();
  }, []); // 👈 Solo al mount

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

#### Fetch Data Quando Props Cambiano

```typescript
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data);
    }

    fetchUser();
  }, [userId]); // 👈 Ri-fetch quando userId cambia

  return <div>{user?.name}</div>;
}
```

#### Sincronizzare con LocalStorage

```typescript
function Settings() {
  const [theme, setTheme] = useState("light");

  // Carica al mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  // Salva quando theme cambia
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
    Toggle Theme
  </button>;
}
```

## 💡 Esempio Completo - Monitoraggio Segnale Rete (UDA TLC)

```typescript
import { useState, useEffect } from 'react'
import './MonitoraggioRete.css'

interface StatoRete {
  online: boolean;
  tipo: string;
  velocitaEffettiva?: number;
  latenza: number;
}

function MonitoraggioRete() {
  const [stato, setStato] = useState<StatoRete>({
    online: navigator.onLine,
    tipo: 'unknown',
    latenza: 0
  });

  const [log, setLog] = useState<string[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Effect 1: Event listeners per online/offline
  useEffect(() => {
    console.log("Setup online/offline listeners");

    function handleOnline() {
      aggiungiLog("✅ Connessione ripristinata");
      setStato(prev => ({ ...prev, online: true }));
    }

    function handleOffline() {
      aggiungiLog("❌ Connessione persa");
      setStato(prev => ({ ...prev, online: false }));
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      console.log("Cleanup online/offline listeners");
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Solo al mount

  // Effect 2: Rileva tipo connessione
  useEffect(() => {
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      setStato(prev => ({
        ...prev,
        tipo: conn?.effectiveType || 'unknown',
        velocitaEffettiva: conn?.downlink
      }));
    }
  }, [stato.online]); // Quando online status cambia

  // Effect 3: Ping periodico (solo se autoRefresh è attivo)
  useEffect(() => {
    if (!autoRefresh || !stato.online) return;

    console.log("Setup ping interval");

    const intervalId = setInterval(async () => {
      const start = Date.now();
      try {
        await fetch('/api/ping', { method: 'HEAD' });
        const latenza = Date.now() - start;
        setStato(prev => ({ ...prev, latenza }));
        aggiungiLog(`📡 Ping: ${latenza}ms`);
      } catch (err) {
        aggiungiLog("⚠️ Ping fallito");
      }
    }, 5000);

    return () => {
      console.log("Cleanup ping interval");
      clearInterval(intervalId);
    };
  }, [autoRefresh, stato.online]); // Dipende da autoRefresh e online

  // Effect 4: Update document title
  useEffect(() => {
    document.title = stato.online
      ? `🟢 Online - ${stato.latenza}ms`
      : '🔴 Offline';
  }, [stato.online, stato.latenza]);

  function aggiungiLog(messaggio: string) {
    const timestamp = new Date().toLocaleTimeString();
    setLog(prev => [`[${timestamp}] ${messaggio}`, ...prev].slice(0, 10));
  }

  function testConnessione() {
    aggiungiLog("🔍 Test connessione manuale...");
    setStato(prev => ({ ...prev, latenza: Math.random() * 100 }));
  }

  // Determina qualità connessione
  let qualita = "Eccellente";
  let colore = "green";
  if (stato.latenza > 100) { qualita = "Buona"; colore = "yellow"; }
  if (stato.latenza > 200) { qualita = "Discreta"; colore = "orange"; }
  if (stato.latenza > 500) { qualita = "Scarsa"; colore = "red"; }
  if (!stato.online) { qualita = "Offline"; colore = "gray"; }

  return (
    <div className="monitoraggio-rete">
      <h1>📡 Monitoraggio Rete (TLC)</h1>

      {/* Stato Principale */}
      <div className={`stato-card ${stato.online ? 'online' : 'offline'}`}>
        <div className="led" style={{ backgroundColor: colore }}></div>
        <h2>{stato.online ? '🟢 Online' : '🔴 Offline'}</h2>

        {stato.online && (
          <div className="dettagli">
            <p><strong>Tipo:</strong> {stato.tipo}</p>
            <p><strong>Latenza:</strong> {stato.latenza.toFixed(0)} ms</p>
            <p><strong>Qualità:</strong> {qualita}</p>
            {stato.velocitaEffettiva && (
              <p><strong>Velocità:</strong> {stato.velocitaEffettiva} Mbps</p>
            )}
          </div>
        )}
      </div>

      {/* Controlli */}
      <div className="controlli">
        <button onClick={testConnessione} disabled={!stato.online}>
          🔍 Test Connessione
        </button>

        <label>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />
          Auto-refresh (5s)
        </label>
      </div>

      {/* Log Eventi */}
      <div className="log-eventi">
        <h3>📋 Log Eventi</h3>
        <ul>
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>

      {/* Info TLC */}
      <div className="info-tlc">
        <h4>📚 Concetti TLC</h4>
        <ul>
          <li><strong>Latenza:</strong> Tempo di risposta (RTT)</li>
          <li><strong>Tipo connessione:</strong> 4g, 3g, 2g, wifi</li>
          <li><strong>Downlink:</strong> Velocità download stimata</li>
          <li><strong>Online/Offline:</strong> Stato connettività</li>
        </ul>
      </div>
    </div>
  );
}

export default MonitoraggioRete;
```

## ✏️ Esercizio

### Parte 1: Debug Dependencies
Trova e sistema il bug:

```typescript
function BuggyComponent() {
  const [count, setCount] = useState(0);
  const [double, setDouble] = useState(0);

  // 🐛 BUG: Trova il problema!
  useEffect(() => {
    setDouble(count * 2);
  }, []); // Cosa manca?

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {double}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

### Parte 2: User Search
```typescript
function UserSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // TODO: useEffect che:
  // - Fa fetch quando query cambia
  // - Ma solo se query.length >= 3
  // Dependencies: [query]

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca utente..."
      />
      <ul>
        {results.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
```

### Parte 3: Multi-Counter Sync
```typescript
function MultiCounter() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [total, setTotal] = useState(0);

  // TODO: useEffect che aggiorna total
  // quando count1 O count2 cambiano
  // Dependencies: [count1, count2]

  return (
    <div>
      <button onClick={() => setCount1(count1 + 1)}>Count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count2: {count2}</button>
      <p>Total: {total}</p>
    </div>
  );
}
```

## 🎯 Output Atteso

```
📡 Monitoraggio Rete (TLC)

┌─────────────────────┐
│ 🟢 Online           │
│                     │
│ Tipo: 4g            │
│ Latenza: 45 ms      │
│ Qualità: Eccellente │
│ Velocità: 10 Mbps   │
└─────────────────────┘

[🔍 Test Connessione]
☑ Auto-refresh (5s)

📋 Log Eventi
[14:32:05] 📡 Ping: 45ms
[14:32:00] 📡 Ping: 48ms
[14:31:55] ✅ Connessione ripristinata
```

## 💡 Suggerimenti

- **Exhaustive Deps**: Metti TUTTE le variabili usate
- **ESLint**: Usa `eslint-plugin-react-hooks` per avvisi
- **Infinite Loop**: Non cambiare state che è nelle deps
- **Oggetti/Array**: Evitali nelle deps o usa useMemo
- **Empty Array `[]`**: Solo per setup una tantum
- **Multiple Dependencies**: Effetto esegue se UNA cambia

## 📖 Concetti Chiave

- ✅ **Dependency Array** = controlla quando effect esegue
- ✅ **Exhaustive Dependencies** = tutte le variabili usate
- ✅ **Infinite Loop** = evita cambiare deps dentro effect
- ✅ **Stale Closures** = deps mancanti causano valori vecchi
- ✅ **Object Identity** = oggetti/array si ri-creano
- ✅ **Primitive Values** = meglio usare string/number/boolean

## 🎓 Connessione con TLC

- **Latenza** (RTT): Round-Trip Time in millisecondi
- **Tipo connessione**: 4G, 3G, WiFi, Ethernet
- **Qualità segnale**: Basata su latenza e velocità
- **Monitoraggio**: Ping periodico per test connessione
- **Eventi rete**: Online/Offline detection

## ➡️ Prossimo: ES58 - useEffect Cleanup
