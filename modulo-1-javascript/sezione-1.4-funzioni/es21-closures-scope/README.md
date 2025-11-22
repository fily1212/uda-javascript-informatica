# ES21 - Closures e Scope

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Comprendere scope chain
- Padroneggiare closures
- Creare variabili private
- Usare IIFE pattern

## 📚 Teoria
**Scope**: Visibilità variabili
```javascript
let globale = "visibile ovunque";

function esterna() {
  let locale = "solo qui";
  
  function interna() {
    console.log(globale);  // OK
    console.log(locale);   // OK - closure!
  }
}
```

**Closure**: Funzione che "ricorda" scope
```javascript
function creaContatore() {
  let count = 0;  // privata
  
  return {
    incrementa: () => ++count,
    valore: () => count
  };
}

const contatore = creaContatore();
contatore.incrementa();  // 1
contatore.valore();      // 1
```

**IIFE**: Immediately Invoked Function Expression
```javascript
(function() {
  let privato = "non accessibile";
  // codice...
})();
```

## ✏️ Esercizio
1. Crea counter con stato privato
2. Factory function per oggetti con dati privati
3. Module pattern con IIFE
4. Contatore parole che mantiene storico

```javascript
const wordCounter = (function() {
  let history = [];
  
  return {
    count(text) {
      const count = text.split(' ').length;
      history.push(count);
      return count;
    },
    getHistory() {
      return [...history];
    }
  };
})();
```

## 💡 Suggerimenti
- Closure = funzione + ambiente lessicale
- Utile per encapsulation
- IIFE crea scope isolato
- Pattern module con closure

## ➡️ Prossimo: ES22 - Progetto Calcolatore Fisica
