# ES54 - Lifting State Up

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire il "lifting state up"
- Condividere state tra componenti sibling
- Comunicazione genitore-figli

## 📚 Teoria - Condividere State

### Il Problema

```typescript
// ❌ Due componenti che non possono comunicare
function ComponenteA() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}

function ComponenteB() {
  // Come accedo al count di ComponenteA? ❌
}
```

### La Soluzione: Lifting State Up

**Sposta** lo state nel **componente genitore** comune:

```typescript
// ✅ State nel genitore
function Genitore() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ComponenteA count={count} />
      <ComponenteB count={count} setCount={setCount} />
    </>
  );
}

function ComponenteA({ count }: { count: number }) {
  return <div>Valore: {count}</div>;
}

function ComponenteB({ count, setCount }: { count: number, setCount: (n: number) => void }) {
  return <button onClick={() => setCount(count + 1)}>Incrementa</button>;
}
```

## 💡 Esempio Completo - Filtro Prodotti

```typescript
import { useState } from 'react'

interface Prodotto {
  id: number;
  nome: string;
  categoria: string;
  prezzo: number;
}

// Componente Figlio 1: Filtro
function Filtro({ categoria, setCategoria }: {
  categoria: string;
  setCategoria: (c: string) => void;
}) {
  return (
    <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
      <option value="tutte">Tutte</option>
      <option value="elettronica">Elettronica</option>
      <option value="libri">Libri</option>
      <option value="abbigliamento">Abbigliamento</option>
    </select>
  );
}

// Componente Figlio 2: Lista
function ListaProdotti({ prodotti }: { prodotti: Prodotto[] }) {
  return (
    <ul>
      {prodotti.map(p => (
        <li key={p.id}>{p.nome} - €{p.prezzo}</li>
      ))}
    </ul>
  );
}

// Genitore: gestisce state
function NegozioApp() {
  const [categoriaFiltro, setCategoriaFiltro] = useState("tutte");

  const prodotti: Prodotto[] = [
    { id: 1, nome: "Laptop", categoria: "elettronica", prezzo: 899 },
    { id: 2, nome: "Libro React", categoria: "libri", prezzo: 30 },
    { id: 3, nome: "T-Shirt", categoria: "abbigliamento", prezzo: 20 }
  ];

  const prodottiFiltrati = categoriaFiltro === "tutte"
    ? prodotti
    : prodotti.filter(p => p.categoria === categoriaFiltro);

  return (
    <div>
      <h1>Negozio</h1>
      <Filtro categoria={categoriaFiltro} setCategoria={setCategoriaFiltro} />
      <ListaProdotti prodotti={prodottiFiltrati} />
      <p>Prodotti mostrati: {prodottiFiltrati.length}</p>
    </div>
  );
}
```

## ✏️ Esercizio

### Parte 1: Temperature Converter
Due input (Celsius/Fahrenheit) sincronizzati:

```typescript
function TemperatureConverter() {
  const [temperatura, setTemperatura] = useState(0);
  const [scala, setScala] = useState<"C" | "F">("C");

  return (
    <>
      <InputCelsius temp={temperatura} scala={scala} onChange={setTemperatura} onScalaChange={setScala} />
      <InputFahrenheit temp={temperatura} scala={scala} onChange={setTemperatura} onScalaChange={setScala} />
      <Risultato temp={temperatura} scala={scala} />
    </>
  );
}
```

### Parte 2: Search Filter
Input ricerca condiviso da due liste:

```typescript
function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const studenti = ["Mario", "Luigi", "Anna"];
  const corsi = ["Informatica", "Matematica", "Italiano"];

  return (
    <>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <ListaStudenti studenti={studenti} filtro={searchTerm} />
      <ListaCorsi corsi={corsi} filtro={searchTerm} />
    </>
  );
}
```

## 📖 Concetti Chiave

- ✅ **Lifting state up** = spostare state al genitore comune
- ✅ **Single source of truth** = unica fonte di verità
- ✅ **Props down, events up** = dati giù, eventi su
- ✅ **Callback props** = funzioni passate come props

## ➡️ Prossimo: ES55 - Forms Controllati
