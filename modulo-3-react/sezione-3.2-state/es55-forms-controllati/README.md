# ES55 - Forms Controllati

## 📘 Tipo: UDA - Diritto + Informatica

## 🎯 Obiettivi
- Controlled vs Uncontrolled components
- Gestire form con React
- Validazione input
- **Applicazione**: Form contratto legale

## 📚 Teoria - Controlled Inputs

### Uncontrolled vs Controlled

```typescript
// ❌ UNCONTROLLED - DOM gestisce valore
<input type="text" />

// ✅ CONTROLLED - React gestisce valore
const [value, setValue] = useState("");
<input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
```

**Controlled**: React è sempre sincronizzato con l'input!

## 💡 Esempio - Form Contratto (UDA Diritto)

```typescript
import { useState } from 'react'

interface DatiContratto {
  nomeCompleto: string;
  cf: string;
  indirizzo: string;
  tipoContratto: "lavoro" | "locazione" | "vendita";
  importo: number;
  accettaTermini: boolean;
}

function FormContratto() {
  const [dati, setDati] = useState<DatiContratto>({
    nomeCompleto: "",
    cf: "",
    indirizzo: "",
    tipoContratto: "lavoro",
    importo: 0,
    accettaTermini: false
  });

  const [errori, setErrori] = useState<string[]>([]);

  const valida = (): boolean => {
    const nuoviErrori: string[] = [];

    if (!dati.nomeCompleto) nuoviErrori.push("Nome obbligatorio");
    if (dati.cf.length !== 16) nuoviErrori.push("CF deve essere 16 caratteri");
    if (dati.importo <= 0) nuoviErrori.push("Importo deve essere positivo");
    if (!dati.accettaTermini) nuoviErrori.push("Devi accettare i termini");

    setErrori(nuoviErrori);
    return nuoviErrori.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valida()) {
      console.log("Contratto valido:", dati);
      alert("Contratto registrato!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>⚖️ Registrazione Contratto</h2>

      <input
        type="text"
        value={dati.nomeCompleto}
        onChange={(e) => setDati({ ...dati, nomeCompleto: e.target.value })}
        placeholder="Nome Completo"
      />

      <input
        type="text"
        value={dati.cf}
        onChange={(e) => setDati({ ...dati, cf: e.target.value.toUpperCase() })}
        placeholder="Codice Fiscale"
        maxLength={16}
      />

      <select
        value={dati.tipoContratto}
        onChange={(e) => setDati({ ...dati, tipoContratto: e.target.value as any })}
      >
        <option value="lavoro">Contratto di Lavoro</option>
        <option value="locazione">Contratto di Locazione</option>
        <option value="vendita">Contratto di Vendita</option>
      </select>

      <input
        type="number"
        value={dati.importo}
        onChange={(e) => setDati({ ...dati, importo: Number(e.target.value) })}
        placeholder="Importo €"
      />

      <label>
        <input
          type="checkbox"
          checked={dati.accettaTermini}
          onChange={(e) => setDati({ ...dati, accettaTermini: e.target.checked })}
        />
        Accetto i termini e condizioni (Art. 1321 c.c.)
      </label>

      {errori.length > 0 && (
        <div className="errori">
          {errori.map((err, i) => (
            <p key={i} className="error">❌ {err}</p>
          ))}
        </div>
      )}

      <button type="submit">Registra Contratto</button>
    </form>
  );
}
```

## ✏️ Esercizio

### Parte 1: Login Form con Validazione
### Parte 2: Registration Multi-Step
### Parte 3: Survey Form con Radio/Checkbox

## 📖 Concetti Chiave

- ✅ **Controlled** = value + onChange
- ✅ **preventDefault()** = blocca submit
- ✅ **Validazione** = controllo campi
- ✅ **Errori** = feedback utente

## 🎓 Connessione con Diritto

- **Contratti**: Art. 1321-1469 c.c.
- **Consenso**: Manifestazione volontà
- **Forma scritta**: Requisiti validità
- **Termini e condizioni**: GDPR compliance

## ➡️ Prossimo: ES56 - useEffect Hook
