# ES68 - Task Manager (Progetto)

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi Progetto
- State management complesso (useReducer)
- Filtri multipli
- Priorità e scadenze
- LocalStorage persistence

## 📋 Descrizione Progetto

Crea un task manager completo con:
- Aggiungi task con titolo, descrizione, priorità, scadenza
- Marca task come completate
- Filtra per status (tutte/attive/completate)
- Ordina per priorità o scadenza
- Categorie/Tags
- Statistiche produttività

## 💡 Struttura Dati

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: string; // ISO date
  category: string;
  createdAt: string;
}

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'priority' | 'dueDate' | 'createdAt';
```

## ✅ Features da Implementare

### Base
- Aggiungi task
- Toggle completed
- Elimina task
- Filtri status

### Intermedio
- Priorità con colori
- Scadenze con countdown
- Categorie custom
- Ricerca per testo

### Avanzato
- useReducer per state
- LocalStorage persistence
- Statistiche (completate oggi/settimana)
- Esporta/Importa JSON

## 🎨 UI Suggerimenti

- Card colorate per priorità (verde/giallo/rosso)
- Badge per scadenze imminenti
- Progress bar completamento
- Dark mode

## ➡️ Prossimo: ES69 - Legal Consultant (Progetto)
