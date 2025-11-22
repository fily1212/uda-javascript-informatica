# ES31 - Setup TypeScript e Tipi Primitivi

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Configurare progetto TypeScript
- Conoscere tipi primitivi
- Usare type annotations
- Compilare .ts in .js

## 📚 Teoria
```typescript
// Tipi primitivi
let nome: string = "Mario";
let età: number = 30;
let attivo: boolean = true;
let valore: any = "qualsiasi";  // evitare
let nulla: null = null;
let indefinito: undefined = undefined;

// Type inference
let auto = "inferito come string";

// Funzioni
function saluta(nome: string): string {
  return `Ciao ${nome}`;
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist"
  }
}
```

## ✏️ Esercizio
1. Inizializza progetto TS (`tsc --init`)
2. Crea variabili tipizzate per ogni tipo primitivo
3. Funzione calcolatrice con tipi
4. Compila e esegui con Node
5. Esperimenta con errori di tipo

## 💡 Suggerimenti
- `tsc file.ts` compila
- `tsc --watch` auto-compila
- strict mode consigliato
- Evita `any`, usa `unknown`

## ➡️ Prossimo: ES32 - Union e Intersection
