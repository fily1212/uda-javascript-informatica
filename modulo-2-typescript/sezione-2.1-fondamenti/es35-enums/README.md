# ES35 - Enums

## 📘 Tipo: UDA - Storia

## 🎯 Obiettivi
- Enum numerici e string
- const enum
- Reverse mapping
- Applicare a periodi storici

## 🔗 Connessione: Storia - Classificazione Periodi

## 📚 Teoria
```typescript
// Numeric enum
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right   // 3
}

// String enum
enum Status {
  Pending = "PENDING",
  Success = "SUCCESS",
  Error = "ERROR"
}

// const enum (inline)
const enum Color {
  Red,
  Green,
  Blue
}

// Uso
let dir: Direction = Direction.Up;
let status: Status = Status.Success;
```

## ✏️ Esercizio - Periodi Storici
```typescript
enum PeriodoStorico {
  Antichita = "ANTICHITA",
  Medioevo = "MEDIOEVO",
  EtaModerna = "ETA_MODERNA",
  EtaContemporanea = "ETA_CONTEMPORANEA"
}

enum TipoEvento {
  Guerra,
  Scoperta,
  Rivoluzione,
  Trattato
}

interface EventoStorico {
  titolo: string;
  anno: number;
  periodo: PeriodoStorico;
  tipo: TipoEvento;
}
```

1. Enum per periodi e tipi eventi
2. Funzione classificaPeriodo(anno) che return enum
3. Switch/case con enum
4. Array eventi tipizzati

## 💡 Suggerimenti
- String enum per debugging
- Numeric enum per flags
- const enum per performance
- Enum vs literal types

## ➡️ Prossimo: ES36 - Interfacce Base
