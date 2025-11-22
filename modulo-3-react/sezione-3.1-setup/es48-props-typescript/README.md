# ES48 - Props e TypeScript

## 📘 Tipo: UDA - Italiano + Informatica

## 🎯 Obiettivi
- Capire cosa sono le props
- Tipizzare props con TypeScript
- Creare componenti riutilizzabili
- **Applicazione**: Card per citazioni letterarie

## 📚 Teoria - Props: Passare Dati ai Componenti

### Cos'è una Prop?

**Props** (proprietà) sono il modo per **passare dati da un componente genitore a un componente figlio**.

Pensa alle props come **parametri di una funzione**:

```typescript
// Funzione normale con parametri
function saluta(nome) {
  return `Ciao, ${nome}!`;
}
saluta("Mario");  // "Ciao, Mario!"

// Componente React con props
function Saluto(props) {
  return <h1>Ciao, {props.nome}!</h1>;
}
<Saluto nome="Mario" />  // Renderizza: Ciao, Mario!
```

### Esempio Base - Senza Props vs Con Props

**❌ Senza props** (componente rigido, non riutilizzabile):

```typescript
function CartaProdotto() {
  return (
    <div className="card">
      <h3>Laptop</h3>
      <p>€899</p>
    </div>
  );
}
```

**✅ Con props** (componente flessibile, riutilizzabile):

```typescript
function CartaProdotto(props) {
  return (
    <div className="card">
      <h3>{props.nome}</h3>
      <p>€{props.prezzo}</p>
    </div>
  );
}

// Uso - puoi creare infinite varianti!
<CartaProdotto nome="Laptop" prezzo={899} />
<CartaProdotto nome="Mouse" prezzo={25} />
<CartaProdotto nome="Tastiera" prezzo={75} />
```

### Props con TypeScript - Type Safety!

In TypeScript, dobbiamo **definire il tipo** delle props:

```typescript
// 1️⃣ Definisci un'interfaccia per le props
interface CartaProdottoProps {
  nome: string;
  prezzo: number;
}

// 2️⃣ Usa l'interfaccia come tipo
function CartaProdotto(props: CartaProdottoProps) {
  return (
    <div className="card">
      <h3>{props.nome}</h3>
      <p>€{props.prezzo}</p>
    </div>
  );
}

// 3️⃣ TypeScript ti avvisa se sbagli!
<CartaProdotto nome="Laptop" prezzo={899} />  // ✅ OK
<CartaProdotto nome="Laptop" />  // ❌ ERRORE: manca 'prezzo'
<CartaProdotto nome={123} prezzo={899} />  // ❌ ERRORE: 'nome' deve essere string
```

**Vantaggi di tipizzare le props:**
- ✅ Autocompletamento intelligente in VS Code
- ✅ Errori catturati prima del runtime
- ✅ Documentazione automatica del componente

### Destructuring delle Props

Invece di scrivere `props.nome`, `props.prezzo`, possiamo **destrutturare**:

```typescript
// Senza destructuring
function CartaProdotto(props: CartaProdottoProps) {
  return (
    <div>
      <h3>{props.nome}</h3>
      <p>€{props.prezzo}</p>
      <span>{props.disponibile ? "✅" : "❌"}</span>
    </div>
  );
}

// Con destructuring - più pulito! ✨
function CartaProdotto({ nome, prezzo, disponibile }: CartaProdottoProps) {
  return (
    <div>
      <h3>{nome}</h3>
      <p>€{prezzo}</p>
      <span>{disponibile ? "✅" : "❌"}</span>
    </div>
  );
}
```

### Props Opzionali

Usa `?` per rendere una prop opzionale:

```typescript
interface CartaProdottoProps {
  nome: string;           // obbligatorio
  prezzo: number;         // obbligatorio
  sconto?: number;        // opzionale (può non esserci)
  disponibile?: boolean;  // opzionale
}

function CartaProdotto({ nome, prezzo, sconto, disponibile = true }: CartaProdottoProps) {
  const prezzoFinale = sconto ? prezzo * (1 - sconto / 100) : prezzo;

  return (
    <div>
      <h3>{nome}</h3>
      <p>€{prezzoFinale}</p>
      {sconto && <span className="badge">-{sconto}%</span>}
      <span>{disponibile ? "✅ Disponibile" : "❌ Esaurito"}</span>
    </div>
  );
}

// Uso
<CartaProdotto nome="Laptop" prezzo={899} />
<CartaProdotto nome="Mouse" prezzo={25} sconto={10} />
<CartaProdotto nome="Tastiera" prezzo={75} disponibile={false} />
```

### Default Values

Puoi dare valori di default alle props:

```typescript
interface CartaProps {
  titolo: string;
  sottotitolo?: string;
  colore?: string;
}

function Carta({ titolo, sottotitolo = "Nessun sottotitolo", colore = "blue" }: CartaProps) {
  return (
    <div style={{ borderColor: colore }}>
      <h2>{titolo}</h2>
      <p>{sottotitolo}</p>
    </div>
  );
}

// Uso
<Carta titolo="Benvenuto" />
// Renderizza: sottotitolo="Nessun sottotitolo", colore="blue"
```

