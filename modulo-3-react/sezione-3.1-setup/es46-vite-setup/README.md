# ES46 - Setup Vite + React + TypeScript

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Configurare Vite per React
- Setup TypeScript in React
- Comprendere struttura progetto
- Primo componente React

## 📚 Teoria
```bash
# Setup
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

**Struttura:**
```
src/
  ├── App.tsx          # Componente principale
  ├── main.tsx         # Entry point
  ├── index.css        # Stili globali
  └── vite-env.d.ts    # Type definitions
```

**Primo Componente:**
```typescript
function App() {
  return (
    <div>
      <h1>Hello React!</h1>
    </div>
  );
}

export default App;
```

## ✏️ Esercizio
1. Crea progetto Vite + React + TS
2. Modifica App.tsx con contenuto personalizzato
3. Crea componente HelloWorld separato
4. Import e usa componente in App
5. Aggiungi stili CSS

## 💡 Suggerimenti
- Vite è veloce grazie a ESbuild
- HMR (Hot Module Replacement) automatico
- File .tsx per componenti React
- Export default per componenti

## ➡️ Prossimo: ES47 - JSX e Rendering
