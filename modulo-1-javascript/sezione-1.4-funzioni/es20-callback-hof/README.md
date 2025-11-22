# ES20 - Callback e Higher-Order Functions

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Comprendere le callback functions
- Creare higher-order functions (HOF)
- Passare funzioni come parametri
- Applicare pattern funzionale

## 📚 Teoria
**Callback**: Funzione passata come argomento
```javascript
function eseguiOperazione(a, b, operazione) {
  return operazione(a, b);
}

eseguiOperazione(5, 3, (x, y) => x + y);  // 8
```

**Higher-Order Function**: Funzione che accetta/restituisce funzioni
```javascript
function creaMultiplicatore(fattore) {
  return function(numero) {
    return numero * fattore;
  };
}

const raddoppia = creaMultiplicatore(2);
raddoppia(5);  // 10
```

## ✏️ Esercizio
1. Implementa custom `forEach`, `map`, `filter`
2. Crea `pipe` che compone funzioni
3. Funzione `retry` che riprova operazione N volte
4. Sistema di logger con callback per diversi livelli

```javascript
function customMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i], i));
  }
  return result;
}
```

## 💡 Suggerimenti
- Callback rendono codice riutilizzabile
- HOF sono base programmazione funzionale
- Array methods sono esempi di HOF
- Usa arrow per callback brevi

## 🚀 Sfida
Implementa `debounce` e `throttle` con callback

## ➡️ Prossimo: ES21 - Closures e Scope
