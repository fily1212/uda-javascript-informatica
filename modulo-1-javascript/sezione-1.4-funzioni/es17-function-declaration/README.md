# ES17 - Function Declaration e Expression

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Differenze function declaration vs expression
- Comprendere hoisting
- Usare scope correttamente

## 📚 Teoria
```javascript
// Declaration - hoisted
function saluta(nome) {
  return `Ciao ${nome}`;
}

// Expression - NON hoisted
const salutaExpr = function(nome) {
  return `Ciao ${nome}`;
};
```

## ✏️ Esercizio
1. Crea funzioni matematiche (somma, sottrazione, moltiplicazione, divisione)
2. Funzione calcolatrice che accetta operazione e numeri
3. Test hoisting con declaration vs expression

## ➡️ Prossimo: ES18 - Arrow Functions
