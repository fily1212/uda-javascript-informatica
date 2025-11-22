# ES36 - Interfacce Base

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Creare interfacce
- Proprietà opzionali (?)
- Proprietà readonly
- Extending interfaces

## 📚 Teoria
```typescript
// Interfaccia base
interface User {
  id: number;
  nome: string;
  email: string;
  età?: number;  // opzionale
  readonly createdAt: Date;  // non modificabile
}

// Extending
interface Admin extends User {
  permessi: string[];
  livello: number;
}

// Metodi
interface Calculator {
  somma(a: number, b: number): number;
  sottrai(a: number, b: number): number;
}
```

## ✏️ Esercizio
1. Interface Prodotto con proprietà opzionali
2. Interface Utente con readonly ID
3. Interface Admin extends Utente
4. Interface con metodi tipizzati
5. Array di oggetti con interface

## 💡 Suggerimenti
- Interface per shape oggetti
- extends per ereditarietà
- ? per opzionali
- readonly per immutabilità

## ➡️ Prossimo: ES37 - Interfaces vs Type
