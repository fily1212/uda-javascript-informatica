# ES61 - Custom Hooks

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Creare custom hooks
- Riusare logica tra componenti
- Composizione di hooks
- Best practices

## 📚 Teoria - Custom Hooks: Riuso di Logica

### Il Problema: Logica Duplicata

```typescript
// ❌ Stessa logica in due componenti
function ComponentA() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div>Width: {windowWidth}</div>;
}

function ComponentB() {
  // Stessa identica logica! 😫
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <p>Width: {windowWidth}</p>;
}
```

### La Soluzione: Custom Hook

```typescript
// ✅ Custom Hook riutilizzabile
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// Usalo ovunque!
function ComponentA() {
  const width = useWindowWidth();
  return <div>Width: {width}</div>;
}

function ComponentB() {
  const width = useWindowWidth();
  return <p>Width: {width}</p>;
}
```

### Regole dei Custom Hooks

1. ✅ **Nome**: Inizia SEMPRE con `use` (es. `useWindowWidth`)
2. ✅ **Return**: Può ritornare qualsiasi cosa (value, array, object)
3. ✅ **Hooks Inside**: Può usare altri hooks (useState, useEffect, ecc.)
4. ✅ **Riusabile**: Logica estratta e riutilizzabile
5. ✅ **Isolato**: Ogni chiamata ha il proprio state

### Anatomia di un Custom Hook

```typescript
function useCustomHook(param: string) {
  // 1. State locale
  const [value, setValue] = useState(initialValue);

  // 2. Effects
  useEffect(() => {
    // Logica...
  }, [param]);

  // 3. Funzioni helper
  function doSomething() {
    // ...
  }

  // 4. Return ciò che serve al componente
  return { value, setValue, doSomething };
}
```

### Custom Hooks Comuni

#### useLocalStorage - Persistenza Automatica

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  // Carica valore iniziale da localStorage
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  // Salva in localStorage quando cambia
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Uso
function Component() {
  const [name, setName] = useLocalStorage('name', 'Mario');
  // name è persistente tra refresh!
}
```

#### useFetch - Chiamate API

```typescript
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Uso
function UserList() {
  const { data, loading, error } = useFetch<User[]>('/api/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <ul>{data?.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

#### useToggle - Boolean Toggle

```typescript
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

// Uso
function Modal() {
  const { value: isOpen, toggle, setTrue, setFalse } = useToggle(false);

  return (
    <>
      <button onClick={setTrue}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </>
  );
}
```

#### useDebounce - Input Debouncing

```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Uso
function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Esegue solo dopo 500ms di inattività
    if (debouncedSearch) {
      fetchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  return <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />;
}
```

### Composizione di Hooks

Custom hooks possono usare altri custom hooks!

```typescript
function useAuth() {
  const [user, setUser] = useLocalStorage('user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const userData = await api.login(email, password);
    setUser(userData);
    setIsLoading(false);
  };

  return { user, login, isLoading };
}

function useProtectedPage() {
  const { user } = useAuth(); // Usa altro custom hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
}
```

## 💡 Esempio Completo - useForm Hook

```typescript
import { useState, ChangeEvent } from 'react'

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRules>>;
  onSubmit: (values: T) => void;
}

function useForm<T extends Record<string, string>>({
  initialValues,
  validationRules = {},
  onSubmit
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Valida on change se già touched
    if (touched[name as keyof T]) {
      validateField(name as keyof T, value);
    }
  };

  // Handle blur
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name as keyof T, value);
  };

  // Validate single field
  const validateField = (name: keyof T, value: string): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;

    if (rules.required && !value.trim()) {
      const error = "Campo obbligatorio";
      setErrors(prev => ({ ...prev, [name]: error }));
      return error;
    }

    if (rules.minLength && value.length < rules.minLength) {
      const error = `Minimo ${rules.minLength} caratteri`;
      setErrors(prev => ({ ...prev, [name]: error }));
      return error;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      const error = "Formato non valido";
      setErrors(prev => ({ ...prev, [name]: error }));
      return error;
    }

    if (rules.custom) {
      const error = rules.custom(value);
      if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
        return error;
      }
    }

    // Nessun errore
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return null;
  };

  // Validate all fields
  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    (Object.keys(values) as Array<keyof T>).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) newErrors[name] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    // Validate
    if (!validateAll()) return;

    // Submit
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  };
}

// Esempio d'uso
function RegistrationForm() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationRules: {
      name: {
        required: true,
        minLength: 2
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      password: {
        required: true,
        minLength: 6
      }
    },
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      // API call...
      reset();
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Nome"
        />
        {touched.name && errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Email"
        />
        {touched.email && errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Password"
        />
        {touched.password && errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Invio...' : 'Registrati'}
      </button>
    </form>
  );
}

export default RegistrationForm;
```

## ✏️ Esercizio

### Parte 1: useCounter
Crea hook per counter con operazioni base:

```typescript
function useCounter(initialValue: number = 0) {
  // TODO: return { count, increment, decrement, reset, set }
}
```

### Parte 2: useTimer
Hook per timer/stopwatch:

```typescript
function useTimer(initialSeconds: number = 0) {
  // TODO: return { seconds, isRunning, start, pause, reset }
}
```

### Parte 3: useArray
Hook per operazioni su array:

```typescript
function useArray<T>(initialArray: T[] = []) {
  // TODO: return { array, push, remove, filter, update, clear }
}
```

## 💡 Suggerimenti

- **Nome**: SEMPRE `use` + nome descrittivo
- **Return**: Oggetto o array (come useState)
- **TypeScript**: Usa generics per flessibilità
- **Composizione**: Usa altri hooks liberamente
- **Isolamento**: Ogni chiamata ha state separato

## 📖 Concetti Chiave

- ✅ **Custom Hook** = funzione che usa hooks
- ✅ **Naming**: Inizia con `use`
- ✅ **Riuso**: Estrae logica comune
- ✅ **Composizione**: Hooks che usano altri hooks
- ✅ **Isolamento**: State indipendente per ogni chiamata

## ➡️ Prossimo: ES62 - React Router Setup
