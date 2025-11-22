# ES49 - Composition e Children

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire la composizione di componenti
- Usare la prop `children`
- Pattern Container/Presentational
- Layout components riutilizzabili

## 📚 Teoria - Composizione: Costruire con i Mattoncini

### Cos'è la Composizione?

**Composizione** = costruire componenti complessi **combinando** componenti più semplici.

È come i LEGO:
- 🧱 Ogni mattoncino = un componente
- 🏗️ Combini i mattoncini = composizione
- 🏰 Risultato = applicazione completa

### La Prop Speciale: children

`children` è una **prop automatica** che contiene tutto ciò che viene inserito **tra i tag** di apertura e chiusura di un componente.

#### Esempio Base

```typescript
// Componente Container
interface ContainerProps {
  children: React.ReactNode;  // tipo per children
}

function Container({ children }: ContainerProps) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

// Uso - tutto tra i tag diventa "children"
function App() {
  return (
    <Container>
      <h1>Titolo</h1>
      <p>Questo è il contenuto!</p>
      <button>Click</button>
    </Container>
  );
}
```

**Risultato HTML:**
```html
<div class="container">
  <h1>Titolo</h1>
  <p>Questo è il contenuto!</p>
  <button>Click</button>
</div>
```

### Perché Usare children?

**Senza children** (componente rigido):
```typescript
function Card() {
  return (
    <div className="card">
      <h3>Titolo fisso</h3>
      <p>Contenuto fisso</p>
    </div>
  );
}
```

**Con children** (componente flessibile):
```typescript
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>;
}

// Ora puoi usarlo per QUALSIASI contenuto!
<Card>
  <h3>Titolo 1</h3>
  <p>Contenuto 1</p>
</Card>

<Card>
  <img src="foto.jpg" />
  <span>Foto di gruppo</span>
</Card>

<Card>
  <ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
  </ul>
</Card>
```

### Pattern: Layout Components

I **layout components** sono contenitori riutilizzabili che definiscono la **struttura** dell'interfaccia.

#### 1. Container (Centrare il contenuto)

```typescript
interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
}

function Container({ children, maxWidth = "1200px" }: ContainerProps) {
  return (
    <div style={{
      maxWidth: maxWidth,
      margin: "0 auto",
      padding: "1rem"
    }}>
      {children}
    </div>
  );
}

// Uso
<Container maxWidth="800px">
  <h1>Contenuto centrato</h1>
  <p>Testo della pagina</p>
</Container>
```

#### 2. Card (Box con stile)

```typescript
interface CardProps {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
}

function Card({ children, title, footer }: CardProps) {
  return (
    <div className="card">
      {title && <div className="card-header"><h3>{title}</h3></div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Uso
<Card
  title="Informazioni Utente"
  footer={<button>Salva</button>}
>
  <p>Nome: Mario</p>
  <p>Email: mario@example.com</p>
</Card>
```

#### 3. Modal/Dialog (Finestra modale)

```typescript
interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;  // Non mostrare se chiuso

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

// Uso
<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
  <h2>Conferma Eliminazione</h2>
  <p>Sei sicuro di voler eliminare questo elemento?</p>
  <button>Elimina</button>
  <button onClick={() => setShowModal(false)}>Annulla</button>
</Modal>
```

### Pattern: Container/Presentational

Separare i componenti in due categorie:

**Container (Smart)**: gestiscono logica e dati
**Presentational (Dumb)**: mostrano solo UI

#### Esempio: Lista Studenti

```typescript
// 📊 PRESENTATIONAL - Solo UI
interface StudentCardProps {
  nome: string;
  voto: number;
}

function StudentCard({ nome, voto }: StudentCardProps) {
  return (
    <div className="student-card">
      <h3>{nome}</h3>
      <p>Voto: {voto}</p>
      <span className={voto >= 6 ? "promosso" : "bocciato"}>
        {voto >= 6 ? "✅ Promosso" : "❌ Bocciato"}
      </span>
    </div>
  );
}

// 🧠 CONTAINER - Logica e dati
function StudentList() {
  const studenti = [
    { id: 1, nome: "Mario", voto: 7 },
    { id: 2, nome: "Luigi", voto: 5 },
    { id: 3, nome: "Anna", voto: 8 }
  ];

  return (
    <div className="student-list">
      <h2>Lista Studenti</h2>
      {studenti.map(studente => (
        <StudentCard
          key={studente.id}
          nome={studente.nome}
          voto={studente.voto}
        />
      ))}
    </div>
  );
}
```

