# ES27 - Promises (Base)

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Comprendere operazioni asincrone
- Usare Promises base
- then, catch, finally
- Gestire errori asincroni

## 📚 Teoria

### Cosa sono le Promises

Una Promise rappresenta un valore che sarà disponibile nel futuro.

**3 Stati:**
- ⏳ **Pending**: In attesa
- ✅ **Fulfilled**: Completata con successo
- ❌ **Rejected**: Fallita con errore

### Usare una Promise

```javascript
// Simula operazione asincrona
function caricaDati() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve("Dati caricati!");
      } else {
        reject("Errore caricamento");
      }
    }, 2000);  // Aspetta 2 secondi
  });
}

// Consumare la promise
caricaDati()
  .then(risultato => {
    console.log(risultato);  // "Dati caricati!"
  })
  .catch(errore => {
    console.error(errore);
  })
  .finally(() => {
    console.log("Operazione completata");
  });
```

### then - Quando ha successo
```javascript
promise.then(risultato => {
  console.log("Successo:", risultato);
});
```

### catch - Quando fallisce
```javascript
promise.catch(errore => {
  console.error("Errore:", errore);
});
```

### finally - Sempre, alla fine
```javascript
promise.finally(() => {
  console.log("Finito (successo o errore)");
});
```

## 💡 Esempio Guidato - Download File

```javascript
function downloadFile(nomeFile) {
  console.log(`Inizio download: ${nomeFile}`);
  
  return new Promise((resolve, reject) => {
    // Simula download con setTimeout
    setTimeout(() => {
      const dimensione = Math.random() * 100;
      
      if (dimensione > 10) {
        resolve({
          nome: nomeFile,
          size: Math.round(dimensione),
          success: true
        });
      } else {
        reject(`File ${nomeFile} troppo piccolo o corrotto`);
      }
    }, 3000);  // 3 secondi
  });
}

// Usa la funzione
downloadFile("documento.pdf")
  .then(file => {
    console.log("✅ Download completato!");
    console.log(`File: ${file.nome}`);
    console.log(`Dimensione: ${file.size} MB`);
  })
  .catch(errore => {
    console.error("❌ Download fallito:");
    console.error(errore);
  })
  .finally(() => {
    console.log("--- Fine operazione ---");
  });
```

## ✏️ Esercizio

### Parte 1: Promise Base
Crea funzione `aspetta(secondi)` che restituisce Promise che si risolve dopo N secondi

```javascript
function aspetta(secondi) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Aspettato ${secondi} secondi`);
    }, secondi * 1000);
  });
}

// Test
aspetta(2)
  .then(msg => console.log(msg));  // Dopo 2 secondi: "Aspettato 2 secondi"
```

### Parte 2: Login Simulato
```javascript
function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "12 34") {
        resolve({user: username, token: "abc123"});
      } else {
        reject("Credenziali errate");
      }
    }, 1000);
  });
}

// Test
login("admin", "1234")
  .then(data => console.log("Login OK:", data))
  .catch(err => console.error("Login fallito:", err));
```

### Parte 3: Verifica Età
Crea `verificaEtà(età)` che:
- Risolve se età >= 18
- Rigetta se età < 18

### Parte 4: Sequenza di Promise
```javascript
aspetta(1)
  .then(() => {
    console.log("Primo step");
    return aspetta(1);
  })
  .then(() => {
    console.log("Secondo step");
    return aspetta(1);
  })
  .then(() => {
    console.log("Terzo step");
  });
```

## 💡 Suggerimenti
- Promise serve per operazioni che richiedono tempo
- then si esegue solo se successo
- catch cattura tutti gli errori
- finally è opzionale ma utile per cleanup

## 🚀 Sfida Extra
Crea sistema di notifiche con timer usando Promises

## ➡️ Prossimo: ES28 - Async/Await
