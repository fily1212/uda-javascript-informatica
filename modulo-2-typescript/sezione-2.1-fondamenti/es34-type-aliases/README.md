# ES34 - Type Aliases

## 📘 Tipo: UDA - Italiano

## 🎯 Obiettivi
- Creare type aliases
- Comporre tipi complessi
- Organizzare tipi
- Applicare a catalogazione opere

## 🔗 Connessione: Italiano - Gerarchia Opere Letterarie

## 📚 Teoria
```typescript
// Type alias
type ID = number | string;
type Callback = (data: string) => void;

// Composizione
type Point = {x: number; y: number};
type Circle = {center: Point; radius: number};

// Riuso
type User = {
  id: ID;
  nome: string;
  email: string;
};
```

## ✏️ Esercizio - Sistema Letterario
```typescript
type GenereLetterario = "romanzo" | "poesia" | "saggio" | "teatro";

type Autore = {
  nome: string;
  cognome: string;
  annoNascita: number;
};

type Opera = {
  titolo: string;
  autore: Autore;
  anno: number;
  genere: GenereLetterario;
  pagine?: number;  // opzionale
};

type Biblioteca = Opera[];
```

1. Crea gerarchia tipi per sistema bibliotecario
2. Type per Libro extends Opera
3. Type per Raccolta con array Opere
4. Funzioni tipizzate per ricerca

## 💡 Suggerimenti
- type per dare nomi significativi
- Componi tipi piccoli in grandi
- ? per proprietà opzionali
- | per union di literal

## ➡️ Prossimo: ES35 - Enums
