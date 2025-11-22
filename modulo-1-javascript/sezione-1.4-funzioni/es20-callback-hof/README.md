# ES20 - Consolidamento Funzioni

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Consolidare funzioni (declaration, expression, arrow)
- Praticare parametri e return
- Risolvere problemi reali
- Organizzare codice con funzioni

## 📚 Teoria - Ripasso Funzioni

Hai imparato tre modi per creare funzioni. Rivediamoli!

### 1. Function Declaration
```javascript
function saluta(nome) {
  return `Ciao ${nome}!`;
}

console.log(saluta("Mario"));  // "Ciao Mario!"
```

### 2. Arrow Function
```javascript
const saluta = (nome) => {
  return `Ciao ${nome}!`;
};

// Versione corta (implicit return)
const salutaBreve = nome => `Ciao ${nome}!`;

console.log(salutaBreve("Luigi"));  // "Ciao Luigi!"
```

### 3. Parametri e Return
```javascript
// Funzione con parametri multipli
function somma(a, b) {
  return a + b;
}

// Parametri con default
function salutaConDefault(nome = "Ospite") {
  return `Benvenuto, ${nome}!`;
}

console.log(salutaConDefault());  // "Benvenuto, Ospite!"
console.log(salutaConDefault("Anna"));  // "Benvenuto, Anna!"
```

### 4. Funzioni che chiamano altre funzioni
```javascript
function raddoppia(n) {
  return n * 2;
}

function quadrupla(n) {
  return raddoppia(raddoppia(n));  // usa raddoppia due volte
}

console.log(quadrupla(5));  // 20
```

## 💡 Esempio Guidato Completo - Calcolatrice

```javascript
// Operazioni base
function somma(a, b) {
  return a + b;
}

function sottrazione(a, b) {
  return a - b;
}

function moltiplicazione(a, b) {
  return a * b;
}

function divisione(a, b) {
  if (b === 0) {
    return "Errore: divisione per zero";
  }
  return a / b;
}

// Funzione principale calcolatrice
function calcolatrice(num1, num2, operazione) {
  console.log(`Calcolo: ${num1} ${operazione} ${num2}`);

  if (operazione === "+") {
    return somma(num1, num2);
  } else if (operazione === "-") {
    return sottrazione(num1, num2);
  } else if (operazione === "*") {
    return moltiplicazione(num1, num2);
  } else if (operazione === "/") {
    return divisione(num1, num2);
  } else {
    return "Operazione non valida";
  }
}

// Test
console.log(calcolatrice(10, 5, "+"));   // 15
console.log(calcolatrice(10, 5, "-"));   // 5
console.log(calcolatrice(10, 5, "*"));   // 50
console.log(calcolatrice(10, 5, "/"));   // 2
console.log(calcolatrice(10, 0, "/"));   // "Errore: divisione per zero"
```

## ✏️ Esercizio

### Parte 1: Funzioni Base
Crea queste funzioni:

1. `isP ari(numero)` - restituisce true se pari
2. `isDispari(numero)` - restituisce true se dispari
3. `massimo(a, b)` - restituisce il maggiore tra due numeri
4. `minimo(a, b)` - restituisce il minore tra due numeri
5. `media(a, b, c)` - calcola la media di 3 numeri

### Parte 2: Conversioni
Crea funzioni di conversione:

1. `celsiusToFahrenheit(celsius)` - formula: F = C * 9/5 + 32
2. `fahrenheitToCelsius(fahrenheit)` - formula: C = (F - 32) * 5/9
3. `kmToMiles(km)` - 1 km = 0.621371 miglia
4. `milesToKm(miles)` - inverso

### Parte 3: Validazioni
Crea funzioni che validano dati:

1. `isEmail(email)` - controlla se contiene "@" e "."
2. `isPasswordForte(password)` - almeno 8 caratteri
3. `isNumeroTelefono(numero)` - esattamente 10 cifre
4. `isMaggiorenne(età)` - età >= 18

### Parte 4: String Utilities
Crea funzioni per manipolare stringhe:

1. `maiuscola(testo)` - converte in maiuscolo
2. `minuscola(testo)` - converte in minuscolo
3. `inizialeMaiuscola(testo)` - "mario" → "Mario"
4. `contaParole(testo)` - conta le parole in una frase
5. `invertiStringa(testo)` - "ciao" → "oaic"

### Parte 5: Applicazione Pratica
Crea un sistema di gestione voti:

```javascript
function calcolaMediaVoti(voti) {
  // Calcola la media di un array di voti
  let somma = 0;
  for (let voto of voti) {
    somma += voto;
  }
  return somma / voti.length;
}

function èPromosso(voti) {
  // Promosso se media >= 6
  const media = calcolaMediaVoti(voti);
  return media >= 6;
}

function giudizio(voti) {
  // Restituisce giudizio in base alla media
  const media = calcolaMediaVoti(voti);
  if (media >= 9) return "Eccellente";
  if (media >= 8) return "Ottimo";
  if (media >= 7) return "Buono";
  if (media >= 6) return "Sufficiente";
  return "Insufficiente";
}

// Test
let votiMario = [7, 8, 6.5, 7.5, 8];
console.log("Media:", calcolaMediaVoti(votiMario));  // 7.4
console.log("Promosso:", èPromosso(votiMario));  // true
console.log("Giudizio:", giudizio(votiMario));  // "Buono"
```

## 🎯 Output Atteso

```
=== PARTE 1: FUNZIONI BASE ===
5 è pari: false
5 è dispari: true
Massimo tra 10 e 15: 15
Minimo tra 10 e 15: 10
Media di 7, 8, 9: 8

=== PARTE 2: CONVERSIONI ===
25°C = 77°F
77°F = 25°C
100 km = 62.14 miglia
62.14 miglia = 100 km

=== PARTE 3: VALIDAZIONI ===
mario@email.com è email valida: true
Pass123 è forte: true
3331234567 è tel valido: true
20 è maggiorenne: true

=== PARTE 4: STRING UTILITIES ===
Maiuscolo: CIAO MONDO
Iniziale maiuscola: Mario
Conta parole in "Ciao come stai": 3
Inverti "ciao": oaic

=== PARTE 5: GESTIONE VOTI ===
Voti di Mario: [7, 8, 6.5, 7.5, 8]
Media: 7.4
Promosso: true
Giudizio: Buono
```

## 💡 Suggerimenti

- Dai nomi descrittivi alle funzioni
- Una funzione = un compito specifico
- Usa return per restituire risultati
- Riutilizza funzioni chiamandole da altre funzioni
- Testa ogni funzione con console.log

## 🚀 Sfida Extra

1. **Sistema Sconti**: Funzioni per calcolare prezzi scontati in base a categorie cliente
2. **Validatore Form**: Set completo di validazioni per form registrazione
3. **Convertitore Universale**: Funzioni per convertire unità di misura varie

## 📖 Best Practices

- ✅ Nomi descrittivi: `calcolaMedia` meglio di `calc`
- ✅ Funzioni piccole: meglio tante piccole che una grande
- ✅ Un solo compito per funzione
- ✅ Evita variabili globali dentro funzioni
- ✅ Usa parametri invece di valori hardcoded

## ➡️ Prossimo: ES21 - Closures e Scope
