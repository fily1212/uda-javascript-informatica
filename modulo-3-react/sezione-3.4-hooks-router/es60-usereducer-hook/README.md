# ES60 - useReducer Hook

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire quando usare useReducer
- Pattern reducer (state + actions)
- Gestire state complesso
- Alternative a useState

## 📚 Teoria - useReducer: State Management Avanzato

### Il Problema con useState

Con state complessi, `useState` diventa difficile da gestire:

```typescript
// ❌ Troppi useState!
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Tante funzioni separate...
  const addTodo = (text) => { /* ... */ };
  const removeTodo = (id) => { /* ... */ };
  const toggleTodo = (id) => { /* ... */ };
  // ...
}
```

### La Soluzione: useReducer

**useReducer** = gestisce state complesso con **actions** (come Redux):

```typescript
const [state, dispatch] = useReducer(reducer, initialState);
```

**Concetto:**
1. **State**: oggetto con tutti i dati
2. **Actions**: oggetti che descrivono cosa fare
3. **Reducer**: funzione che aggiorna state in base all'action
4. **Dispatch**: funzione per inviare actions

### Anatomia Completa

```typescript
import { useReducer } from 'react'

// 1. Definisci State type
interface State {
  count: number;
  error: string | null;
}

// 2. Definisci Action types
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_ERROR'; payload: string };

// 3. Crea Reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };

    case 'DECREMENT':
      return { ...state, count: state.count - 1 };

    case 'RESET':
      return { ...state, count: 0 };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

// 4. Usa nel componente
function Counter() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    error: null
  });

  return (
    <div>
      <p>Count: {state.count}</p>
      {state.error && <p>Error: {state.error}</p>}

      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### useState vs useReducer

**Usa useState quando:**
- ✅ State semplice (string, number, boolean)
- ✅ Poche transizioni di state
- ✅ State locale e indipendente

**Usa useReducer quando:**
- ✅ State complesso (oggetti, array annidati)
- ✅ Molte transizioni di state
- ✅ State con logica complessa
- ✅ Più state correlati tra loro

### Reducer: Le Regole

Il reducer DEVE essere una **funzione pura**:

```typescript
// ✅ CORRETTO - Pura, immutabile
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload] // Nuovo array
      };
    default:
      return state;
  }
}

// ❌ SBAGLIATO - Muta state!
function badReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      state.todos.push(action.payload); // ❌ Mutazione!
      return state;
    default:
      return state;
  }
}
```

**Regole:**
1. ✅ **Non mutare** lo state
2. ✅ **Ritorna** nuovo state
3. ✅ **Nessun side effect** (API calls, timer, ecc.)
4. ✅ **Deterministico** (stesso input = stesso output)

### Actions con Payload

```typescript
type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload, // Usa payload
          completed: false
        }]
      };

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };

    default:
      return state;
  }
}

// Dispatch con payload
dispatch({ type: 'ADD_TODO', payload: 'Studiare React' });
dispatch({ type: 'REMOVE_TODO', payload: 123 });
```

### useReducer + Context

Pattern potente: Context per state globale con reducer:

```typescript
const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// In qualsiasi componente
function Component() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <button onClick={() => dispatch({ type: 'INCREMENT' })}>
      {state.count}
    </button>
  );
}
```

## 💡 Esempio Completo - Todo App con useReducer

```typescript
import { useReducer, useState } from 'react'
import './TodoApp.css'

// Types
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface State {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type Action =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'REMOVE_TODO'; payload: number }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' };

// Reducer
function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };

    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
}

// Component
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue("");
    }
  };

  // Filtered todos
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  // Stats
  const activeCount = state.todos.filter(t => !t.completed).length;
  const completedCount = state.todos.filter(t => t.completed).length;

  return (
    <div className="todo-app">
      <h1>📝 Todo List</h1>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Aggiungi todo..."
        />
        <button type="submit">Aggiungi</button>
      </form>

      {/* Filters */}
      <div className="filters">
        <button
          className={state.filter === 'all' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}
        >
          Tutte ({state.todos.length})
        </button>
        <button
          className={state.filter === 'active' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}
        >
          Attive ({activeCount})
        </button>
        <button
          className={state.filter === 'completed' ? 'active' : ''}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}
        >
          Completate ({completedCount})
        </button>
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span>{todo.text}</span>
            <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* Actions */}
      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        >
          Elimina completate ({completedCount})
        </button>
      )}
    </div>
  );
}

export default TodoApp;
```

## ✏️ Esercizio

### Parte 1: Counter con useReducer
Converti counter da useState a useReducer:

```typescript
// TODO: Definisci State, Action types, reducer
// Actions: INCREMENT, DECREMENT, RESET, INCREMENT_BY (con payload)
```

### Parte 2: Form con useReducer
Gestisci form complesso con useReducer:

```typescript
interface FormState {
  name: string;
  email: string;
  password: string;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

// TODO: Actions per:
// - UPDATE_FIELD (con payload: { field, value })
// - SET_ERROR (con payload: { field, error })
// - SET_SUBMITTING
// - RESET_FORM
```

## 🎯 Output Atteso

```
📝 Todo List

[Aggiungi todo...] [Aggiungi]

[Tutte (5)] [Attive (2)] [Completate (3)]

☑ Studiare React          [❌]
☐ Fare esercizi           [❌]
☑ Leggere documentazione  [❌]

[Elimina completate (3)]
```

## 💡 Suggerimenti

- **State Oggetto**: useReducer gestisce meglio oggetti complessi
- **Immutabilità**: Usa spread operator
- **Type Safety**: TypeScript union types per actions
- **Default Case**: Sempre ritorna state nel default
- **Payload**: Usa per passare dati all'action
- **Context**: Combina con Context per state globale

## 📖 Concetti Chiave

- ✅ **useReducer** = alternativa avanzata a useState
- ✅ **Reducer** = (state, action) => newState
- ✅ **Action** = oggetto { type, payload? }
- ✅ **Dispatch** = invia action al reducer
- ✅ **Immutabilità** = non mutare state
- ✅ **Funzione pura** = nessun side effect
- ✅ **Pattern Redux** = state management scalabile

## ➡️ Prossimo: ES61 - Custom Hooks
