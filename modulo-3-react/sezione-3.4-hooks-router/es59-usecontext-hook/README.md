# ES59 - useContext Hook

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire il problema del prop drilling
- Usare Context API
- useContext hook
- Condividere state globale

## 📚 Teoria - Context: State Globale Senza Props

### Il Problema: Prop Drilling

Quando devi passare props attraverso **molti** livelli di componenti:

```typescript
// ❌ Prop Drilling - Passare props attraverso molti livelli
function App() {
  const [user, setUser] = useState({ name: "Mario", theme: "dark" });

  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Sidebar user={user} />; // Passa giù
}

function Sidebar({ user }) {
  return <Menu user={user} />; // Passa giù ancora
}

function Menu({ user }) {
  return <UserProfile user={user} />; // Passa giù ancora
}

function UserProfile({ user }) {
  return <p>{user.name}</p>; // FINALMENTE usato qui!
}
```

**Problema:** `Dashboard`, `Sidebar`, `Menu` non usano `user`, ma devono passarlo giù! 😫

### La Soluzione: Context API

**Context** = un modo per condividere dati tra componenti **senza** passare props!

#### 1. Creare il Context

```typescript
import { createContext } from 'react'

interface User {
  name: string;
  theme: string;
}

// Crea context
const UserContext = createContext<User | null>(null);
```

#### 2. Fornire il Valore (Provider)

```typescript
function App() {
  const [user, setUser] = useState({ name: "Mario", theme: "dark" });

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}
```

#### 3. Consumare il Valore (useContext)

```typescript
import { useContext } from 'react'

function UserProfile() {
  const user = useContext(UserContext); // ✅ Accesso diretto!

  return <p>{user?.name}</p>;
}
```

**Adesso:** `Dashboard`, `Sidebar`, `Menu` non servono più! 🎉

### Anatomia Completa

```typescript
import { createContext, useContext, useState } from 'react'

// 1. Definisci type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Crea context
const ThemeContext = createContext<ThemeContextType | null>(null);

// 3. Provider Component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 4. Custom Hook (opzionale ma raccomandato)
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 5. Usare nei componenti
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header style={{ background: theme === 'dark' ? '#333' : '#fff' }}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}
```

### Quando Usare Context

**Usa Context per:**
- ✅ Theme (light/dark mode)
- ✅ Autenticazione (user corrente)
- ✅ Lingua/i18n (italiano/inglese)
- ✅ Settings globali
- ✅ Dati condivisi da molti componenti

**NON usare Context per:**
- ❌ State locale (usa useState)
- ❌ Props che vanno 1-2 livelli giù (passa props normalmente)
- ❌ Performance-critical data (causa re-render di tutti i consumer)

### Multiple Contexts

Puoi avere più contexts:

```typescript
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <LanguageProvider>
          <Dashboard />
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

function Dashboard() {
  const theme = useTheme();
  const user = useUser();
  const lang = useLanguage();

  return <div>...</div>;
}
```

### Context + State Management

Pattern comune: Context con reducer (vediamo useReducer dopo):

```typescript
const AppContext = createContext(null);

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
```

## 💡 Esempio Completo - App con Theme e Auth

```typescript
import { createContext, useContext, useState, useEffect } from 'react'
import './App.css'

// ============ Auth Context ============
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Carica user da localStorage al mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // Simulazione login
    const newUser = { id: 1, name: "Mario Rossi", email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: user !== null
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
}

// ============ Theme Context ============
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Carica theme da localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be within ThemeProvider');
  return context;
}

// ============ Components ============
function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>

      <div className="actions">
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {user && (
          <>
            <span>Ciao, {user.name}!</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`dashboard ${theme}`}>
      <h2>Dashboard</h2>
      <p>Benvenuto, {user?.name}!</p>
      <p>Email: {user?.email}</p>
      <p>Current theme: {theme}</p>
    </div>
  );
}

function App() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Header />
      <main>
        {isAuthenticated ? <Dashboard /> : <LoginForm />}
      </main>
    </div>
  );
}

// Root con Providers
function Root() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default Root;
```

## ✏️ Esercizio

### Parte 1: Language Context
Crea un Context per cambiare lingua (IT/EN):

```typescript
interface LanguageContextType {
  language: 'it' | 'en';
  setLanguage: (lang: 'it' | 'en') => void;
  t: (key: string) => string; // traduzione
}

const translations = {
  it: {
    welcome: "Benvenuto",
    goodbye: "Arrivederci"
  },
  en: {
    welcome: "Welcome",
    goodbye: "Goodbye"
  }
};

// TODO: Crea LanguageProvider e useLanguage hook
```

### Parte 2: Settings Context
Context per impostazioni app:

```typescript
interface Settings {
  notifications: boolean;
  soundEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// TODO: Crea SettingsProvider con:
// - state per settings
// - funzioni per aggiornare ogni setting
// - persistenza in localStorage
```

### Parte 3: Shopping Cart Context
```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  total: number;
  clearCart: () => void;
}

// TODO: Implementa CartProvider
```

## 🎯 Output Atteso

```
┌──────────────────────────────┐
│ My App    [🌙 Dark] [Logout] │
│           Ciao, Mario Rossi! │
└──────────────────────────────┘

Dashboard
────────────────────
Benvenuto, Mario Rossi!
Email: mario@example.com
Current theme: light
```

## 💡 Suggerimenti

- **createContext**: Crea context fuori dai componenti
- **Provider**: Wrap app con `<Context.Provider value={...}>`
- **useContext**: Accedi al valore con `useContext(Context)`
- **Custom Hook**: Crea `useMyContext()` per error handling
- **Default Value**: createContext può avere valore default
- **Multiple Contexts**: Nesta più Provider
- **Performance**: Context causa re-render di tutti i consumer

## 🚀 Sfida Extra

1. **Notifications Context**: Sistema notifiche globale
2. **Modal Context**: Gestisci modali da qualsiasi componente
3. **Undo/Redo Context**: History management globale
4. **Sidebar Context**: Toggle sidebar da ovunque

## 📖 Concetti Chiave

- ✅ **Prop Drilling** = passare props attraverso molti livelli
- ✅ **Context** = condividere dati senza props
- ✅ **createContext** = crea nuovo context
- ✅ **Provider** = fornisce valore ai componenti figli
- ✅ **useContext** = consuma valore del context
- ✅ **Custom Hook** = wrapper con error handling
- ✅ **Global State** = state accessibile ovunque

## ➡️ Prossimo: ES60 - useReducer Hook