**Vantaggi:**
- ✅ Componenti presentational riutilizzabili
- ✅ Più facile da testare
- ✅ Separazione responsabilità

### Composizione Avanzata: Slot Pattern

Passa **multiple sezioni** al componente:

```typescript
interface PageLayoutProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;  // main content
  footer: React.ReactNode;
}

function PageLayout({ header, sidebar, children, footer }: PageLayoutProps) {
  return (
    <div className="page-layout">
      <header className="header">{header}</header>
      <div className="content-wrapper">
        <aside className="sidebar">{sidebar}</aside>
        <main className="main-content">{children}</main>
      </div>
      <footer className="footer">{footer}</footer>
    </div>
  );
}

// Uso
<PageLayout
  header={<h1>Dashboard</h1>}
  sidebar={
    <nav>
      <a href="/home">Home</a>
      <a href="/profile">Profilo</a>
    </nav>
  }
  footer={<p>© 2024 My App</p>}
>
  {/* Main content */}
  <h2>Benvenuto</h2>
  <p>Questo è il contenuto principale</p>
</PageLayout>
```

## 💡 Esempio Guidato Completo - Sistema Layout

Creiamo un sistema di layout componibili per un'applicazione!

### 1. Base: Container

```typescript
import './Container.css'

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`container ${className}`}>
      {children}
    </div>
  );
}

export default Container;
```

```css
/* Container.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
```

### 2. Card Component

```typescript
import './Card.css'

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "primary" | "success" | "danger";
}

function Card({ children, variant = "default" }: CardProps) {
  return (
    <div className={`card card-${variant}`}>
      {children}
    </div>
  );
}

export default Card;
```

```css
/* Card.css */
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-primary { border-left: 4px solid #007bff; }
.card-success { border-left: 4px solid #28a745; }
.card-danger { border-left: 4px solid #dc3545; }
```

### 3. Section Component

```typescript
interface SectionProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

function Section({ title, children, action }: SectionProps) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>{title}</h2>
        {action && <div className="section-action">{action}</div>}
      </div>
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}
```

### 4. Componiamo tutto in App!

```typescript
import Container from './Container'
import Card from './Card'
import Section from './Section'

function App() {
  return (
    <Container>
      <h1>Dashboard Studente</h1>

      <Section
        title="I Miei Corsi"
        action={<button>+ Aggiungi Corso</button>}
      >
        <Card variant="primary">
          <h3>Informatica</h3>
          <p>Prof. Rossi - Aula 12</p>
          <span>Lunedì, Mercoledì: 9:00-11:00</span>
        </Card>

        <Card variant="primary">
          <h3>Matematica</h3>
          <p>Prof. Bianchi - Aula 5</p>
          <span>Martedì, Giovedì: 10:00-12:00</span>
        </Card>
      </Section>

      <Section title="Voti Recenti">
        <Card variant="success">
          <strong>Informatica</strong>: 8/10
          <br />
          <small>Progetto React - 15 Gen 2024</small>
        </Card>

        <Card variant="danger">
          <strong>Matematica</strong>: 5/10
          <br />
          <small>Verifica Integrali - 18 Gen 2024</small>
        </Card>
      </Section>
    </Container>
  );
}
```

## ✏️ Esercizio

### Parte 1: Button Component con children
Crea `src/Button.tsx`:

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

function Button({ children, variant = "primary", size = "medium", onClick }: ButtonProps) {
  // TODO: Implementa il componente
  // - Usa className dinamica: `btn btn-${variant} btn-${size}`
  // - Renderizza {children} dentro il button
  // - Gestisci onClick
}
```

Uso:
```typescript
<Button variant="primary" size="large" onClick={() => alert("Cliccato!")}>
  Conferma
</Button>

<Button variant="danger" size="small">
  <span>🗑️</span> Elimina
</Button>
```

### Parte 2: Panel con Header/Body/Footer
Crea `src/Panel.tsx`:

```typescript
interface PanelProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "info" | "warning";
}

