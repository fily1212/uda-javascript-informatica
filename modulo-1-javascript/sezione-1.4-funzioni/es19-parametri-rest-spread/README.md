# ES19 - Parametri e Rest/Spread

## 📘 Tipo: UDA - Diritto

## 🎯 Obiettivi
- Parametri default
- Rest parameters (...)
- Applicare a calcoli legali

## 🔗 Connessione: Diritto - Calcolo Sanzioni
Calcolare sanzioni con parametri opzionali (circostanze attenuanti/aggravanti)

## 📚 Teoria
```javascript
// Default
function saluta(nome = "Ospite") {
  return `Ciao ${nome}`;
}

// Rest parameters
function somma(...numeri) {
  return numeri.reduce((a, b) => a + b, 0);
}
```

## ✏️ Esercizio
Calcolatore sanzioni amministrative:
- Importo base
- Percentuali attenuanti/aggravanti opzionali
- Somma variabile di aggravanti

```javascript
calcolaSanzione(100, 0.5);  // base + 50%
calcolaSanzione(100, 0.5, -0.2, -0.1);  // base + 50% - 20% - 10%
```

## ➡️ Prossimo: ES20 - Callback e HOF
