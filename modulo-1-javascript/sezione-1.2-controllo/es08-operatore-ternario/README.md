# ES08 - Operatore Ternario e Short-Circuit

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Usare operatore ternario (? :)
- Comprendere short-circuit con && e ||
- Scrivere codice conciso e leggibile

## 📚 Teoria
```javascript
// Ternario
let risultato = condizione ? valoreSeTrue : valoreSeFalse;
let status = età >= 18 ? "adulto" : "minorenne";

// Short-circuit AND (&&)
utente && utente.nome  // Se utente esiste, prendi nome

// Short-circuit OR (||)
let nome = inputNome || "Ospite";  // Default value
```

## ✏️ Esercizio
1. Converti if/else in ternario per: pari/dispari, positivo/negativo
2. Usa && per accesso sicuro a proprietà
3. Usa || per valori default
4. Validazione input con ternario

```javascript
// Esempio
function getSconto(età, èStudente) {
  return età < 18 ? 0.2 :
         èStudente ? 0.15 :
         età > 65 ? 0.1 : 0;
}
```

## 💡 Suggerimenti
- Ternario per assegnazioni semplici
- Evita ternari annidati troppo complessi
- && per null-checking
- || per fallback values

## ➡️ Prossimo: ES09 - Ciclo For
