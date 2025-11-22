# ES47 - JSX e Rendering

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire cos'è JSX e come funziona
- Usare espressioni JavaScript in JSX
- Rendering condizionale (mostrare/nascondere elementi)
- Renderizzare liste con map()

## 📚 Teoria - JSX: HTML dentro JavaScript!

### Cos'è JSX?

**JSX** (JavaScript XML) è una sintassi che ti permette di scrivere **HTML dentro JavaScript**.

```typescript
// Senza JSX (React.createElement) - difficile! 😰
return React.createElement('div', null,
  React.createElement('h1', null, 'Ciao!')
);

// Con JSX - facile! 😊
return (
  <div>
    <h1>Ciao!</h1>
  </div>
);
```

**JSX NON è HTML!** È JavaScript che _assomiglia_ a HTML. Vite/Babel lo trasforma in JavaScript normale.

### Regole Fondamentali di JSX

#### 1️⃣ Un Solo Elemento Root

```typescript
// ❌ ERRORE - due elementi root
function App() {
  return (
    <h1>Titolo</h1>
    <p>Paragrafo</p>
  );
}

// ✅ CORRETTO - un div che contiene tutto
function App() {
  return (
    <div>
      <h1>Titolo</h1>
      <p>Paragrafo</p>
    </div>
  );
}

// ✅ ALTERNATIVA - Fragment (<>)
function App() {
  return (
    <>
      <h1>Titolo</h1>
      <p>Paragrafo</p>
    </>
  );
}
```

**Fragment** (`<>...</>`) = contenitore invisibile, non crea un div nel DOM.

#### 2️⃣ className invece di class

```typescript
// ❌ ERRORE
<div class="container"></div>

// ✅ CORRETTO
<div className="container"></div>
```

Perché? Perché `class` è una parola riservata in JavaScript!

#### 3️⃣ CamelCase per Attributi

```typescript
// HTML normale
<button onclick="doSomething()"></button>

// JSX
<button onClick={doSomething}></button>
```

Altri esempi:
- `onclick` → `onClick`
- `onchange` → `onChange`
- `tabindex` → `tabIndex`

#### 4️⃣ Chiudi Tutti i Tag

```typescript
// ❌ ERRORE
<img src="foto.jpg">
<input type="text">

// ✅ CORRETTO
<img src="foto.jpg" />
<input type="text" />
```

### Espressioni JavaScript in JSX - Le Graffe {}

Puoi inserire **qualsiasi espressione JavaScript** dentro le graffe `{}`:

```typescript
function Saluto() {
  const nome = "Mario";
  const età = 18;
  const classe = "5A";

  return (
    <div>
      <h1>Ciao, {nome}!</h1>
      <p>Hai {età} anni.</p>
      <p>Classe: {classe}</p>
      <p>Anno di nascita: {2024 - età}</p>
      <p>Nome maiuscolo: {nome.toUpperCase()}</p>
    </div>
  );
}
```

**Output:**
```
Ciao, Mario!
Hai 18 anni.
Classe: 5A
Anno di nascita: 2006
Nome maiuscolo: MARIO
```

**Cosa puoi mettere in {}:**
- ✅ Variabili: `{nome}`
- ✅ Espressioni: `{2 + 2}`, `{età * 2}`
- ✅ Chiamate di funzione: `{calcolaMedia()}`
- ✅ Metodi: `{nome.toUpperCase()}`
- ✅ Template literals: `` {`Ciao ${nome}`} ``
- ❌ **NON** statement (`if`, `for`, `while`)

### Rendering Condizionale

#### Metodo 1: Operatore Ternario (? :)

```typescript
function Stato() {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? (
        <p>✅ Sei loggato!</p>
      ) : (
        <p>❌ Devi fare login</p>
      )}
    </div>
  );
}
```

**Sintassi:** `condizione ? se_vero : se_falso`

#### Metodo 2: Operatore && (AND logico)

```typescript
function Benvenuto() {
  const isLoggedIn = true;
  const username = "Mario";

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoggedIn && <p>Benvenuto, {username}!</p>}
      {isLoggedIn && <button>Logout</button>}
    </div>
  );
}
```

**Come funziona &&:**
- Se `isLoggedIn` è `true`, mostra l'elemento
- Se `isLoggedIn` è `false`, non mostra nulla

#### Metodo 3: Variabile + If Normale

