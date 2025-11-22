# ES46 - Setup Vite + React + TypeScript

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire cos'è React e Vite
- Creare primo progetto React con TypeScript
- Comprendere la struttura del progetto
- Scrivere il primo componente React

## 📚 Teoria - Iniziamo con React!

### Cos'è React?

**React** è una libreria JavaScript creata da Facebook per costruire interfacce utente (UI). La sua filosofia è semplice: dividere l'interfaccia in **componenti** riutilizzabili.

Pensa a una pagina web come a un puzzle:
- Ogni pezzo del puzzle è un **componente** (bottone, card, menu, ecc.)
- Ogni componente può essere riutilizzato in diverse parti dell'app
- I componenti possono contenere altri componenti

### Cos'è Vite?

**Vite** (pronuncia: "vit", come la parola francese per "veloce") è un **build tool** moderno che ci permette di creare progetti React velocemente.

**Perché Vite e non Create React App?**
- ⚡ **Velocissimo**: parte in millisecondi, non secondi
- 🔥 **Hot Module Replacement**: vedi modifiche istantaneamente
- 📦 **Build ottimizzati**: usa ESbuild (scritto in Go)
- 🎯 **TypeScript nativo**: supporto TypeScript out-of-the-box

### Setup del Progetto - Passo per Passo

#### 1️⃣ Creare il progetto
```bash
# Comando per creare progetto React + TypeScript
npm create vite@latest my-first-react-app -- --template react-ts

# Entra nella cartella
cd my-first-react-app

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Dopo `npm run dev`, vedrai un messaggio tipo:
```
  VITE v5.0.0  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Apri il browser su `http://localhost:5173/` e vedrai la tua app React funzionante! 🎉

#### 2️⃣ Struttura del Progetto

Quando apri il progetto in VS Code, vedrai questa struttura:

```
my-first-react-app/
├── node_modules/       # Librerie installate (non toccare)
├── public/             # File statici (immagini, favicon, ecc.)
├── src/                # 👈 QUI LAVORIAMO!
│   ├── App.tsx         # Componente principale
│   ├── main.tsx        # Entry point (punto di ingresso)
│   ├── App.css         # Stili per App
│   ├── index.css       # Stili globali
│   └── vite-env.d.ts   # Definizioni TypeScript per Vite
├── index.html          # HTML principale
├── package.json        # Configurazione progetto
├── tsconfig.json       # Configurazione TypeScript
└── vite.config.ts      # Configurazione Vite
```

**File Importanti:**
- **src/main.tsx**: Il file che "accende" React
- **src/App.tsx**: Il nostro componente principale
- **index.html**: La pagina HTML dove React viene "montato"

#### 3️⃣ Il File main.tsx - Entry Point

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Cosa fa questo codice?**
1. Importa React e ReactDOM
2. Importa il componente `App`
3. Trova l'elemento HTML con id="root"
4. "Monta" (render) il componente `<App />` dentro quell'elemento

### Il Primo Componente - App.tsx

```typescript
function App() {
  return (
    <div className="app">
      <h1>Benvenuto in React!</h1>
      <p>Questo è il tuo primo componente.</p>
    </div>
  );
}

export default App;
```

**Anatomia di un Componente:**
1. **Funzione**: `function App()` - un componente è una funzione
2. **Return**: restituisce HTML (in realtà JSX/TSX)
3. **Export**: `export default` per usarlo in altri file

**Perché .tsx e non .ts?**
- `.tsx` = TypeScript + JSX (può contenere HTML)
- `.ts` = solo TypeScript
- Quando hai componenti React, usa sempre `.tsx`

## 💡 Esempio Guidato - Il Tuo Primo Componente

### Passo 1: Modifica App.tsx

Apri `src/App.tsx` e sostituisci tutto con:

```typescript
function App() {
  return (
    <div className="app">
      <h1>La Mia Prima App React 🚀</h1>
      <p>Ciao! Sono uno studente e sto imparando React.</p>
      <button>Clicca qui</button>
    </div>
  );
}

export default App;
```

Salva il file e guarda il browser: **il cambiamento è istantaneo**! Questa è la magia di Vite HMR (Hot Module Replacement).

### Passo 2: Aggiungi Stili

Apri `src/App.css` e aggiungi:

```css
.app {
  text-align: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  color: #61dafb;
  font-size: 2.5rem;
}

button {
  background-color: #61dafb;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #4fa8c5;
}
```

Non dimenticare di importare il CSS in `App.tsx`:

