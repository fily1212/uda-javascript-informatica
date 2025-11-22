# ES04 - Type Coercion e Conversioni

## 📘 Tipo: UDA - TLC

## 🎯 Obiettivi
- Comprendere type coercion implicita ed esplicita
- Convertire tra tipi primitivi
- Gestire conversioni numeriche
- Applicare conversioni alle unità digitali (TLC)
- Evitare errori comuni di conversione

## 🔗 Connessione Interdisciplinare
**Materia**: TLC (Telecomunicazioni)
**Argomento**: Conversione unità digitali (bit, byte, KB, MB, GB, TB)

## 📚 Teoria

### Type Coercion Implicita
```javascript
"5" + 3       // "53" (string)
"5" - 3       // 2 (number)
"5" * "2"     // 10 (number)
true + 1      // 2 (boolean → number)
false + 1     // 1
```

### Conversioni Esplicite

**A Number:**
```javascript
Number("123")     // 123
Number("12.5")    // 12.5
Number("abc")     // NaN
parseInt("123")   // 123
parseInt("12.9")  // 12 (tronca)
parseFloat("12.9") // 12.9
+"42"             // 42 (operatore unario)
```

**A String:**
```javascript
String(123)       // "123"
(123).toString()  // "123"
123 + ""          // "123"
```

**A Boolean:**
```javascript
Boolean(1)        // true
Boolean(0)        // false
Boolean("")       // false
Boolean("hello")  // true
!!value           // conversione doppio NOT
```

### Valori Falsy
Questi valori sono `false` quando convertiti a boolean:
- `false`
- `0`, `-0`
- `""` (stringa vuota)
- `null`
- `undefined`
- `NaN`

## ✏️ Esercizio

### Parte 1: Conversione Unità Digitali

Crea un convertitore che trasforma:

**Bit → Byte → KB → MB → GB**

Formule TLC:
- 1 Byte = 8 bit
- 1 KB = 1024 byte
- 1 MB = 1024 KB
- 1 GB = 1024 MB

```javascript
// Input: 10485760 bit
// Output: 1.25 MB
```

### Parte 2: Calcolo Velocità Trasmissione

Dato:
- File di 5 MB
- Velocità di 100 Mbps (megabit per secondo)

Calcola tempo di download in secondi.

### Parte 3: Conversioni Pratiche

1. Converti "1024" (string) in number
2. Converti 2048 (number) in string
3. Verifica se "0" è truthy o falsy
4. Converti null in number (cosa succede?)

### Parte 4: Storage Calculator

Crea una funzione che:
- Accetta dimensione file (numero + unità, es: "500 MB")
- Parse il valore e l'unità
- Converte tutto in byte
- Restituisce quanti file entrano in un disco da 1 TB

## 🎯 Output Atteso
```
=== Convertitore Unità Digitali ===
10485760 bit =
  1310720 byte =
  1280 KB =
  1.25 MB

=== Velocità Trasmissione ===
File: 5 MB
Velocità: 100 Mbps
Tempo download: 0.4 secondi

=== Storage Calculator ===
File da 500 MB
Disco da 1 TB
Numero file: 2048
```

## 💡 Suggerimenti
- Usa `Number()` per conversioni sicure
- `parseInt()` e `parseFloat()` per parsing stringhe
- Attento alla differenza bit/byte (8 bit = 1 byte)
- TLC usa potenze di 2: 1024, non 1000
- `isNaN()` per verificare se la conversione è fallita

## 🚀 Sfida Extra
1. Crea convertitore bidimensionale (anche GB → bit)
2. Implementa formattazione automatica (es: "1536 KB" → "1.5 MB")
3. Calcola tempo upload con velocità asimmetrica
4. Aggiungi unità: TB, PB (Petabyte)

## 📖 Approfondimenti TLC
- **Bit**: Unità base informazione (0 o 1)
- **Byte**: 8 bit, può rappresentare 256 valori
- **Prefissi binari**: Ki, Mi, Gi (base 1024) vs k, M, G (base 1000)
- **Velocità rete**: Misurata in bit/s (bps)
- **Storage**: Misurato in byte (B)

## 📚 Risorse
- [MDN: Type Conversion](https://developer.mozilla.org/en-US/docs/Glossary/Type_conversion)
- [MDN: Type Coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)

## ➡️ Prossimo: ES05 - Console e Debugging Base