function Panel({ title, children, footer, variant = "default" }: PanelProps) {
  // TODO: Implementa
  // Struttura:
  // <div className="panel">
  //   <div className="panel-header">{title}</div>
  //   <div className="panel-body">{children}</div>
  //   {footer && <div className="panel-footer">{footer}</div>}
  // </div>
}
```

### Parte 3: Grid Layout
Crea `src/Grid.tsx` e `src/Col.tsx`:

```typescript
// Grid.tsx
interface GridProps {
  children: React.ReactNode;
  cols?: number;  // numero colonne
  gap?: string;   // spazio tra elementi
}

function Grid({ children, cols = 3, gap = "1rem" }: GridProps) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: gap
    }}>
      {children}
    </div>
  );
}

// Col.tsx
interface ColProps {
  children: React.ReactNode;
  span?: number;  // quante colonne occupa (1-12)
}

function Col({ children, span = 1 }: ColProps) {
  return (
    <div style={{ gridColumn: `span ${span}` }}>
      {children}
    </div>
  );
}
```

Uso:
```typescript
<Grid cols={3} gap="2rem">
  <Card>Colonna 1</Card>
  <Card>Colonna 2</Card>
  <Card>Colonna 3</Card>
</Grid>
```

### Parte 4: Alert Component
Crea `src/Alert.tsx`:

```typescript
interface AlertProps {
  children: React.ReactNode;
  type: "info" | "success" | "warning" | "error";
  onClose?: () => void;
}

function Alert({ children, type, onClose }: AlertProps) {
  // TODO: Implementa
  // - Mostra icona in base al type (ℹ️ ✅ ⚠️ ❌)
  // - Colore background diverso per ogni type
  // - Se onClose esiste, mostra bottone X per chiudere
  // - Renderizza {children} come messaggio
}
```

### Parte 5: Page Layout Completo
Crea un layout completo per una pagina:

```typescript
<PageLayout
  header={
    <header>
      <h1>My App</h1>
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
      </nav>
    </header>
  }
  sidebar={
    <aside>
      <h3>Menu</h3>
      <ul>
        <li>Dashboard</li>
        <li>Profilo</li>
        <li>Impostazioni</li>
      </ul>
    </aside>
  }
  footer={<p>© 2024 My App - All rights reserved</p>}
>
  {/* Main content */}
  <Section title="Benvenuto">
    <Card variant="info">
      <Alert type="info">
        Hai 3 nuove notifiche!
      </Alert>
    </Card>
  </Section>
</PageLayout>
```

## 🎯 Output Atteso

```
┌──────────────────────────────┐
│ My App      [Home] [About]   │
├───────┬──────────────────────┤
│ Menu  │  Benvenuto           │
│ • Das │  ┌─────────────────┐ │
│ • Pro │  │ ℹ️ Hai 3 nuove  │ │
│ • Imp │  │ notifiche!      │ │
│       │  └─────────────────┘ │
├───────┴──────────────────────┤
│ © 2024 My App                │
└──────────────────────────────┘
```

## 💡 Suggerimenti

- **children**: Sempre di tipo `React.ReactNode`
- **Composizione**: Combina componenti piccoli per creare UI complesse
- **Flessibilità**: children rende componenti riutilizzabili
- **Layout**: Container, Grid, Card = mattoni fondamentali
- **Pattern**: Container (smart) + Presentational (dumb)
- **Slot**: Passa multiple sezioni (header, sidebar, footer, children)

## 🚀 Sfida Extra

1. **Tabs Component**: Componente con tabs cliccabili e children per ogni tab
2. **Accordion**: Lista di pannelli espandibili/collassabili
3. **Breadcrumbs**: Navigazione gerarchica con children
4. **Tooltip**: Mostra tooltip al hover su children

## 📖 Concetti Chiave

- ✅ **Composizione** = combinare componenti semplici
- ✅ **children** = prop speciale per contenuto annidato
- ✅ **React.ReactNode** = tipo per children
- ✅ **Layout Components** = Container, Card, Grid, Panel
- ✅ **Slot Pattern** = passare multiple sezioni
- ✅ **Container/Presentational** = separare logica da UI
- ✅ **Riutilizzo** = componenti flessibili con children

## ➡️ Prossimo: ES50 - Styling in React
