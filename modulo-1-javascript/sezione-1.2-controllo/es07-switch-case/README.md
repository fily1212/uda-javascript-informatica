# ES07 - Switch/Case

## 📘 Tipo: UDA - Storia

## 🎯 Obiettivi
- Usare switch/case per selezione multipla
- Comprendere break e default
- Applicare a classificazione periodi storici

## 🔗 Connessione: Storia - Periodi Storici
Classificare anni in periodi:
- Antichità: < 476 d.C.
- Medioevo: 476-1492
- Età Moderna: 1492-1789
- Età Contemporanea: 1789-oggi

## 📚 Teoria
```javascript
switch (espressione) {
  case valore1:
    // codice
    break;
  case valore2:
  case valore3:  // fall-through
    // codice
    break;
  default:
    // se nessun match
}
```

## ✏️ Esercizio

1. Funzione `getPeriodoStorico(anno)` che restituisce il periodo
2. Funzione `getEventiImportanti(periodo)` che usa switch per restituire 2-3 eventi chiave
3. Classificatore secoli (es: 1789 → "XVIII secolo")

```javascript
getPeriodoStorico(1492);  // "Inizio Età Moderna"
getEventiImportanti("Medioevo");  // [...eventi...]
```

## 💡 Suggerimenti
- Usa `break` per evitare fall-through
- `default` è come `else`
- Per range usa if/else, switch per valori discreti
- Fall-through intenzionale: ometti break

## ➡️ Prossimo: ES08 - Operatore Ternario
