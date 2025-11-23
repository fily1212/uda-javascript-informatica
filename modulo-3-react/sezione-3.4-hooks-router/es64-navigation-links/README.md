# ES64 - Navigation and Links

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- useNavigate hook
- Navigazione programmatica
- NavLink con stili attivi

## 📚 Teoria - Navigazione Avanzata

### useNavigate - Navigazione Programmatica

```typescript
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Dopo login...
    navigate('/dashboard'); // Vai a dashboard
  };

  return <button onClick={handleSubmit}>Login</button>;
}
```

### NavLink - Link con Stile Attivo

```typescript
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? 'red' : 'black'
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

## 💡 Esempio Completo

```typescript
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import './App.css'

function Navigation() {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
      <button onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 📖 Concetti Chiave

- ✅ **useNavigate()** = navigazione programmatica
- ✅ **NavLink** = link con stato attivo
- ✅ **navigate(-1)** = torna indietro
- ✅ **isActive** = controlla se link è attivo

## ➡️ Prossimo: ES65 - Protected Routes