## 💡 Esempio Guidato Completo - Componente per Citazioni Letterarie

Creiamo un componente per mostrare **citazioni di autori italiani**!

### Passo 1: Definisci l'Interfaccia

```typescript
interface CitazioneProps {
  autore: string;
  opera: string;
  testo: string;
  anno: number;
  genere?: string;  // opzionale
}
```

### Passo 2: Crea il Componente

```typescript
import './CitazioneCard.css'

function CitazioneCard({ autore, opera, testo, anno, genere = "Classico" }: CitazioneProps) {
  return (
    <div className="citazione-card">
      <blockquote className="testo">
        "{testo}"
      </blockquote>

      <div className="info">
        <p className="autore">— {autore}</p>
        <p className="opera">{opera} ({anno})</p>
        <span className="badge genere">{genere}</span>
      </div>
    </div>
  );
}

export default CitazioneCard;
```

### Passo 3: Usa il Componente in App

```typescript
import CitazioneCard from './CitazioneCard'

function App() {
  return (
    <div className="app">
      <h1>📚 Letteratura Italiana</h1>

      <CitazioneCard
        autore="Dante Alighieri"
        opera="Divina Commedia"
        anno={1321}
        testo="Nel mezzo del cammin di nostra vita mi ritrovai per una selva oscura"
        genere="Poesia Epica"
      />

      <CitazioneCard
        autore="Alessandro Manzoni"
        opera="I Promessi Sposi"
        anno={1827}
        testo="Quel ramo del lago di Como, che volge a mezzogiorno..."
        genere="Romanzo Storico"
      />

      <CitazioneCard
        autore="Giacomo Leopardi"
        opera="L'infinito"
        anno={1819}
        testo="Sempre caro mi fu quest'ermo colle"
        genere="Poesia Lirica"
      />
    </div>
  );
}
```

### Passo 4: Stili CSS

```css
/* CitazioneCard.css */
.citazione-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.testo {
  font-size: 1.2rem;
  font-style: italic;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.autore {
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.opera {
  font-size: 0.95rem;
  opacity: 0.9;
  margin: 0.5rem 0;
}

.badge.genere {
  background-color: rgba(255,255,255,0.2);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}
```

## ✏️ Esercizio

### Parte 1: Componente Studente
Crea `src/CartaStudente.tsx`:

```typescript
interface CartaStudenteProps {
  nome: string;
  cognome: string;
  classe: string;
  votoMedio: number;
  assenze: number;
}

function CartaStudente({ nome, cognome, classe, votoMedio, assenze }: CartaStudenteProps) {
  // TODO: Implementa il componente
  // - Mostra nome completo
  // - Mostra classe
  // - Mostra voto medio
  // - Mostra badge "Promosso" (verde) se votoMedio >= 6, altrimenti "Bocciato" (rosso)
  // - Mostra numero assenze
  // - Se assenze > 10, mostra warning "⚠️ Troppe assenze!"
}
```

Usa il componente in App:

```typescript
<CartaStudente nome="Mario" cognome="Rossi" classe="5A" votoMedio={7.5} assenze={5} />
<CartaStudente nome="Luigi" cognome="Verdi" classe="5A" votoMedio={5.5} assenze={12} />
<CartaStudente nome="Anna" cognome="Bianchi" classe="5B" votoMedio={8.5} assenze={2} />
```

### Parte 2: Componente Libro
Crea `src/CartaLibro.tsx`:

```typescript
interface CartaLibroProps {
  titolo: string;
  autore: string;
  pagine: number;
  genere: string;
  letto?: boolean;  // opzionale, default false
  voto?: number;    // opzionale, da 1 a 5 stelle
}

function CartaLibro(props: CartaLibroProps) {
  // TODO: Implementa il componente
  // - Mostra titolo in grande
  // - Mostra autore
  // - Mostra numero pagine
  // - Mostra badge con genere
  // - Se letto=true, mostra "✅ Letto", altrimenti "📚 Da leggere"
  // - Se voto esiste, mostra stelle (⭐ ripetute voto volte)
}
```

### Parte 3: Citazioni Multiple
Crea un array di citazioni e renderizzale con map():

```typescript
function App() {
  const citazioni = [
    {
      id: 1,
      autore: "Dante Alighieri",
      opera: "Divina Commedia",
      anno: 1321,
      testo: "Nel mezzo del cammin di nostra vita...",
      genere: "Poesia Epica"
    },
    {
      id: 2,
      autore: "Francesco Petrarca",
      opera: "Canzoniere",
      anno: 1374,
      testo: "Voi ch'ascoltate in rime sparse il suono...",
      genere: "Poesia Lirica"
    },
    {
      id: 3,
      autore: "Giovanni Boccaccio",
      opera: "Decameron",
      anno: 1353,
      testo: "Umana cosa è aver compassione degli afflitti...",
      genere: "Novella"
    }
  ];

  return (
    <div>
      <h1>📖 Grandi Opere Italiane</h1>
      {/* TODO: Usa map() per renderizzare CitazioneCard per ogni citazione */}
    </div>
  );
}
```

