# ES68 - [PROGETTO] Task Manager Avanzato

## 📘 Tipo: PROGETTO PURO

## 🎯 Obiettivi
- Task manager complesso
- useReducer per state management
- Drag & drop (opzionale)
- Filtri e statistiche

## 📚 Features
- CRUD tasks complete
- Categorie e priorità
- Scadenze e reminder
- Filtri multipli
- Statistiche (completed, pending)
- Export/Import JSON

## 🏗️ State Management
```typescript
type Task = {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: Date;
};

type Action = 
  | {type: 'ADD_TASK'; task: Task}
  | {type: 'TOGGLE'; id: string}
  | {type: 'DELETE'; id: string};

function reducer(state: Task[], action: Action) {
  // ...
}
```

## 💡 Suggerimenti
- useReducer per complex state
- localStorage per persistenza
- React DnD library (opzionale)

## ➡️ Prossimo: ES69 - Consulente Normativo
