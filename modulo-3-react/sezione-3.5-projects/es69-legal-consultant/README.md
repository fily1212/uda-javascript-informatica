# ES69 - Legal Consultant (Progetto)

## 📘 Tipo: UDA - Diritto + Informatica

## 🎯 Obiettivi Progetto
- Wizard multi-step
- Validazione complessa
- Generazione documenti
- **Applicazione Diritto**: Consulenza legale guidata

## 📋 Descrizione Progetto

Crea un'app di consulenza legale guidata:
- Wizard multi-step per raccolta dati
- Domande condizionali basate su risposte
- Validazione campi legali (CF, email, importi)
- Generazione bozza documento
- Salva sessioni in corso

## 💡 Tipi di Consulenza

```typescript
type TipoConsulenza =
  | 'Contratto di Lavoro'
  | 'Contratto di Locazione'
  | 'Successione'
  | 'Separazione/Divorzio';

interface DatiConsulenza {
  tipo: TipoConsulenza;
  datiPersonali: {
    nome: string;
    cognome: string;
    cf: string;
    email: string;
    telefono: string;
  };
  dettagli: Record<string, any>; // Specifici per tipo
}
```

## ✅ Features da Implementare

### Wizard Steps
1. Tipo consulenza
2. Dati personali (con validazione CF)
3. Dettagli specifici (condizionali)
4. Riepilogo
5. Genera documento

### Validazioni
- Codice Fiscale (16 caratteri, pattern)
- Email valida
- Importi numerici
- Date coerenti

### Output
- PDF bozza documento (opzionale)
- Email riepilogo
- Salva sessione

## 🎓 Connessione con Diritto

- Art. 1321 c.c. (Contratto)
- Art. 1571 c.c. (Locazione)
- Requisiti validità contratto
- Forma scritta e consenso

## ➡️ Prossimo: ES70 - Pomodoro Timer Suite (Progetto Finale)
