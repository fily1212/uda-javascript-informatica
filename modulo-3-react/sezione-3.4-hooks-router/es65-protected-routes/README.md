# ES65 - Protected Routes

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Route protette da autenticazione
- Redirect automatici
- Pattern di protezione

## 📚 Teoria - Proteggere le Route

### Il Problema

Alcune pagine devono essere accessibili solo se autenticati:

```typescript
// ❌ Chiunque può accedere!
<Route path="/dashboard" element={<Dashboard />} />
```

### La Soluzione: Protected Route Component

```typescript
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = /* controlla auth */;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Uso
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 💡 Esempio Completo

```typescript
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'

// Auth Context
const AuthContext = createContext<{
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
} | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Pages
function HomePage() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated ? (
        <>
          <p>You are logged in!</p>
          <button onClick={logout}>Logout</button>
          <Link to="/dashboard">Go to Dashboard</Link>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}

function LoginPage() {
  const { login } = useAuth();

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard (Protected)</h1>
      <p>This page is only visible when authenticated</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

// App
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

## 📖 Concetti Chiave

- ✅ **ProtectedRoute** = component wrapper
- ✅ **Navigate** = redirect programmatico
- ✅ **replace** = sostituisci history (no back button)
- ✅ **Auth Context** = stato auth globale

## ➡️ Prossimo: ES66 - Weather Dashboard (Progetto)
