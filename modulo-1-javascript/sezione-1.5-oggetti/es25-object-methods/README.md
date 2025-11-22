# ES25 - Object Methods Avanzati

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Object.keys/values/entries
- Object.assign, freeze, seal
- Iterare oggetti
- Immutabilità

## 📚 Teoria
```javascript
const obj = {a: 1, b: 2, c: 3};

// Iterazione
Object.keys(obj);      // ["a", "b", "c"]
Object.values(obj);    // [1, 2, 3]
Object.entries(obj);   // [["a",1], ["b",2], ["c",3]]

// Merge
Object.assign({}, obj, {d: 4});  // {a:1, b:2, c:3, d:4}

// Immutabilità
Object.freeze(obj);    // non modificabile
Object.seal(obj);      // proprietà non aggiungibili
```

## ✏️ Esercizio
1. Converti oggetto in array di entry
2. Somma tutti valori numerici
3. Filtra proprietà per condizione
4. Crea shallow copy vs deep copy
5. Implementa Object.map custom

```javascript
function objectMap(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, fn(v)])
  );
}
```

## 💡 Suggerimenti
- Object.entries per iterare
- freeze non è deep
- assign fa shallow copy

## ➡️ Prossimo: ES26 - Progetto Database Storici
