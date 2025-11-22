# ES50 - Styling in React

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire i diversi modi di stilizzare in React
- Usare CSS Modules per stili scoped
- Applicare inline styles dinamici
- Gestire className condizionali
- Best practices per stili in React

## 📚 Teoria - Come Stilizzare i Componenti React

In React ci sono **diversi modi** per applicare stili CSS. Vediamoli tutti!

### 1. CSS Globale (Classico)

Il metodo più semplice: file CSS normale importato nel componente.

**App.css:**
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.title {
  font-size: 2rem;
  color: #333;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

**App.tsx:**
```typescript
import './App.css'

function App() {
  return (
    <div className="container">
      <h1 className="title">Hello React!</h1>
      <button className="btn-primary">Click me</button>
    </div>
  );
}
```

**⚠️ Problema:** Gli stili sono **globali**. Se hai `.title` in più componenti, si sovrascrivono!

### 2. CSS Modules (Consigliato ✅)

**CSS Modules** = file CSS con stili **scoped** (limitati al componente).

Il nome del file deve terminare con `.module.css`.

**Card.module.css:**
```css
.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.description {
  color: #666;
  line-height: 1.6;
}
```

**Card.tsx:**
```typescript
import styles from './Card.module.css'

function Card() {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Titolo Card</h2>
      <p className={styles.description}>Descrizione della card</p>
    </div>
  );
}
```

**Come funziona:**
- Vite trasforma `.card` in `.Card_card__abc123` (nome univoco)
- Gli stili NON interferiscono con altri componenti
- ✅ **Isolation** totale degli stili!

**Vantaggi CSS Modules:**
- ✅ Stili scoped (non globali)
- ✅ Nessun conflitto di naming
- ✅ Autocompletamento in VS Code
- ✅ TypeScript-friendly

### 3. Inline Styles (Stili Dinamici)

Gli inline styles sono oggetti JavaScript passati alla prop `style`.

```typescript
function Button() {
  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  return <button style={buttonStyle}>Click me</button>;
}
```

**⚠️ Nota:** Le proprietà CSS usano **camelCase**:
- `background-color` → `backgroundColor`
- `font-size` → `fontSize`
- `margin-top` → `marginTop`

#### Inline Styles Dinamici

Perfetti per stili che cambiano in base a variabili/props:

```typescript
interface BoxProps {
  width: number;
  height: number;
  color: string;
}

function Box({ width, height, color }: BoxProps) {
  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: color,
      borderRadius: '8px'
    }}>
      Box colorato
    </div>
  );
}

// Uso
<Box width={200} height={100} color="#ff6b6b" />
<Box width={300} height={150} color="#4ecdc4" />
```

**Quando usare inline styles:**
- ✅ Valori dinamici (calcolati da props/state)
- ✅ Stili che cambiano spesso
- ❌ NON per layout complessi (meglio CSS)

### 4. ClassName Condizionali

Applicare classi CSS **in base a condizioni**:

#### Metodo 1: Template Literals

```typescript
function Button({ isPrimary, isLarge }: { isPrimary: boolean, isLarge: boolean }) {
  return (
    <button className={`btn ${isPrimary ? 'btn-primary' : 'btn-secondary'} ${isLarge ? 'btn-large' : ''}`}>
      Click me
    </button>
  );
}
```

#### Metodo 2: Array + filter + join

```typescript
function Card({ isActive, hasError }: { isActive: boolean, hasError: boolean }) {
  const classes = [
    'card',
    isActive && 'card-active',
    hasError && 'card-error'
  ].filter(Boolean).join(' ');

  return <div className={classes}>Card content</div>;
}
```

#### Metodo 3: CSS Modules + Condizionali

```typescript
import styles from './Alert.module.css'

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

function Alert({ type, message }: AlertProps) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {message}
    </div>
  );
}
```

**Alert.module.css:**
```css
.alert {
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

.info { background-color: #d1ecf1; color: #0c5460; }
.success { background-color: #d4edda; color: #155724; }
.warning { background-color: #fff3cd; color: #856404; }
.error { background-color: #f8d7da; color: #721c24; }
```

### 5. Combinare Inline + CSS Modules

Puoi usare **entrambi** contemporaneamente:

```typescript
import styles from './Box.module.css'

interface BoxProps {
  children: React.ReactNode;
  color: string;  // dinamico
  padding?: number;  // dinamico
}

function Box({ children, color, padding = 16 }: BoxProps) {
  return (
    <div
      className={styles.box}  // CSS Module
      style={{  // Inline style per valori dinamici
        backgroundColor: color,
        padding: `${padding}px`
      }}
    >
      {children}
    </div>
  );
}
```

## 💡 Esempio Guidato Completo - Sistema Bottoni

Creiamo un sistema di bottoni completo con varianti, dimensioni e stati!

### 1. CSS Module

**Button.module.css:**
```css
/* Base button */
.button {
  font-family: inherit;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.button:active {
  transform: translateY(0);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

/* Variants */
.primary {
  background-color: #007bff;
  color: white;
}

.primary:hover {
  background-color: #0056b3;
}

.secondary {
  background-color: #6c757d;
  color: white;
}

.danger {
  background-color: #dc3545;
  color: white;
}

.success {
  background-color: #28a745;
  color: white;
}

/* Sizes */
.small {
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
}

.medium {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
}

.large {
  padding: 0.8rem 1.6rem;
  font-size: 1.125rem;
}

/* Loading state */
.loading {
  position: relative;
  color: transparent;
}

.loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 50%;
  left: 50%;
  margin-left: -8px;
  margin-top: -8px;
  border: 2px solid white;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spinner 0.6s linear infinite;
}

@keyframes spinner {
  to { transform: rotate(360deg); }
}
```

### 2. Componente TypeScript

**Button.tsx:**
```typescript
import { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
}

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  icon
}: ButtonProps) {
  // Combina tutte le classi
  const className = [
    styles.button,
    styles[variant],
    styles[size],
    loading && styles.loading
  ].filter(Boolean).join(' ');

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
```

### 3. Uso del Componente

```typescript
import Button from './Button'

function App() {
  return (
    <div>
      {/* Varianti */}
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="success">Success</Button>

      {/* Dimensioni */}
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>

      {/* Con icona */}
      <Button icon="✓">Salva</Button>
      <Button icon="🗑️" variant="danger">Elimina</Button>

      {/* Stati */}
      <Button disabled>Disabled</Button>
      <Button loading>Loading...</Button>

      {/* Con onClick */}
      <Button onClick={() => alert("Cliccato!")}>
        Click me
      </Button>
    </div>
  );
}
```

## ✏️ Esercizio

### Parte 1: Badge Component
Crea `src/Badge.tsx` e `src/Badge.module.css`:

```typescript
// Badge.tsx
import styles from './Badge.module.css'

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
}

function Badge({ children, variant = 'info', size = 'medium' }: BadgeProps) {
  // TODO: Implementa
  // - Combina styles.badge + styles[variant] + styles[size]
  // - Renderizza children
}
```

```css
/* Badge.module.css */
.badge {
  display: inline-block;
  border-radius: 12px;
  font-weight: 600;
}

.small {
  padding: 0.2rem 0.6rem;
  font-size: 0.75rem;
}

.medium {
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
}

.info { background-color: #cfe2ff; color: #084298; }
.success { background-color: #d1e7dd; color: #0f5132; }
.warning { background-color: #fff3cd; color: #664d03; }
.error { background-color: #f8d7da; color: #842029; }
```

### Parte 2: Card con Stili Dinamici
Crea `src/Card.tsx`:

```typescript
import styles from './Card.module.css'

interface CardProps {
  children: React.ReactNode;
  backgroundColor?: string;  // colore dinamico
  borderColor?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

function Card({
  children,
  backgroundColor = 'white',
  borderColor,
  hoverable = false,
  onClick
}: CardProps) {
  const className = `${styles.card} ${hoverable ? styles.hoverable : ''}`;

  return (
    <div
      className={className}
      style={{
        backgroundColor,
        borderLeft: borderColor ? `4px solid ${borderColor}` : undefined
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
```

Uso:
```typescript
<Card backgroundColor="#f0f8ff" borderColor="#007bff">
  Card blu
</Card>

<Card hoverable onClick={() => alert("Clicked!")}>
  Card cliccabile
</Card>
```

### Parte 3: Progress Bar
Crea una barra di progresso con inline styles dinamici:

```typescript
interface ProgressBarProps {
  value: number;  // 0-100
  color?: string;
  height?: number;
  showLabel?: boolean;
}

function ProgressBar({
  value,
  color = '#007bff',
  height = 20,
  showLabel = true
}: ProgressBarProps) {
  // TODO: Implementa
  // - Container con background grigio
  // - Barra interna con width: `${value}%`
  // - Colore e altezza dinamici
  // - Label opzionale con percentuale
}
```

### Parte 4: Alert Component Completo
Crea un sistema di alert con icone, colori e chiusura:

```typescript
import styles from './Alert.module.css'

interface AlertProps {
  children: React.ReactNode;
  type: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  icon?: boolean;  // mostra icona automatica
}

const icons = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌'
};

function Alert({ children, type, onClose, icon = true }: AlertProps) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {icon && <span className={styles.icon}>{icons[type]}</span>}
      <div className={styles.message}>{children}</div>
      {onClose && (
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}
```

### Parte 5: Avatar Component
Crea componente avatar con dimensioni dinamiche:

```typescript
interface AvatarProps {
  src?: string;  // URL immagine
  name: string;  // Fallback per iniziali
  size?: number;  // dimensione in px
  color?: string;  // colore background
}

function Avatar({ src, name, size = 40, color = '#007bff' }: AvatarProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover'
        }}
      />
    );
  }

  // Fallback: iniziali
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: color,
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.4,
      fontWeight: 'bold'
    }}>
      {initials}
    </div>
  );
}

// Uso
<Avatar name="Mario Rossi" />
<Avatar name="Mario Rossi" size={60} color="#28a745" />
<Avatar src="https://example.com/mario.jpg" name="Mario Rossi" size={80} />
```

## 🎯 Output Atteso

```
[Primary] [Secondary] [Danger] [Success]

[Small] [Medium] [Large]

┌─────────────────┐
│ Card blu        │
│ con bordo       │
└─────────────────┘

Progress: ████████░░░░░░░░░░░░ 40%

ℹ️ Questo è un messaggio informativo [×]
✅ Operazione completata con successo [×]
⚠️ Attenzione: controlla i dati [×]
❌ Errore: operazione fallita [×]
```

## 💡 Suggerimenti

- **CSS Modules**: Usa `.module.css` per stili scoped
- **Inline styles**: Solo per valori dinamici
- **className**: Usa template literals per combinare classi
- **CamelCase**: `backgroundColor`, non `background-color`
- **Filter Boolean**: `.filter(Boolean)` rimuove valori falsy
- **TypeScript**: Tipizza props per colori, dimensioni, varianti

## 🚀 Sfida Extra

1. **Theme System**: Crea sistema di temi (light/dark) con CSS variables
2. **Skeleton Loading**: Componente per loading state con animazione
3. **Toast Notifications**: Notifiche che appaiono e scompaiono
4. **Gradient Backgrounds**: Componenti con gradienti dinamici

## 📖 Concetti Chiave

- ✅ **CSS Modules** = stili scoped (.module.css)
- ✅ **Inline styles** = oggetto JavaScript per stili dinamici
- ✅ **className condizionali** = applicare classi in base a condizioni
- ✅ **CamelCase** = proprietà CSS in JavaScript
- ✅ **Combinazione** = CSS Modules + inline styles insieme
- ✅ **Dynamic values** = props → stili
- ✅ **Variants** = diverse varianti di stile per componente

## 📚 Best Practices

1. **Usa CSS Modules** per la maggior parte degli stili
2. **Inline styles** solo per valori veramente dinamici
3. **Evita inline** per layout complessi
4. **Naming consistente**: button, button-primary, button-large
5. **Combina classi** con template literals o array
6. **TypeScript**: tipizza varianti come union types

## ➡️ Prossimo: ES51 - useState Hook
