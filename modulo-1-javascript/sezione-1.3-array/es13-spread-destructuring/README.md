# ES13 - Spread e Destructuring

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Usare spread operator (...)
- Destrutturare array
- Clonare e merge array
- Estrarre valori

## 📚 Teoria
```javascript
// Spread - espandere array
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let merged = [...arr1, ...arr2];  // [1,2,3,4,5,6]

// Clonazione
let clone = [...arr1];  // copia indipendente

// Destructuring - estrarre
let [primo, secondo, ...resto] = [1, 2, 3, 4, 5];
// primo = 1, secondo = 2, resto = [3,4,5]

// Swap con destructuring
[a, b] = [b, a];
```

## ✏️ Esercizio
1. Merge due array punteggi
2. Clona array senza reference
3. Estrai primi 3 elementi con destructuring
4. Swap primo e ultimo elemento
5. Crea funzione sum(...numbers) con rest

```javascript
function max(...nums) {
  return Math.max(...nums);
}

max(1, 5, 3, 9, 2);  // 9
```

## 💡 Suggerimenti
- Spread crea nuova copia
- Destructuring assegna variabili
- Rest parameters raccoglie argomenti
- Utile per immutabilità

## ➡️ Prossimo: ES14 - Map, Filter, Find