### Parte 4: Props Complesse - Oggetti
Crea `src/CartaAutore.tsx`:

```typescript
interface Libro {
  titolo: string;
  anno: number;
}

interface CartaAutoreProps {
  nome: string;
  cognome: string;
  nascita: number;
  morte?: number;  // opzionale se ancora vivo
  opere: Libro[];   // array di libri
  foto?: string;    // URL foto
}

function CartaAutore({ nome, cognome, nascita, morte, opere, foto }: CartaAutoreProps) {
  const età = morte ? morte - nascita : 2024 - nascita;

  return (
    <div className="carta-autore">
      {foto && <img src={foto} alt={`${nome} ${cognome}`} />}
      <h2>{nome} {cognome}</h2>
      <p>{nascita} - {morte || "vivente"}</p>
      <p>Opere principali:</p>
      <ul>
        {opere.map((libro, index) => (
          <li key={index}>{libro.titolo} ({libro.anno})</li>
        ))}
      </ul>
    </div>
  );
}
```

Uso:

```typescript
<CartaAutore
  nome="Alessandro"
  cognome="Manzoni"
  nascita={1785}
  morte={1873}
  opere={[
    { titolo: "I Promessi Sposi", anno: 1827 },
    { titolo: "Marzo 1821", anno: 1821 },
    { titolo: "Il Cinque Maggio", anno: 1821 }
  ]}
/>
```

### Parte 5: Props Callback (Funzioni)
Crea `src/Bottone.tsx`:

```typescript
interface BottoneProps {
  testo: string;
  colore?: "primary" | "secondary" | "danger";
  onClick: () => void;  // funzione callback
}

function Bottone({ testo, colore = "primary", onClick }: BottoneProps) {
  return (
    <button
      className={`btn btn-${colore}`}
      onClick={onClick}
    >
      {testo}
    </button>
  );
}
```

Uso:

```typescript
function App() {
  const handleClick = () => {
    alert("Bottone cliccato!");
  };

  return (
    <div>
      <Bottone testo="Clicca qui" onClick={handleClick} />
      <Bottone testo="Salva" colore="primary" onClick={() => console.log("Salvato")} />
      <Bottone testo="Elimina" colore="danger" onClick={() => confirm("Sicuro?")} />
    </div>
  );
}
```

## 🎯 Output Atteso

```
📚 Letteratura Italiana

┌─────────────────────────────────────────┐
│ "Nel mezzo del cammin di nostra vita   │
│  mi ritrovai per una selva oscura"     │
│                                         │
│ — Dante Alighieri                      │
│ Divina Commedia (1321)                 │
│ [Poesia Epica]                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Mario Rossi                             │
│ Classe 5A                               │
│ Voto medio: 7.5 [Promosso ✅]          │
│ Assenze: 5                              │
└─────────────────────────────────────────┘
```

## 💡 Suggerimenti

- **Interface**: Definisci sempre l'interfaccia delle props
- **Destructuring**: Usa `{ nome, età }` invece di `props.nome`
- **Opzionali**: Usa `?` per props non obbligatorie
- **Default**: Assegna valori di default quando serve
- **Naming**: Interfaccia = `NomeComponenteProps`
- **Export**: `export default` per il componente
- **Riutilizzo**: Un componente = tanti utilizzi diversi!

## 🚀 Sfida Extra

1. **Componente Badge**: Props per testo, colore, dimensione
2. **Rating Stars**: Props voto (1-5), mostra stelle piene/vuote
3. **Card Universale**: Props per header, body, footer, colore
4. **Timeline Letteraria**: Props per array eventi storici, renderizza linea del tempo

## 📖 Concetti Chiave

- ✅ **Props** = dati passati da genitore a figlio
- ✅ **Interface** = definire tipo delle props in TypeScript
- ✅ **Destructuring** = estrarre props singole
- ✅ **Optional (?)**  = props non obbligatorie
- ✅ **Default values** = valori di default per props
- ✅ **Type safety** = TypeScript previene errori
- ✅ **Riutilizzo** = stesso componente, dati diversi

## 🎓 Connessione con Italiano

In questo esercizio hai applicato React alla letteratura italiana:
- **Citazioni letterarie**: Dante, Petrarca, Boccaccio
- **Opere famose**: Divina Commedia, Canzoniere, Decameron
- **Generi letterari**: Poesia epica, lirica, novella
- **Contesto storico**: Date e periodi storici

**Competenza interdisciplinare**: Hai creato un'applicazione digitale per catalogare e visualizzare il patrimonio letterario italiano, combinando programmazione e cultura umanistica.

## ➡️ Prossimo: ES49 - Composition e Children
