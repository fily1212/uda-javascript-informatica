# ES33 - Array e Tuple

## 📘 Tipo: UDA - Fisica

## 🎯 Obiettivi
- Array tipizzati
- Tuple types
- readonly arrays
- Applicare a vettori fisici

## 🔗 Connessione: Fisica - Vettori e Coordinate
Modellare vettori fisici con tuple [x, y, z]

## 📚 Teoria
```typescript
// Array
let numeri: number[] = [1, 2, 3];
let nomi: Array<string> = ["a", "b"];

// Tuple - dimensione fissa
let punto: [number, number] = [10, 20];
let persona: [string, number] = ["Mario", 30];

// Readonly
let costanti: readonly number[] = [1, 2, 3];
// costanti.push(4);  // Error

// Destructuring
let [x, y] = punto;
```

## ✏️ Esercizio - Vettori Fisici
```typescript
type Vettore2D = [number, number];
type Vettore3D = [number, number, number];

function modulo(v: Vettore2D): number {
  return Math.sqrt(v[0]**2 + v[1]**2);
}

function somma(v1: Vettore2D, v2: Vettore2D): Vettore2D {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}
```

1. Crea tipo Vettore3D
2. Funzioni: modulo, somma, sottrazione
3. Array readonly di costanti fisiche
4. Tuple per coordinate spaziali

## 💡 Suggerimenti
- Tuple per strutture fisse
- Array per collezioni variabili
- readonly per immutabilità
- Destructuring con tuple

## ➡️ Prossimo: ES34 - Type Aliases