```typescript
import './App.css'

function App() {
  // ...
}
```

### Passo 3: Crea un Nuovo Componente

Crea un nuovo file `src/Benvenuto.tsx`:

```typescript
function Benvenuto() {
  return (
    <div className="benvenuto">
      <h2>👋 Benvenuto/a!</h2>
      <p>Questo è un componente separato.</p>
    </div>
  );
}

export default Benvenuto;
```

### Passo 4: Usa il Componente in App

Modifica `App.tsx`:

```typescript
import './App.css'
import Benvenuto from './Benvenuto'  // 👈 Import!

function App() {
  return (
    <div className="app">
      <h1>La Mia Prima App React 🚀</h1>
      <Benvenuto />  {/* 👈 Usa il componente! */}
      <button>Clicca qui</button>
    </div>
  );
}

export default App;
```

**Importante:**
- I componenti devono iniziare con la **lettera maiuscola** (`Benvenuto`, non `benvenuto`)
- Si usano come tag HTML: `<Benvenuto />`
- L'import usa il nome del file senza estensione

## ✏️ Esercizio

### Parte 1: Setup Iniziale
1. Crea un nuovo progetto chiamato `esercizio-react-46`
2. Avvia il server di sviluppo
3. Verifica che l'app funzioni su `localhost:5173`

### Parte 2: Componente Personale
Modifica `App.tsx` per mostrare:
- Il tuo nome in un `<h1>`
- La tua classe in un `<p>`
- Un messaggio "Sto imparando React!" in un `<p>`
- Un bottone "Inizia il corso"

### Parte 3: Componente Card
Crea un nuovo file `src/InfoCard.tsx`:

```typescript
function InfoCard() {
  return (
    <div className="card">
      <h3>React Facts</h3>
      <ul>
        <li>✅ React è una libreria, non un framework</li>
        <li>✅ Usa componenti riutilizzabili</li>
        <li>✅ È mantenuto da Meta (Facebook)</li>
      </ul>
    </div>
  );
}

export default InfoCard;
```

Importa e usa `InfoCard` in `App.tsx`.

### Parte 4: Stili
Crea `src/InfoCard.css`:

```css
.card {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card h3 {
  color: #333;
  margin-top: 0;
}

.card ul {
  text-align: left;
  list-style: none;
  padding: 0;
}

.card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.card li:last-child {
  border-bottom: none;
}
```

Importa il CSS in `InfoCard.tsx`.

### Parte 5: Componente Footer
Crea un componente `Footer.tsx` che mostra:
- Anno corrente (2024)
- Il tuo nome
- Testo "Made with React + Vite"

Usa questo footer in `App.tsx`.

## 🎯 Output Atteso

Il tuo browser dovrebbe mostrare:

```
La Mia Prima App React 🚀

Mario Rossi
Classe 5A Informatica
Sto imparando React!

[Inizia il corso]

┌─────────────────────────────┐
│ React Facts                 │
│ ✅ React è una libreria...  │
│ ✅ Usa componenti...        │
│ ✅ È mantenuto da Meta...   │
└─────────────────────────────┘

────────────────────────────────
2024 - Mario Rossi
Made with React + Vite
────────────────────────────────
```

## 💡 Suggerimenti

- **HMR automatico**: Non serve ricaricare la pagina, Vite aggiorna automaticamente!
- **Errori**: Se vedi errori, leggi la console del browser (F12)
- **Componenti**: Un file = un componente (best practice)
- **Nomi**: Componenti con PascalCase (`InfoCard`), file `.tsx`
- **Export/Import**: Usa `export default` e `import NomeComponente from './file'`

## 🚀 Sfida Extra

1. **Multi-Component**: Crea 3 componenti separati (Header, Content, Footer) e componi l'app
2. **Card Multiple**: Crea più card diverse con informazioni su TypeScript, JavaScript, React
3. **Stili Avanzati**: Sperimenta con gradients, shadows, hover effects

## 📖 Concetti Chiave

- ✅ **React** = libreria per UI basata su componenti
- ✅ **Vite** = build tool velocissimo per progetti moderni
- ✅ **Componente** = funzione che restituisce JSX/TSX
- ✅ **TSX** = TypeScript + JSX (HTML in JavaScript)
- ✅ **HMR** = Hot Module Replacement (aggiornamenti istantanei)
- ✅ **npm run dev** = avvia server di sviluppo
- ✅ **export/import** = condividere componenti tra file

## ➡️ Prossimo: ES47 - JSX e Rendering
