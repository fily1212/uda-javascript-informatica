# ES06 - If/Else e Condizionali

## 📘 Tipo: UDA - Fisica

## 🎯 Obiettivi
- Usare if/else per decisioni
- Creare condizioni annidate
- Applicare operatori di confronto
- Classificare tipi di moto fisico

## 🔗 Connessione: Fisica - Tipi di Moto
Classificare moto in base a velocità e accelerazione:
- **Rettilineo uniforme**: v costante, a = 0
- **Uniformemente accelerato**: a costante ≠ 0
- **Circolare**: cambia direzione
- **Vario**: a variabile

## 📚 Teoria
```javascript
if (condizione) {
  // esegui se true
} else if (altraCondizione) {
  // esegui se prima false, questa true  
} else {
  // esegui se tutte false
}
```

## ✏️ Esercizio

Crea classificatore di moto:
```javascript
function classificaMoto(velocita, accelerazione, direzioneCambia) {
  // Logica classificazione
}

// Test
classificaMoto(10, 0, false);     // "Rettilineo uniforme"
classificaMoto(15, 2, false);     // "Uniformemente accelerato"
classificaMoto(20, 5, true);      // "Circolare"
```

Aggiungi:
1. Verifica che velocità e accelerazione siano >= 0
2. Calcola spazio percorso dopo 5s (s = v*t + 1/2*a*t²)
3. Determina se oggetto si ferma (v finale = 0)

## 💡 Suggerimenti
- Usa condizioni multiple con `&&` e `||`
- Annida if quando necessario
- Restituisci early per semplicità

## 📖 Formula Fisica
- Spazio: s = v₀t + ½at²
- Velocità finale: v = v₀ + at

## ➡️ Prossimo: ES07 - Switch/Case