```typescript
function Messaggio() {
  const voto = 8;
  let messaggio;

  if (voto >= 6) {
    messaggio = <p style={{color: 'green'}}>✅ Promosso!</p>;
  } else {
    messaggio = <p style={{color: 'red'}}>❌ Bocciato</p>;
  }

  return (
    <div>
      <h2>Risultato: {voto}</h2>
      {messaggio}
    </div>
  );
}
```

### Renderizzare Liste con map()

Per mostrare un array di elementi, usa il metodo **`map()`**:

```typescript
function ListaFrutta() {
  const frutta = ["🍎 Mela", "🍌 Banana", "🍊 Arancia", "🍇 Uva"];

  return (
    <div>
      <h2>Lista della Spesa</h2>
      <ul>
        {frutta.map((elemento, index) => (
          <li key={index}>{elemento}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Output:**
```
Lista della Spesa
• 🍎 Mela
• 🍌 Banana
• 🍊 Arancia
• 🍇 Uva
```

#### La Proprietà key - IMPORTANTE!

React ha bisogno di `key` per identificare ogni elemento della lista:

```typescript
// ✅ CORRETTO - con key
{frutta.map((item, index) => (
  <li key={index}>{item}</li>
))}

// ❌ ERRORE - senza key (warning nella console)
{frutta.map(item => (
  <li>{item}</li>
))}
```

**Best practice:** Usa un ID unico invece dell'index quando possibile:

```typescript
const studenti = [
  { id: 1, nome: "Mario", voto: 8 },
  { id: 2, nome: "Luigi", voto: 7 },
  { id: 3, nome: "Anna", voto: 9 }
];

return (
  <ul>
    {studenti.map(studente => (
      <li key={studente.id}>
        {studente.nome}: {studente.voto}
      </li>
    ))}
  </ul>
);
```

## 💡 Esempio Guidato Completo - Card Prodotti

```typescript
function ListaProdotti() {
  const prodotti = [
    { id: 1, nome: "Laptop", prezzo: 899, disponibile: true },
    { id: 2, nome: "Mouse", prezzo: 25, disponibile: true },
    { id: 3, nome: "Tastiera", prezzo: 75, disponibile: false },
    { id: 4, nome: "Monitor", prezzo: 299, disponibile: true }
  ];

  const isLoggedIn = true;

  return (
    <div className="negozio">
      <h1>🛒 Il Mio Negozio</h1>

      {/* Messaggio di benvenuto condizionale */}
      {isLoggedIn ? (
        <p>✅ Benvenuto! Puoi acquistare.</p>
      ) : (
        <p>⚠️ Fai login per acquistare</p>
      )}

      <div className="prodotti">
        {prodotti.map(prodotto => (
          <div key={prodotto.id} className="card">
            <h3>{prodotto.nome}</h3>
            <p className="prezzo">€{prodotto.prezzo}</p>

            {/* Disponibilità condizionale */}
            {prodotto.disponibile ? (
              <span className="badge verde">✅ Disponibile</span>
            ) : (
              <span className="badge rosso">❌ Esaurito</span>
            )}

            {/* Bottone solo se disponibile E loggato */}
            {prodotto.disponibile && isLoggedIn && (
              <button>Aggiungi al carrello</button>
            )}
          </div>
        ))}
      </div>

      {/* Totale prodotti */}
      <p>Prodotti totali: {prodotti.length}</p>
      <p>Disponibili: {prodotti.filter(p => p.disponibile).length}</p>
    </div>
  );
}
```

## ✏️ Esercizio

### Parte 1: Espressioni Base
Crea un componente `InfoPersonale.tsx`:

```typescript
function InfoPersonale() {
  const nome = "Mario Rossi";
  const annoNascita = 2006;
  const materia = "Informatica";
  const votoMedio = 7.5;

  return (
    <div className="info">
      <h2>Scheda Studente</h2>
      {/* Mostra nome */}
      {/* Mostra età calcolata (2024 - annoNascita) */}
      {/* Mostra materia preferita */}
      {/* Mostra voto medio */}
      {/* Mostra se è promosso (votoMedio >= 6) */}
    </div>
  );
}
```

### Parte 2: Rendering Condizionale
Crea un componente `StatoMeteo.tsx`:

```typescript
function StatoMeteo() {
  const temperatura = 22;
  const piove = false;

  return (
    <div className="meteo">
      <h2>🌤️ Meteo Oggi</h2>
      <p>Temperatura: {temperatura}°C</p>

      {/* Se temp > 25: "🔥 Fa caldo!" */}
      {/* Se temp < 10: "🥶 Fa freddo!" */}
      {/* Altrimenti: "😊 Temperatura ideale" */}

      {/* Se piove, mostra "☔ Porta l'ombrello!" */}

      {/* Se temp > 25 E NON piove, mostra "🏖️ Perfetto per la spiaggia!" */}
    </div>
  );
}
```

### Parte 3: Liste Semplici
Crea un componente `ListaCorsi.tsx`:

```typescript
function ListaCorsi() {
  const corsi = [
    "Informatica",
    "Matematica",
    "Italiano",
    "Storia",
    "Inglese"
  ];

  return (
    <div>
      <h2>📚 I Miei Corsi</h2>
      <ul>
        {/* Usa map() per mostrare ogni corso in un <li> */}
      </ul>
      <p>Totale corsi: {/* mostra numero corsi */}</p>
    </div>
  );
}
```

### Parte 4: Liste con Oggetti
Crea un componente `ListaVoti.tsx`:

```typescript
function ListaVoti() {
  const voti = [
    { id: 1, materia: "Informatica", voto: 8, data: "15/01/2024" },
    { id: 2, materia: "Matematica", voto: 7, data: "18/01/2024" },
    { id: 3, materia: "Italiano", voto: 6, data: "20/01/2024" },
    { id: 4, materia: "Storia", voto: 9, data: "22/01/2024" }
  ];

  return (
    <div>
      <h2>📝 Registro Voti</h2>
      {voti.map(v => (
        <div key={v.id} className="voto-card">
          {/* Mostra materia, voto, data */}
          {/* Se voto >= 8: badge "Ottimo!" verde */}
          {/* Se voto >= 6: badge "Sufficiente" giallo */}
          {/* Se voto < 6: badge "Insufficiente" rosso */}
        </div>
      ))}
    </div>
  );
}
```

### Parte 5: Combinazione Complessa
Crea un componente `Dashboard.tsx` che combina tutto:

```typescript
function Dashboard() {
  const isAdmin = true;
  const notifiche = ["Nuovo messaggio", "Compito consegnato", "Voto pubblicato"];
  const tasks = [
    { id: 1, titolo: "Studiare React", completato: true },
    { id: 2, titolo: "Fare esercizi", completato: false },
    { id: 3, titolo: "Progetto finale", completato: false }
  ];

  return (
    <div className="dashboard">
      {/* Mostra "Admin Panel" se isAdmin, altrimenti "User Panel" */}

      {/* Mostra notifiche con map() */}

      {/* Mostra tasks con map(), evidenzia i completati */}

      {/* Calcola e mostra tasks completati / totali */}
    </div>
  );
}
```

## 🎯 Output Atteso

```
📚 I Miei Corsi
• Informatica
• Matematica
• Italiano
• Storia
• Inglese
Totale corsi: 5

