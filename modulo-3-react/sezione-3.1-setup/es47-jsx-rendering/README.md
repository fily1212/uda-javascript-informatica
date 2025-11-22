# ES47 - JSX e Rendering

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Sintassi JSX
- Espressioni in JSX {}
- Rendering condizionale
- Liste con map()

## 📚 Teoria
```typescript
function Component() {
  const name = "Mario";
  const isLoggedIn = true;
  const items = ["a", "b", "c"];
  
  return (
    <div>
      {/* Espressioni */}
      <h1>Hello {name}!</h1>
      <p>{2 + 2}</p>
      
      {/* Condizionale */}
      {isLoggedIn ? <p>Benvenuto</p> : <p>Login</p>}
      {isLoggedIn && <button>Logout</button>}
      
      {/* Liste */}
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

## ✏️ Esercizio
1. Componente con variabili interpolate
2. Rendering condizionale (if ternario, &&)
3. Lista prodotti con map()
4. Nested components
5. Fragments (<></>)

## 💡 Suggerimenti
- {} per espressioni JavaScript
- key necessaria per liste
- className (non class)
- CamelCase per attributi HTML

## ➡️ Prossimo: ES48 - Props e TypeScript
