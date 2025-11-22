# ES24 - Object Destructuring e Spread

## 📘 Tipo: UDA - TLC

## 🎯 Obiettivi
- Destrutturare oggetti
- Usare spread {...}
- Applicare a configurazioni rete

## 🔗 Connessione: TLC - Configurazioni Rete
Gestire configurazioni IP, subnet, gateway con merge/override

## 📚 Teoria
```javascript
// Destructuring
const {nome, età} = {nome: "Mario", età: 30};

// Con rinomina
const {nome: n} = {nome: "Mario"};

// Spread - merge oggetti
const base = {ip: "192.168.1.1", subnet: "255.255.255.0"};
const custom = {gateway: "192.168.1.254"};
const config = {...base, ...custom};

// Clone
const clone = {...base};
```

## ✏️ Esercizio
Configuratore parametri rete:
```javascript
const configDefault = {
  ip: "192.168.1.100",
  subnet: "255.255.255.0",
  gateway: "192.168.1.1",
  dns: ["8.8.8.8", "8.8.4.4"]
};

function applicaConfig(defaults, custom) {
  return {...defaults, ...custom};
}
```

1. Merge configurazioni
2. Override parametri specifici
3. Estrai solo IP e gateway
4. Clona senza reference

## 💡 Suggerimenti
- Destructuring per estrarre valori
- Spread per merge non-mutante
- Ultimo valore vince in merge

## ➡️ Prossimo: ES25 - Object Methods
