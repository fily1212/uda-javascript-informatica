# ES52 - Eventi e Handlers

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Gestire eventi in React
- Capire gli event handlers
- onClick, onChange, onSubmit
- Passare parametri agli handlers

## 📚 Teoria - Eventi: Rendere l'App Interattiva

### Eventi in React vs HTML

In HTML normale:
```html
<button onclick="handleClick()">Click</button>
```

In React/JSX:
```typescript
<button onClick={handleClick}>Click</button>
```

**Differenze chiave:**
- ✅ **camelCase**: `onClick`, non `onclick`
- ✅ **Funzione**: `{handleClick}`, non `"handleClick()"`
- ✅ **Senza ()**: passa la funzione, non chiamarla subito!

### onClick - Click su Elementi

```typescript
import { useState } from 'react'

function Contatore() {
  const [count, setCount] = useState(0);

  // Handler function
  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Conteggio: {count}</p>
      <button onClick={handleClick}>Incrementa</button>
    </div>
  );
}
```

#### Stili Alternativi per Handler

```typescript
// 1. Arrow function inline
<button onClick={() => setCount(count + 1)}>+1</button>

// 2. Arrow function come variabile
const handleClick = () => {
  setCount(count + 1);
};

// 3. Function declaration
function handleClick() {
  setCount(count + 1);
}

// 4. Arrow function con corpo
const handleClick = () => {
  console.log("Cliccato!");
  setCount(count + 1);
};
```

**Quando usare quale?**
- **Inline**: operazioni semplici (1 linea)
- **Funzione separata**: logica complessa, riutilizzo

### Passare Parametri agli Handlers

```typescript
function Calcolatrice() {
  const [numero, setNumero] = useState(0);

  // ❌ ERRORE - chiama la funzione subito!
  <button onClick={setNumero(numero + 5)}>+5</button>

  // ✅ CORRETTO - arrow function wrapper
  <button onClick={() => setNumero(numero + 5)}>+5</button>

  // ✅ CORRETTO - funzione che ritorna funzione
  const aggiungi = (valore: number) => {
    return () => setNumero(numero + valore);
  };

  <button onClick={aggiungi(5)}>+5</button>
  <button onClick={aggiungi(10)}>+10</button>
}
```

### onChange - Input e Textarea

Per gestire input di testo:

```typescript
function FormNome() {
  const [nome, setNome] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={nome}
        onChange={handleChange}
      />
      <p>Ciao, {nome}!</p>
    </div>
  );
}
```

**Event object:**
- `event.target.value` = valore dell'input
- `event.target.checked` = per checkbox
- `event.preventDefault()` = previeni comportamento default

#### Shorthand onChange

```typescript
// Versione lunga
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNome(e.target.value);
};

// Versione corta (inline)
<input onChange={(e) => setNome(e.target.value)} />
```

### onSubmit - Form Submission

```typescript
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // ⚠️ IMPORTANTE: previeni reload pagina!

    console.log("Email:", email);
    console.log("Password:", password);

    // Qui faresti la chiamata API
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

**IMPORTANTE:** `event.preventDefault()` previene il reload della pagina quando submit!

### Altri Eventi Comuni

```typescript
// onMouseEnter / onMouseLeave - Hover
<div
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  Passa il mouse qui
</div>

// onKeyDown - Tastiera
<input
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      console.log("Premi Invio!");
    }
  }}
/>

// onFocus / onBlur - Focus input
<input
  onFocus={() => console.log("Input focused")}
  onBlur={() => console.log("Input blurred")}
/>

// onDoubleClick - Doppio click
<button onDoubleClick={() => console.log("Doppio click!")}>
  Doppio Click
