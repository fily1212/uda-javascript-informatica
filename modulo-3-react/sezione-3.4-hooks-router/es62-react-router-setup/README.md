# ES62 - React Router Setup

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Installare React Router
- Configurare routing
- Navigazione tra pagine
- BrowserRouter e Routes

## 📚 Teoria - Single Page Application (SPA)

### Il Problema: Pagine Multiple

App tradizionali: ogni pagina = nuovo file HTML:
```
/index.html         → Home page
/about.html         → About page
/contact.html       → Contact page
```

Ogni click = **reload completo** della pagina! 🐌

### La Soluzione: React Router

**React Router** = navigazione **senza reload**!

- ✅ URL cambiano
- ✅ Componenti cambiano
- ✅ **MA** nessun reload! ⚡

```
/              → <HomePage />
/about         → <AboutPage />
/contact       → <ContactPage />
```

### Installazione

```bash
npm install react-router-dom
```

### Setup Base

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Spiegazione:**
- `<BrowserRouter>`: Container principale
- `<Routes>`: Gruppo di route
- `<Route>`: Singola route (path → componente)

### Link e Navigazione

```typescript
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

**Usa `<Link>` invece di `<a>`!**
- ✅ `<Link to="/about">` → Nessun reload
- ❌ `<a href="/about">` → Reload pagina

## 💡 Esempio Completo - App Multi-Page

```typescript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Components
function Navigation() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">🏠 Home</Link>
      <Link to="/about" className="nav-link">ℹ️ About</Link>
      <Link to="/services" className="nav-link">⚙️ Services</Link>
      <Link to="/contact" className="nav-link">📧 Contact</Link>
    </nav>
  );
}

function HomePage() {
  return (
    <div className="page">
      <h1>🏠 Home Page</h1>
      <p>Benvenuto nella home page!</p>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <h1>ℹ️ About Us</h1>
      <p>Informazioni su di noi...</p>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="page">
      <h1>⚙️ I Nostri Servizi</h1>
      <ul>
        <li>Sviluppo Web</li>
        <li>Mobile Apps</li>
        <li>Consulting</li>
      </ul>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page">
      <h1>📧 Contattaci</h1>
      <p>Email: info@example.com</p>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="page">
      <h1>404 - Page Not Found</h1>
      <p>La pagina che cerchi non esiste.</p>
      <Link to="/">Torna alla Home</Link>
    </div>
  );
}

// App
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

## ✏️ Esercizio

Crea app con 4 pagine:
- `/` → Home
- `/products` → Lista prodotti
- `/about` → Chi siamo
- `/contact` → Form contatto

## 📖 Concetti Chiave

- ✅ **SPA** = Single Page Application
- ✅ **BrowserRouter** = container principale
- ✅ **Routes** = gruppo route
- ✅ **Route** = path → componente
- ✅ **Link** = navigazione senza reload
- ✅ **path="*"** = 404 catch-all

## ➡️ Prossimo: ES63 - Route Parameters
