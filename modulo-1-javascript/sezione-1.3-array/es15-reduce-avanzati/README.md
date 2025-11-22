# ES15 - Reduce e Metodi Avanzati

## 📘 Tipo: UDA - Fisica

## 🎯 Obiettivi
- Padroneggiare reduce
- Usare flat e flatMap
- Applicare a calcoli vettoriali

## 🔗 Connessione: Fisica - Vettori e Somme
Calcolare somme vettoriali, medie misurazioni, grandezze cumulative

## 📚 Teoria
```javascript
// reduce - accumula valore
let nums = [1, 2, 3, 4];
let somma = nums.reduce((acc, n) => acc + n, 0);  // 10

// flat - appiattisce array
let nested = [[1, 2], [3, 4]];
nested.flat();  // [1, 2, 3, 4]

// flatMap - map + flat
let words = ["hello world", "foo bar"];
words.flatMap(s => s.split(" "));  // ["hello","world","foo","bar"]
```

## ✏️ Esercizio - Analisi Dati Fisici

Array misurazioni temperatura (°C):
```javascript
let misurazioni = [20.5, 21.2, 19.8, 22.1, 20.9];
```

1. Media temperatura (reduce)
2. Somma totale (reduce)
3. Temperatura massima (reduce)
4. Deviazione standard
5. Converti in Kelvin (map + reduce per media)

Vettori fisici:
```javascript
let vettori = [
  [3, 4],   // vettore 1: x=3, y=4
  [1, 2],   // vettore 2
  [5, 0]    // vettore 3
];
```

6. Somma vettoriale (reduce)
7. Modulo di ogni vettore: √(x² + y²)
8. Vettore risultante

## 💡 Formule Fisiche
- Media: Σ valori / n
- Modulo vettore: |v| = √(x² + y²)
- Somma vettori: v₁ + v₂ = (x₁+x₂, y₁+y₂)
- Kelvin: K = °C + 273.15

## 💡 Suggerimenti
- reduce(callback, valorIniziale)
- acc = accumulatore
- Usa Math.sqrt, Math.pow
- flat() per array multidimensionali

## ➡️ Prossimo: ES16 - Progetto Biblioteca
