# ES21 - Scope e Closures (Base)

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Comprendere scope locale vs globale
- Usare closures semplici
- Creare contatori con stato privato

## 📚 Teoria

### Scope - Visibilità Variabili

```javascript
// Variabile globale
let globale = "Visibile ovunque";

function funzione1() {
  // Variabile locale
  let locale = "Solo qui dentro";
  console.log(globale);  // ✅ OK
  console.log(locale);    // ✅ OK
}

function funzione2() {
  console.log(globale);  // ✅ OK
  // console.log(locale);   // ❌ Errore! locale non esiste qui
}

console.log(globale);  // ✅ OK
// console.log(locale);   // ❌ Errore! locale non esiste qui
```

### Closures - Funzioni che "Ricordano"

Una closure è una funzione che ricorda le variabili del suo ambiente, anche dopo che la funzione esterna è terminata.

```javascript
function creaContatore() {
  let count = 0;  // Variabile privata
  
  return function() {
    count++;  // Può accedere a count!
    return count;
  };
}

const mioContatore = creaContatore();
console.log(mioContatore());  // 1
console.log(mioContatore());  // 2
console.log(mioContatore());  // 3
```

## 💡 Esempio Guidato - Counter Multipli

```javascript
function creaContatore(nome, valoreIniziale = 0) {
  let valore = valoreIniziale;
  
  return {
    incrementa: function() {
      valore++;
      console.log(`${nome}: ${valore}`);
      return valore;
    },
    decrementa: function() {
      valore--;
      console.log(`${nome}: ${valore}`);
      return valore;
    },
    vedi: function() {
      return valore;
    }
  };
}

// Crea due contatori separati
const contatoreVisite = creaContatore("Visite", 0);
const contatoreLike = creaContatore("Like", 10);

contatoreVisite.incrementa();  // Visite: 1
contatoreVisite.incrementa();  // Visite: 2
contatoreLike.incrementa();    // Like: 11
contatoreLike.incrementa();    // Like: 12

console.log(contatoreVisite.vedi());  // 2
console.log(contatoreLike.vedi());     // 12
```

## ✏️ Esercizio

### Parte 1: Scope
1. Crea una variabile globale `appName = "MyApp"`
2. Funzione che usa variabile globale e una locale
3. Testa che locale non è accessibile fuori

### Parte 2: Contatori Semplici
Crea `creaContatoreSemplice()` che restituisce oggetto con:
- `incrementa()` - aggiunge 1
- `decrementa()` - toglie 1
- `reset()` - rimette a 0
- `valore()` - mostra valore attuale

### Parte 3: Salvadanaio
```javascript
function creaSalvadanaio() {
  let saldo = 0;
  
  return {
    deposita(importo) {
      saldo += importo;
      console.log(`Depositato: €${importo}. Saldo: €${saldo}`);
    },
    preleva(importo) {
      if (importo > saldo) {
        console.log("Fondi insufficienti!");
      } else {
        saldo -= importo;
        console.log(`Prelevato: €${importo}. Saldo: €${saldo}`);
      }
    },
    getSaldo() {
      return saldo;
    }
  };
}

// Test
const mioSalvadanaio = creaSalvadanaio();
mioSalvadanaio.deposita(50);   // Depositato: €50. Saldo: €50
mioSalvadanaio.deposita(30);   // Depositato: €30. Saldo: €80
mioSalvadanaio.preleva(20);    // Prelevato: €20. Saldo: €60
mioSalvadanaio.preleva(100);   // Fondi insufficienti!
console.log(mioSalvadanaio.getSaldo());  // 60
```

### Parte 4: Carrello Spesa
Crea `creaCarrello()` con:
- Array privato `prodotti = []`
- `aggiungi(prodotto, prezzo)` - aggiunge al carrello
- `rimuovi(prodotto)` - rimuove dal carrello
- `totale()` - calcola somma prezzi
- `lista()` - mostra tutti i prodotti

## 💡 Suggerimenti
- Le closures sono utili per "nascondere" dati
- La variabile interna non è accessibile dall'esterno
- Ogni chiamata a creaContatore() crea uno scope separato
- Usa `let` per variabili private

## 🚀 Sfida Extra
Crea un sistema di autenticazione con password privata usando closures

## ➡️ Prossimo: ES22 - [PROGETTO] Calcolatore Fisico
