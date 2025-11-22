# ES14 - Map, Filter, Find

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Trasformare con map
- Filtrare con filter
- Cercare con find/findIndex
- Verificare con some/every

## 📚 Teoria
```javascript
let nums = [1, 2, 3, 4, 5];

// map - trasforma ogni elemento
let doubled = nums.map(n => n * 2);  // [2,4,6,8,10]

// filter - filtra elementi
let pari = nums.filter(n => n % 2 === 0);  // [2,4]

// find - primo match
let primo = nums.find(n => n > 3);  // 4

// findIndex - indice primo match
let indice = nums.findIndex(n => n > 3);  // 3

// some - almeno uno
nums.some(n => n > 4);  // true

// every - tutti
nums.every(n => n > 0);  // true
```

## ✏️ Esercizio
Array prodotti:
```javascript
let prodotti = [
  {nome: "Laptop", prezzo: 1000, categoria: "tech"},
  {nome: "Mouse", prezzo: 25, categoria: "tech"},
  {nome: "Libro", prezzo: 15, categoria: "libri"}
];
```

1. Prezzi con IVA 22% (map)
2. Prodotti tech (filter)
3. Prodotti < 50€ (filter)
4. Primo prodotto > 100€ (find)
5. Tutti < 2000€? (every)
6. Almeno uno libro? (some)

## 💡 Suggerimenti
- Metodi funzionali non mutano originale
- Usa arrow per concisione
- Chain metodi: arr.filter().map()
- find restituisce elemento, findIndex indice

## ➡️ Prossimo: ES15 - Reduce