────────────────────

📝 Registro Voti
┌──────────────────────────┐
│ Informatica - 8          │
│ 15/01/2024               │
│ [Ottimo!]                │
└──────────────────────────┘
┌──────────────────────────┐
│ Matematica - 7           │
│ 18/01/2024               │
│ [Sufficiente]            │
└──────────────────────────┘
...
```

## 💡 Suggerimenti

- **Espressioni**: Usa `{}` per qualsiasi JavaScript
- **Condizionali**: `? :` per if-else, `&&` per if semplice
- **Liste**: Sempre con `map()` e `key` unica
- **key**: Preferisci ID univoci invece di index
- **className**: Non dimenticare! (non `class`)
- **Fragment**: Usa `<>` se non vuoi div extra
- **Commenti JSX**: `{/* commento */}`

## 🚀 Sfida Extra

1. **Filtro Lista**: Mostra solo i voti >= 7
2. **Lista Dinamica**: Aggiungi bottone per filtrare prodotti disponibili
3. **Stili Dinamici**: Cambia colore in base a condizioni
4. **Nested Lists**: Lista di classi, ognuna con lista di studenti

## 📖 Concetti Chiave

- ✅ **JSX** = sintassi per scrivere HTML in JavaScript
- ✅ **{}** = inserire espressioni JavaScript
- ✅ **Ternario (? :)** = if-else inline
- ✅ **&& operator** = if condizionale
- ✅ **map()** = renderizzare array/liste
- ✅ **key** = identificatore unico per elementi lista
- ✅ **Fragment (<>)** = contenitore invisibile
- ✅ **className** = attributo class in JSX

## ➡️ Prossimo: ES48 - Props e TypeScript
