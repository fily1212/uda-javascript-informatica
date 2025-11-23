# ES67 - Literary Archive (Progetto)

## 📘 Tipo: UDA - Italiano + Informatica

## 🎯 Obiettivi Progetto
- CRUD completo (Create, Read, Update, Delete)
- Filtri e ricerca avanzata
- Categorie letterarie
- **Applicazione Italiano**: Catalogazione opere letterarie

## 📋 Descrizione Progetto

Crea un archivio digitale di opere letterarie con:
- Aggiungi nuove opere (titolo, autore, anno, genere, trama)
- Lista opere con filtri per genere ed epoca
- Ricerca full-text
- Modifica e elimina opere
- Statistiche (opere per autore, genere, secolo)

## 💡 Struttura Dati

```typescript
interface Opera {
  id: number;
  titolo: string;
  autore: string;
  anno: number;
  genere: 'Epica' | 'Lirica' | 'Prosa' | 'Teatro';
  movimento: string; // Es: Umanesimo, Rinascimento, Barocco, Illuminismo
  trama: string;
  citazione?: string;
}
```

## ✅ Features da Implementare

- Aggiungi opera con form validato
- Lista opere con card estetiche
- Filtri per genere, movimento, secolo
- Ricerca per titolo/autore
- Modifica opere esistenti
- Elimina con conferma
- Statistiche: opere per autore, genere timeline
- Esporta in JSON

## 🎓 Opere da Inserire (Esempi)

```typescript
const opereEsempio: Opera[] = [
  {
    id: 1,
    titolo: "La Divina Commedia",
    autore: "Dante Alighieri",
    anno: 1321,
    genere: "Epica",
    movimento: "Dolce Stil Novo",
    trama: "Viaggio nell'aldilà attraverso Inferno, Purgatorio e Paradiso",
    citazione: "Nel mezzo del cammin di nostra vita"
  },
  {
    id: 2,
    titolo: "Il Canzoniere",
    autore: "Francesco Petrarca",
    anno: 1374,
    genere: "Lirica",
    movimento: "Umanesimo",
    trama: "Raccolta di poesie dedicate all'amore per Laura",
    citazione: "Voi ch'ascoltate in rime sparse il suono"
  }
];
```

## ➡️ Prossimo: ES68 - Task Manager (Progetto)
