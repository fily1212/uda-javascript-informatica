# ES23 - Oggetti Base e Metodi

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Creare oggetti (literal, constructor)
- Aggiungere proprietà e metodi
- Comprendere `this`
- Usare metodi oggetto

## 📚 Teoria
```javascript
// Object literal
const persona = {
  nome: "Mario",
  età: 30,
  saluta() {
    return `Ciao, sono ${this.nome}`;
  }
};

// Constructor function
function Auto(marca, modello) {
  this.marca = marca;
  this.modello = modello;
  this.descrivi = function() {
    return `${this.marca} ${this.modello}`;
  };
}

const miaAuto = new Auto("Fiat", "500");
```

## ✏️ Esercizio
1. Crea oggetto `studente` con proprietà e metodi
2. Constructor `Prodotto` con calcolo prezzo IVA
3. Oggetto `calcolatrice` con operazioni base
4. Metodo che accede ad altre proprietà con `this`

## 💡 Suggerimenti
- `this` riferisce all'oggetto
- Metodi shorthand: `metodo() {}`
- Proprietà dinamiche: `obj[key]`

## ➡️ Prossimo: ES24 - Object Destructuring
