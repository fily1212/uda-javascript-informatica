# ES32 - Union, Intersection e Literal Types

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Usare union types (|)
- Usare intersection types (&)
- Literal types
- Type narrowing/guards

## 📚 Teoria
```typescript
// Union - OR
let id: number | string;
id = 123;  // OK
id = "abc";  // OK

// Intersection - AND
type Person = {nome: string};
type Employee = {id: number};
type Worker = Person & Employee;  // entrambi

// Literal types
let direzione: "nord" | "sud" | "est" | "ovest";
direzione = "nord";  // OK
// direzione = "centro";  // Error

// Type narrowing
function print(val: string | number) {
  if (typeof val === "string") {
    console.log(val.toUpperCase());  // string methods
  } else {
    console.log(val.toFixed(2));  // number methods
  }
}
```

## ✏️ Esercizio
1. Funzione accetta ID number o string
2. Type per Result (success o error)
3. Literal types per stati ("pending" | "success" | "error")
4. Type guards con typeof/instanceof

## 💡 Suggerimenti
- Union per "o questo o quello"
- Intersection per combinare
- Literal per enum semplici
- Type guards per narrowing

## ➡️ Prossimo: ES33 - Array e Tuple
