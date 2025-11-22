# ES12 - Iterazione Array

## 📘 Tipo: UDA - Italiano

## 🎯 Obiettivi
- Iterare array con for, for...of, forEach
- Analizzare testi letterari
- Contare caratteristiche linguistiche

## 🔗 Connessione: Italiano - Analisi Testuale
Analizzare frequenza lettere, vocali/consonanti in testi

## 📚 Teoria
```javascript
let arr = ['a', 'b', 'c'];

// for classico
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// for...of (ES6) - più leggibile
for (let elemento of arr) {
  console.log(elemento);
}

// forEach - funzionale
arr.forEach(function(elemento, indice) {
  console.log(elemento, indice);
});

// forEach con arrow
arr.forEach((el, i) => console.log(el, i));
```

## ✏️ Esercizio
Dato testo letterario:
```javascript
let testo = "Nel mezzo del cammin di nostra vita";
```

1. Converti in array di caratteri
2. Conta vocali e consonanti
3. Trova lettere più frequenti
4. Conta parole (split + length)
5. Array parole ordinate per lunghezza

Output:
```
Caratteri: 37
Vocali: 15 (a:5, e:4, i:3, o:2, u:1)
Consonanti: 16
Parole: 7
```

## 💡 Suggerimenti
- `.split("")` per array caratteri
- `.toLowerCase()` per case-insensitive
- for...of più leggibile
- forEach quando serve indice

## ➡️ Prossimo: ES13 - Spread e Destructuring
