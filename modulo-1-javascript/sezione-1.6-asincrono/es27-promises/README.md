# ES27 - Promises

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Creare e usare Promise
- Gestire then/catch/finally
- Chaining promises
- Error handling asincrono

## 📚 Teoria
```javascript
// Creazione
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Successo!");
    } else {
      reject("Errore!");
    }
  }, 1000);
});

// Consumo
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Fine"));

// Chaining
fetch('url')
  .then(res => res.json())
  .then(data => processData(data))
  .catch(err => handleError(err));
```

## ✏️ Esercizio
1. Simula caricamento dati con Promise
2. Chain multiplo di promises
3. Promise.all per operazioni parallele
4. Promise.race per timeout
5. Error handling completo

```javascript
function caricaDati(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dati = database[id];
      if (dati) resolve(dati);
      else reject("Non trovato");
    }, 1000);
  });
}
```

## 💡 Suggerimenti
- Promise ha 3 stati: pending, fulfilled, rejected
- then/catch sempre return Promise
- finally esegue sempre
- Promise.all fallisce se uno fallisce

## ➡️ Prossimo: ES28 - Async/Await
