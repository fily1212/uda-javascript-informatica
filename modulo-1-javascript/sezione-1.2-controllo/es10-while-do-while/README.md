# ES10 - While e Do-While

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Usare while e do-while
- Evitare loop infiniti
- Applicare a validazione input

## 📚 Teoria
```javascript
// While - controlla prima
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// Do-While - esegue almeno 1 volta
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

// Differenza chiave
while (false) {
  // non esegue MAI
}

do {
  // esegue UNA volta
} while (false);
```

## ✏️ Esercizio
1. Algoritmo ricerca lineare con while
2. Validazione password con do-while (retry finché valida)
3. Gioco indovina numero con while
4. Contatore con condizione variabile

```javascript
// Validazione con retry
function validaPassword(input) {
  let tentativi = 0;
  let valida = false;
  
  do {
    // logica validazione
    tentativi++;
  } while (!valida && tentativi < 3);
  
  return valida;
}
```

## 💡 Suggerimenti
- While quando non sai iterazioni
- Do-while per "almeno una volta"
- Attenzione loop infiniti!
- Incrementa contatore

## ➡️ Prossimo: ES11 - Array Base