</button>
```

### Event Object - Proprietà Utili

```typescript
function EventInfo() {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Tipo evento:", event.type);
    console.log("Target:", event.target);
    console.log("Coordinate:", event.clientX, event.clientY);
    console.log("Tasto premuto:", event.button);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Tasto:", event.key);
    console.log("Codice:", event.code);
    console.log("Ctrl premuto?", event.ctrlKey);
    console.log("Shift premuto?", event.shiftKey);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <input onKeyDown={handleKeyPress} />
    </div>
  );
}
```

## 💡 Esempio Guidato Completo - Calcolatrice Interattiva

```typescript
import { useState } from 'react'
import './Calcolatrice.css'

function Calcolatrice() {
  const [numero1, setNumero1] = useState<number>(0);
  const [numero2, setNumero2] = useState<number>(0);
  const [operazione, setOperazione] = useState<string>("+");
  const [risultato, setRisultato] = useState<number | null>(null);

  const calcola = () => {
    let res: number;

    switch (operazione) {
      case "+":
        res = numero1 + numero2;
        break;
      case "-":
        res = numero1 - numero2;
        break;
      case "*":
        res = numero1 * numero2;
        break;
      case "/":
        res = numero2 !== 0 ? numero1 / numero2 : 0;
        break;
      default:
        res = 0;
    }

    setRisultato(res);
  };

  const reset = () => {
    setNumero1(0);
    setNumero2(0);
    setOperazione("+");
    setRisultato(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calcola();
  };

  return (
    <div className="calcolatrice">
      <h2>🧮 Calcolatrice</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="number"
            value={numero1}
            onChange={(e) => setNumero1(Number(e.target.value))}
            placeholder="Numero 1"
          />

          <select
            value={operazione}
            onChange={(e) => setOperazione(e.target.value)}
          >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>

          <input
            type="number"
            value={numero2}
            onChange={(e) => setNumero2(Number(e.target.value))}
            placeholder="Numero 2"
          />
        </div>

        <div className="buttons">
          <button type="submit" className="btn-primary">
            = Calcola
          </button>
          <button type="button" onClick={reset} className="btn-secondary">
            🔄 Reset
          </button>
        </div>
      </form>

      {risultato !== null && (
        <div className="risultato">
          <h3>Risultato: {risultato}</h3>
          <p>{numero1} {operazione} {numero2} = {risultato}</p>
        </div>
      )}
    </div>
  );
}

export default Calcolatrice;
```

## ✏️ Esercizio

### Parte 1: Counter con Bottoni Multipli
```typescript
function CounterAvanzato() {
  const [count, setCount] = useState(0);

  // TODO: Crea handlers per:
  // - Incrementa di 1
  // - Decrementa di 1
  // - Incrementa di 5
  // - Decrementa di 5
  // - Raddoppia
  // - Dimezza
  // - Reset a 0

  return (
    <div>
      <h2>Contatore: {count}</h2>
      {/* TODO: Aggiungi bottoni con onClick */}
    </div>
  );
}
```

### Parte 2: Form di Registrazione
```typescript
function FormRegistrazione() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accettaTermini, setAccettaTermini] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Validazione
    // - Nome non vuoto
    // - Email contiene @
    // - Password almeno 6 caratteri
    // - Termini accettati

    if (/* validazione ok */) {
      console.log("Registrazione:", { nome, email, password });
    } else {
      alert("Compila tutti i campi!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome completo"
      />

      {/* TODO: Aggiungi altri input */}

      <label>
        <input
          type="checkbox"
          checked={accettaTermini}
          onChange={(e) => setAccettaTermini(e.target.checked)}
        />
        Accetto i termini e condizioni
      </label>

      <button type="submit">Registrati</button>
    </form>
  );
}
```

### Parte 3: Todo List Interattiva
```typescript
function TodoList() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const aggiungiTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  const rimuoviTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      aggiungiTask();
    }
  };

  return (
    <div>
      <h2>📝 Todo List</h2>

      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Nuova task..."
        />
        <button onClick={aggiungiTask}>Aggiungi</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => rimuoviTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Parte 4: Color Picker
```typescript
function ColorPicker() {
  const [red, setRed] = useState(128);
  const [green, setGreen] = useState(128);
  const [blue, setBlue] = useState(128);

  const color = `rgb(${red}, ${green}, ${blue})`;
  const hex = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  return (
    <div>
      <h2>🎨 Color Picker</h2>

      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: color,
          margin: '1rem 0'
        }}
      />

      <p>RGB: {color}</p>
      <p>HEX: {hex}</p>

      <div>
        <label>
          Red: {red}
          <input
            type="range"
            min="0"
            max="255"
            value={red}
            onChange={(e) => setRed(Number(e.target.value))}
          />
        </label>

        {/* TODO: Aggiungi slider per Green e Blue */}
      </div>
    </div>
  );
}
```

### Parte 5: Quiz Interattivo
```typescript
function Quiz() {
  const [rispostaSelezionata, setRispostaSelezionata] = useState<string | null>(null);
  const [mostraRisultato, setMostraRisultato] = useState(false);

  const domanda = "Qual è la capitale d'Italia?";
  const opzioni = ["Milano", "Roma", "Napoli", "Firenze"];
  const rispostaCorretta = "Roma";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMostraRisultato(true);
  };

  const reset = () => {
    setRispostaSelezionata(null);
    setMostraRisultato(false);
  };

  return (
    <div className="quiz">
      <h2>❓ Quiz</h2>
      <p>{domanda}</p>

      <form onSubmit={handleSubmit}>
        {opzioni.map((opzione) => (
          <label key={opzione}>
            <input
              type="radio"
              name="risposta"
              value={opzione}
              checked={rispostaSelezionata === opzione}
              onChange={(e) => setRispostaSelezionata(e.target.value)}
            />
            {opzione}
          </label>
        ))}

        <button type="submit" disabled={!rispostaSelezionata}>
          Verifica
        </button>
      </form>

      {mostraRisultato && (
        <div className={rispostaSelezionata === rispostaCorretta ? "corretto" : "sbagliato"}>
          {rispostaSelezionata === rispostaCorretta ? (
            <p>✅ Corretto!</p>
          ) : (
            <p>❌ Sbagliato! La risposta corretta è: {rispostaCorretta}</p>
          )}
          <button onClick={reset}>Riprova</button>
        </div>
      )}
    </div>
  );
}
```

## 🎯 Output Atteso

```
🧮 Calcolatrice

Numero 1: [10]  [+]  Numero 2: [5]

[= Calcola]  [🔄 Reset]

Risultato: 15
10 + 5 = 15

────────────────

📝 Todo List

[Nuova task...] [Aggiungi]

• Studiare React [❌]
• Fare esercizi [❌]
• Progetto finale [❌]
```

## 💡 Suggerimenti

- **CamelCase**: `onClick`, `onChange`, non `onclick`
- **Funzione**: `{handler}`, non `{handler()}`
- **preventDefault()**: Sempre con form submit!
- **Event type**: Usa TypeScript types per autocomplete
- **Inline vs Separate**: Inline per logica semplice, funzione separata per complessa
- **Multiple handlers**: OK avere tanti handler diversi

## 🚀 Sfida Extra

1. **Stopwatch**: Start/Stop/Reset con setInterval
2. **Password Strength Meter**: Mostra forza password mentre scrivi
3. **Search Filter**: Input che filtra lista in real-time
4. **Drawing Canvas**: onClick su canvas per disegnare

## 📖 Concetti Chiave

- ✅ **Eventi** = interazioni utente (click, change, submit)
- ✅ **Handler** = funzione che gestisce evento
- ✅ **event object** = informazioni sull'evento
- ✅ **preventDefault()** = previeni comportamento default
- ✅ **Synthetic events** = React normalizza eventi cross-browser
- ✅ **onChange** = per input controllati
- ✅ **onSubmit** = per form submission

## ➡️ Prossimo: ES53 - State con Oggetti e Array
