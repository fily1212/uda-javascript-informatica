# ES51 - useState Hook

## 📘 Tipo: UDA - Fisica + Informatica

## 🎯 Obiettivi
- Capire cos'è lo state in React
- Usare useState hook
- Gestire re-rendering
- **Applicazione**: Contatore di particelle fisiche

## 📚 Teoria - State: La Memoria del Componente

### Cos'è lo State?

Finora abbiamo visto componenti con **props** (dati che ricevono dall'esterno). Ma se il componente deve **ricordare** qualcosa? **Memorizzare dati**? **Cambiare nel tempo**?

Qui entra in gioco lo **state**!

**State** = la "memoria" del componente. Dati che possono **cambiare** nel tempo.

### Esempio: Problema senza State

```typescript
// ❌ Questo NON funziona!
function Contatore() {
  let count = 0;  // variabile normale

  function incrementa() {
    count = count + 1;
    console.log(count);  // Stampa 1, 2, 3...
  }

  return (
    <div>
      <p>Conteggio: {count}</p>
      <button onClick={incrementa}>+1</button>
    </div>
  );
}
```

**Problema:** Il valore cambia in console, ma **NON si vede** nell'interfaccia! Perché?

React non sa che `count` è cambiato, quindi **non ri-renderizza** il componente.

### Soluzione: useState Hook

```typescript
import { useState } from 'react'

function Contatore() {
  // useState ritorna un array con 2 elementi:
  // [valore corrente, funzione per cambiarlo]
  const [count, setCount] = useState(0);  // 0 = valore iniziale

  function incrementa() {
    setCount(count + 1);  // ✅ Cambia count E ri-renderizza!
  }

  return (
    <div>
      <p>Conteggio: {count}</p>
      <button onClick={incrementa}>+1</button>
    </div>
  );
}
```

**Cosa succede:**
1. Clicco bottone → chiama `incrementa()`
2. `setCount(count + 1)` → cambia state
3. React **ri-renderizza** il componente
4. Vedo il nuovo valore nell'interfaccia!

### Anatomia di useState

```typescript
const [valore, setValore] = useState(valoreIniziale);
//     ^^^^^^   ^^^^^^^^^          ^^^^^^^^^^^^^^^^
//     stato    funzione           valore di partenza
//     attuale  per cambiarlo
```

**Regole importanti:**
- ✅ Usa sempre la funzione `set` per cambiare state
- ❌ NON modificare direttamente: `count = 5` ❌
- ✅ Sempre: `setCount(5)` ✅

### Tipi di State

```typescript
// Numero
const [count, setCount] = useState(0);
setCount(5);
setCount(count + 1);

// String
const [nome, setNome] = useState("");
setNome("Mario");

// Boolean
const [isVisible, setIsVisible] = useState(false);
setIsVisible(true);
setIsVisible(!isVisible);  // toggle

// Array
const [items, setItems] = useState([]);
setItems([1, 2, 3]);

// Oggetto
const [user, setUser] = useState({ nome: "", età: 0 });
setUser({ nome: "Mario", età: 25 });
```

### State con TypeScript

Specifica il tipo dello state:

```typescript
// Type inference (deduce automaticamente)
const [count, setCount] = useState(0);  // number
const [nome, setNome] = useState("");   // string

// Type explicit (specifico manualmente)
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<{ nome: string, età: number }>({
  nome: "",
  età: 0
});

// Con interfaccia
interface User {
  nome: string;
  età: number;
}

const [user, setUser] = useState<User>({ nome: "", età: 0 });
```

### Multiple useState

Puoi avere **più state** nello stesso componente:

```typescript
function Profilo() {
  const [nome, setNome] = useState("Mario");
  const [età, setEtà] = useState(25);
  const [città, setCittà] = useState("Roma");

  return (
    <div>
      <p>Nome: {nome}</p>
      <p>Età: {età}</p>
      <p>Città: {città}</p>
      <button onClick={() => setEtà(età + 1)}>Compleanno!</button>
    </div>
  );
}
```

### Funzioni di Update

Due modi per aggiornare lo state:

#### 1. Valore Diretto

```typescript
const [count, setCount] = useState(0);

function incrementa() {
  setCount(count + 1);  // nuovo valore diretto
}
```

#### 2. Funzione di Update (Consigliato)

```typescript
const [count, setCount] = useState(0);

function incrementa() {
  setCount(prevCount => prevCount + 1);
  //       ^^^^^^^^^    ^^^^^^^^^
  //       valore       calcolo nuovo
  //       precedente   valore
}
```

**Perché usare la funzione?**

Se chiami `setCount` più volte, la funzione è più sicura:

```typescript
// ❌ Problema con valore diretto
function incrementaDiTre() {
  setCount(count + 1);  // count + 1
  setCount(count + 1);  // count + 1 (stesso count!)
  setCount(count + 1);  // count + 1 (stesso count!)
}  // Risultato: incrementa solo di 1!

// ✅ Corretto con funzione
function incrementaDiTre() {
  setCount(c => c + 1);  // c + 1
  setCount(c => c + 1);  // (c + 1) + 1
  setCount(c => c + 1);  // ((c + 1) + 1) + 1
}  // Risultato: incrementa di 3!
```

## 💡 Esempio Guidato Completo - Contatore Particelle (UDA Fisica)

Creiamo un simulatore di contatore di particelle per esperimenti di fisica!

```typescript
import { useState } from 'react'
import './ContatorePart icelle.css'

function ContatoreParticelle() {
  // State: numero di particelle rilevate
  const [particelle, setParticelle] = useState<number>(0);
  const [isAttivo, setIsAttivo] = useState<boolean>(false);

  // Funzioni handler
  const aggiungiParticella = () => {
    setParticelle(prev => prev + 1);
  };

  const aggiungiCinque = () => {
    setParticelle(prev => prev + 5);
  };

  const rimuoviParticella = () => {
    setParticelle(prev => Math.max(0, prev - 1));  // min 0
  };

  const reset = () => {
    setParticelle(0);
  };

  const toggleRilevatore = () => {
    setIsAttivo(prev => !prev);
  };

  // Calcoli derivati dallo state
  const energia = particelle * 1.6;  // E = n × 1.6 eV
  const massa = particelle * 9.11;   // m = n × 9.11 × 10^-31 kg

  return (
    <div className="contatore">
      <h1>⚛️ Rilevatore di Particelle</h1>

      {/* Display principale */}
      <div className={`display ${isAttivo ? 'attivo' : 'inattivo'}`}>
        <div className="numero">{particelle}</div>
        <div className="label">particelle rilevate</div>
      </div>

      {/* Stato rilevatore */}
      <div className="stato">
        <span className={isAttivo ? 'led-verde' : 'led-rosso'}></span>
        <p>{isAttivo ? '✅ Rilevatore ATTIVO' : '⭕ Rilevatore SPENTO'}</p>
      </div>

      {/* Controlli */}
      <div className="controlli">
        <button onClick={toggleRilevatore}>
          {isAttivo ? 'Spegni' : 'Accendi'} Rilevatore
        </button>

        <div className="bottoni-particelle">
          <button onClick={rimuoviParticella} disabled={!isAttivo || particelle === 0}>
            -1
          </button>
          <button onClick={aggiungiParticella} disabled={!isAttivo}>
            +1 Particella
          </button>
          <button onClick={aggiungiCinque} disabled={!isAttivo}>
            +5 Particelle
          </button>
        </div>

        <button onClick={reset} className="btn-reset">
          🔄 Reset
        </button>
      </div>

      {/* Calcoli fisici */}
      <div className="calcoli">
        <h3>📊 Analisi</h3>
        <p>Energia totale: <strong>{energia.toFixed(2)} eV</strong></p>
        <p>Massa totale: <strong>{massa.toFixed(2)} × 10⁻³¹ kg</strong></p>
        <p>Densità: <strong>{(particelle / 10).toFixed(1)} p/cm³</strong></p>
      </div>

      {/* Alert condizionale */}
      {particelle > 100 && (
        <div className="alert warning">
          ⚠️ ATTENZIONE: Concentrazione particelle elevata!
        </div>
      )}
    </div>
  );
}

export default ContatoreParticelle;
```

## ✏️ Esercizio

### Parte 1: Contatore Base
Crea `src/Contatore.tsx`:

```typescript
import { useState } from 'react'

function Contatore() {
  // TODO: Crea state per count (inizia da 0)

  // TODO: Funzioni incrementa, decrementa, reset

  return (
    <div>
      <h2>Contatore Semplice</h2>
      <p>Valore: {/* mostra count */}</p>
      <button onClick={/* incrementa */}>+1</button>
      <button onClick={/* decrementa */}>-1</button>
      <button onClick={/* reset */}>Reset</button>
    </div>
  );
}
```

### Parte 2: Toggle Visibilità
Crea componente che mostra/nasconde un testo:

```typescript
function Toggle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={/* toggle isVisible */}>
        {isVisible ? 'Nascondi' : 'Mostra'}
      </button>

      {isVisible && (
        <p>👋 Ciao! Questo testo può essere nascosto.</p>
      )}
    </div>
  );
}
```

### Parte 3: Cambio Colore
Componente che cambia colore al click:

```typescript
function CambiaColore() {
  const [colore, setColore] = useState('blue');

  const cambia = () => {
    // Cicla tra: blue → red → green → yellow → blue
    // TODO: implementa la logica
  };

  return (
    <div style={{ backgroundColor: colore, padding: '2rem' }}>
      <button onClick={cambia}>Cambia Colore</button>
    </div>
  );
}
```

### Parte 4: Contatore Multiplo
Tre contatori indipendenti:

```typescript
function ContatoreTriplo() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  return (
    <div>
      <h2>Tre Contatori Indipendenti</h2>

      <div>
        <p>Contatore 1: {count1}</p>
        <button onClick={() => setCount1(count1 + 1)}>+</button>
      </div>

      {/* TODO: Aggiungi contatore 2 e 3 */}

      <p>Somma totale: {/* count1 + count2 + count3 */}</p>
    </div>
  );
}
```

### Parte 5: Simulatore Temperatura (UDA Fisica)
Crea un simulatore di temperatura con conversioni:

```typescript
function SimulatoreTemperatura() {
  const [celsius, setCelsius] = useState<number>(20);

  const aumenta = () => setCelsius(prev => prev + 5);
  const diminuisci = () => setCelsius(prev => prev - 5);

  // Conversioni
  const fahrenheit = (celsius * 9/5) + 32;
  const kelvin = celsius + 273.15;

  // Stato materia (acqua)
  let stato = "Liquido 💧";
  if (celsius < 0) stato = "Solido ❄️";
  if (celsius >= 100) stato = "Gassoso ☁️";

  return (
    <div className="temperatura">
      <h2>🌡️ Simulatore Temperatura</h2>

      <div className="display">
        <h1>{celsius}°C</h1>
      </div>

      <div className="conversioni">
        <p>{fahrenheit.toFixed(1)}°F</p>
        <p>{kelvin.toFixed(2)} K</p>
      </div>

      <div className="controlli">
        <button onClick={diminuisci}>❄️ -5°C</button>
        <button onClick={() => setCelsius(20)}>🌡️ Reset</button>
        <button onClick={aumenta}>🔥 +5°C</button>
      </div>

      <div className="stato">
        <p>Stato H₂O: <strong>{stato}</strong></p>
      </div>
    </div>
  );
}
```

## 🎯 Output Atteso

```
⚛️ Rilevatore di Particelle

┌─────────────────┐
│      42         │
│ particelle      │
│ rilevate        │
└─────────────────┘

🟢 Rilevatore ATTIVO

[-1]  [+1 Particella]  [+5 Particelle]

[🔄 Reset]

📊 Analisi
Energia totale: 67.20 eV
Massa totale: 382.62 × 10⁻³¹ kg
Densità: 4.2 p/cm³
```

## 💡 Suggerimenti

- **useState**: Importa sempre da 'react'
- **Naming**: `[valore, setValore]` è la convenzione
- **Inizializzazione**: Passa valore iniziale a `useState()`
- **Update**: Usa `setValore()` per cambiare state
- **Funzione update**: `setValore(prev => prev + 1)` per update basati su valore precedente
- **TypeScript**: Specifica tipo con `useState<type>()`
- **Multiple state**: Un `useState` per ogni dato indipendente

## 🚀 Sfida Extra

1. **Timer/Cronometro**: State con secondi, start/stop/reset
2. **Contatore Like**: Bottone cuore che conta i like
3. **Score Game**: Punteggio che aumenta/diminuisce
4. **Light/Dark Mode**: Toggle tema con useState

## 📖 Concetti Chiave

- ✅ **State** = memoria del componente
- ✅ **useState** = hook per creare state
- ✅ **Re-rendering** = React aggiorna UI quando state cambia
- ✅ **Immutabilità** = non modificare state direttamente
- ✅ **set Function** = unico modo per cambiare state
- ✅ **Functional update** = `setCount(c => c + 1)`
- ✅ **Multiple state** = più `useState` nello stesso componente

## 🎓 Connessione con Fisica

In questo esercizio hai applicato React alla fisica:
- **Rilevatore di particelle**: Simulazione conteggio particelle subatomiche
- **Energia**: E = n × 1.6 eV (energia per particella)
- **Massa**: m = n × 9.11 × 10⁻³¹ kg (massa elettrone)
- **Stati materia**: Transizioni solido/liquido/gassoso in base a temperatura
- **Densità**: Calcolo particelle per unità di volume

**Competenza interdisciplinare**: Hai creato un'applicazione interattiva per simulare concetti di fisica delle particelle, combinando programmazione e scienze naturali.

## ➡️ Prossimo: ES52 - Eventi e Handlers
