# ES02 - Operatori e Espressioni

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Comprendere gli operatori aritmetici (+, -, *, /, %, **)
- Utilizzare operatori di confronto (==, ===, !=, !==, <, >, <=, >=)
- Padroneggiare operatori logici (&&, ||, !)
- Capire la precedenza degli operatori
- Costruire espressioni complesse

## 📚 Teoria

### Operatori Aritmetici
```javascript
let somma = 5 + 3;        // 8
let diff = 10 - 4;        // 6
let prod = 3 * 4;         // 12
let div = 15 / 3;         // 5
let resto = 10 % 3;       // 1 (modulo)
let potenza = 2 ** 3;     // 8 (esponente)
```

### Operatori di Confronto
```javascript
5 == "5"    // true (confronto valore)
5 === "5"   // false (confronto valore E tipo)
5 != "5"    // false
5 !== "5"   // true
5 > 3       // true
5 <= 5      // true
```

**Regola**: Usa sempre `===` e `!==` per evitare coercizioni inattese!

### Operatori Logici
```javascript
true && true    // true (AND)
true && false   // false
true || false   // true (OR)
false || false  // false
!true           // false (NOT)
```

### Precedenza Operatori
1. Parentesi `()`
2. Esponente `**`
3. Moltiplicazione/Divisione `* / %`
4. Somma/Sottrazione `+ -`
5. Confronto `< > <= >=`
6. Uguaglianza `== === != !==`
7. AND logico `&&`
8. OR logico `||`

## ✏️ Esercizio

Crea `esercizio.js` e completa:

### Parte 1: Aritmetica
1. Calcola l'area di un rettangolo (base 15, altezza 8)
2. Calcola il resto della divisione di 23 per 5
3. Calcola 2 elevato alla 10

### Parte 2: Confronti
1. Confronta 10 con "10" usando == e ===
2. Verifica se 15 è maggiore di 10 E minore di 20
3. Verifica se una variabile è diversa da null

### Parte 3: Espressioni Logiche
1. Verifica: età >= 18 AND patente === true
2. Verifica: giorno === "sabato" OR giorno === "domenica"
3. Inverti un valore booleano con !

### Parte 4: Espressioni Complesse
Dato: `let x = 5, y = 10, z = 15`
Calcola: `(x + y) * z / 3 - 10`

## 🎯 Output Atteso
```
Area rettangolo: 120
Resto: 3
Potenza: 1024
10 == "10": true
10 === "10": false
15 è tra 10 e 20: true
Maggiorenne con patente: true
Weekend: false
Risultato complesso: 65
```

## 💡 Suggerimenti
- Usa parentesi per chiarire l'ordine delle operazioni
- `==` fa type coercion, `===` no (preferisci `===`)
- `&&` ha precedenza su `||`
- Il modulo `%` è utile per verificare parità: `n % 2 === 0`

## 🚀 Sfida Extra
1. Crea un'espressione che verifica se un anno è bisestile
2. Implementa la formula per convertire Celsius in Fahrenheit
3. Calcola il numero di secondi in un giorno usando solo operatori

## 📖 Approfondimenti
- [MDN: Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [JavaScript.info: Operators](https://javascript.info/operators)

## ➡️ Prossimo: ES03 - Template Literals e Stringhe
