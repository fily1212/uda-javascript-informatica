# ES09 - Ciclo For

## 📘 Tipo: UDA - TLC

## 🎯 Obiettivi
- Padroneggiare il ciclo for
- Usare break e continue
- Analizzare spettro frequenze radio

## 🔗 Connessione: TLC - Bande Radio
Classificazione frequenze:
- VLF (Very Low): 3-30 kHz
- LF (Low): 30-300 kHz
- MF (Medium): 300-3000 kHz
- HF (High): 3-30 MHz
- VHF (Very High): 30-300 MHz
- UHF (Ultra High): 300-3000 MHz

## 📚 Teoria
```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// break - esci dal loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
}

// continue - salta iterazione
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue;  // salta pari
  console.log(i);  // stampa solo dispari
}
```

## ✏️ Esercizio
1. Analizza array di frequenze [88, 150, 450, 1800, 2400] MHz
2. Classifica ciascuna nella banda corretta
3. Conta quante frequenze per banda
4. Trova prima frequenza VHF
5. Calcola media frequenze UHF

```javascript
let frequenze = [88, 100, 450, 900, 1800, 2400];  // MHz
// Output: {VHF: 2, UHF: 4}
```

## 💡 Suggerimenti
- MHz = 1000 kHz
- Usa if/else within loop
- break per trovare primo match
- continue per skipare

## ➡️ Prossimo: ES10 - While e Do-While
