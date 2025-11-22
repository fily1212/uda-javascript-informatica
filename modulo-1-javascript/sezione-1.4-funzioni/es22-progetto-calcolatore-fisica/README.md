# ES22 - [PROGETTO] Calcolatore Fisico Avanzato

## 📘 Tipo: PROGETTO UDA - Fisica

## 🎯 Obiettivi Progetto
- Applicare funzioni, closures, HOF
- Creare calcolatrice fisica completa
- Implementare storico calcoli
- Validazione input

## 🔗 Connessione: Fisica - Cinematica e Dinamica

## 📚 Funzionalità

**Moduli Fisici:**
1. **Cinematica**: spazio, velocità, accelerazione, tempo
2. **Dinamica**: forza (F=ma), lavoro, energia
3. **Energia**: cinetica (½mv²), potenziale (mgh)

**Features:**
- Calcoli con unità di misura
- Storico operazioni
- Conversione unità
- Validazione fisica (no valori negativi impossibili)

## 🏗️ Architettura
```javascript
const CalcolatriceFisica = (function() {
  // Stato privato
  let storico = [];
  
  // Modulo Cinematica
  const cinematica = {
    spazio: (v, t, a = 0) => v * t + 0.5 * a * t ** 2,
    velocita: (s, t) => s / t,
    // ...
  };
  
  // Modulo Dinamica
  const dinamica = {
    forza: (m, a) => m * a,
    lavoro: (F, s) => F * s,
    // ...
  };
  
  // API pubblica
  return {
    cinematica,
    dinamica,
    storico: () => [...storico],
    aggiungiStorico(operazione, risultato) {
      storico.push({operazione, risultato, timestamp: Date.now()});
    }
  };
})();
```

## ✏️ Implementazione

### Step 1: Modulo Cinematica
Formule:
- s = v₀t + ½at² (spazio)
- v = v₀ + at (velocità finale)
- v² = v₀² + 2as (Torricelli)

### Step 2: Modulo Dinamica  
Formule:
- F = ma (forza)
- L = F·s (lavoro)
- P = L/t (potenza)

### Step 3: Modulo Energia
Formule:
- Ec = ½mv² (cinetica)
- Ep = mgh (potenziale gravitazionale)
- Em = Ec + Ep (meccanica)

### Step 4: Conversioni
- m/s ↔ km/h
- Joule ↔ calorie
- Newton ↔ kgf

### Step 5: Validazione e Storico
- Input validation
- Storico con timestamp
- Export risultati

## 🧪 Test
```javascript
// Cinematica
CalcolatriceFisica.cinematica.spazio(10, 5, 2);  // 75m

// Dinamica
CalcolatriceFisica.dinamica.forza(10, 2);  // 20N

// Energia
CalcolatriceFisica.energia.cinetica(5, 10);  // 250J

// Storico
CalcolatriceFisica.storico();  // [{operazione, risultato, timestamp}]
```

## 💡 Suggerimenti
- Usa closures per stato privato
- Factory functions per moduli
- HOF per conversioni unità
- Validazione con assert

## 🚀 Estensioni
1. Grafica web con Canvas
2. Risoluzione equazioni
3. Unità vettoriali (2D/3D)
4. Export LaTeX

## ➡️ Prossimo: ES23 - Oggetti Base
