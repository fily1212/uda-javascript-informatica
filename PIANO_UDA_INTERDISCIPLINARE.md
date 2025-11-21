# Piano Unità Didattiche Interdisciplinari - Informatica

## Struttura del Corso

Il corso è diviso in 3 moduli progressivi con **approccio learning by doing** e **esercizi progettuali**. Non tutti gli esercizi sono interdisciplinari: il focus è su JavaScript, TypeScript e React con collegamenti mirati ad altre discipline.

**Totale: 70 esercizi**
- JavaScript: 30 esercizi (15 UDA + 15 puri + alcuni progettuali)
- TypeScript: 15 esercizi (8 UDA + 7 puri + alcuni progettuali)
- React: 25 esercizi (12 UDA + 8 puri + 5 PROGETTI COMPLETI)

**Materie collegate (35 esercizi interdisciplinari):**
- Fisica: 10 esercizi
- Italiano: 10 esercizi
- Storia: 5 esercizi
- TLC: 5 esercizi (circuiti, mezzi trasmissivi, sicurezza)
- Diritto: 5 esercizi (costituzione, leggi, regolamenti)

---

## MODULO 1: JAVASCRIPT (30 esercizi)

### Sezione 1.1: Fondamenti (5 esercizi)

**ES01 - Variabili e Tipi di Dati** [PURO]
- Concetto: `var`, `let`, `const`, tipi primitivi
- Esercizio: Dichiarare variabili di diversi tipi, operazioni base

**ES02 - Operatori e Espressioni** [PURO]
- Concetto: Operatori aritmetici, logici, di confronto
- Esercizio: Costruire espressioni complesse, precedenza operatori

**ES03 - Template Literals e Stringhe** [UDA - Italiano]
- Concetto: Template literals, interpolazione, metodi string
- Esercizio: Formattare citazioni letterarie, analisi lunghezza parole

**ES04 - Type Coercion e Conversioni** [UDA - TLC]
- Concetto: Conversioni implicite/esplicite, casting
- Esercizio: Convertitore unità digitali (bit → byte → KB → MB → GB)

**ES05 - Console e Debugging Base** [PURO]
- Concetto: console.log, console.table, debugging base
- Esercizio: Debug di codice con errori, uso console methods

### Sezione 1.2: Strutture di Controllo (5 esercizi)

**ES06 - If/Else e Condizionali** [UDA - Fisica]
- Concetto: if/else, condizioni annidate, confronti
- Esercizio: Classificatore tipo di moto (rettilineo, accelerato, circolare) in base a velocità/accelerazione

**ES07 - Switch/Case** [UDA - Storia]
- Concetto: Switch, case, break, default
- Esercizio: Identificare periodo storico e caratteristiche da anno inserito

**ES08 - Operatore Ternario e Short-Circuit** [PURO]
- Concetto: Ternario (? :), short-circuit (&&, ||)
- Esercizio: Validazione input, valori di default con operatori

**ES09 - Ciclo For** [UDA - TLC]
- Concetto: for loop, break, continue
- Esercizio: Analisi spettro frequenze radio, identificazione bande (AM, FM, VHF, UHF)

**ES10 - While e Do-While** [PURO]
- Concetto: while, do-while, loop infiniti
- Esercizio: Algoritmi di ricerca, validazione input utente con retry

### Sezione 1.3: Array e Metodi (6 esercizi)

**ES11 - Array Base e Metodi CRUD** [PURO]
- Concetto: Array, indicizzazione, push/pop/shift/unshift, length
- Esercizio: Gestione lista elementi, operazioni CRUD base

**ES12 - Iterazione Array** [UDA - Italiano]
- Concetto: for, for...of, forEach
- Esercizio: Analisi frequenza lettere in un testo, conteggio vocali/consonanti

**ES13 - Spread e Destructuring** [PURO]
- Concetto: Spread operator [...], array destructuring
- Esercizio: Clonazione, merge array, estrazione valori

**ES14 - Map, Filter, Find** [PURO]
- Concetto: map, filter, find, findIndex, some, every
- Esercizio: Trasformazione e filtraggio dati strutturati

**ES15 - Reduce e Metodi Avanzati** [UDA - Fisica]
- Concetto: reduce, reduceRight, flat, flatMap
- Esercizio: Calcolo somme vettoriali, media misurazioni fisiche

**ES16 - [PROGETTO] Sistema Gestione Biblioteca** [UDA - Italiano]
- Concetto: Combinazione tutti metodi array
- Progetto: Sistema CRUD per libri (ricerca, filtro per autore/genere, statistiche)

### Sezione 1.4: Funzioni (6 esercizi)

**ES17 - Function Declaration e Expression** [PURO]
- Concetto: function keyword, hoisting, differenze
- Esercizio: Creare funzioni riutilizzabili, scope globale/locale

**ES18 - Arrow Functions** [PURO]
- Concetto: Sintassi arrow (=>), this context, implicit return
- Esercizio: Refactoring da function a arrow, one-liner

**ES19 - Parametri e Rest/Spread** [UDA - Diritto]
- Concetto: Parametri default, rest parameters (...args)
- Esercizio: Calcolatore sanzioni con parametri opzionali (circostanze attenuanti/aggravanti)

**ES20 - Callback e Higher-Order Functions** [PURO]
- Concetto: Funzioni come parametri, HOF pattern
- Esercizio: Implementare custom map/filter, callback personalizzati

**ES21 - Closures e Scope** [PURO]
- Concetto: Scope chain, closures, IIFE, private variables
- Esercizio: Counter con stato privato, factory functions

**ES22 - [PROGETTO] Calcolatore Fisico Avanzato** [UDA - Fisica]
- Concetto: Applicazione completa di funzioni, closures, HOF
- Progetto: Calcolatrice fisica (cinematica, dinamica, energia) con storico e validazione

### Sezione 1.5: Oggetti (4 esercizi)

**ES23 - Oggetti Base e Metodi** [PURO]
- Concetto: Creazione oggetti (literal, constructor), proprietà, metodi, this
- Esercizio: Modellare entità complesse, object methods

**ES24 - Object Destructuring e Spread** [UDA - TLC]
- Concetto: Destructuring oggetti, spread {...}, shorthand syntax
- Esercizio: Configuratore parametri rete (IP, subnet, gateway, DNS) con merge/override

**ES25 - Object Methods Avanzati** [PURO]
- Concetto: Object.keys/values/entries, Object.assign, freeze/seal
- Esercizio: Manipolazione oggetti, immutabilità, utility functions

**ES26 - [PROGETTO] Database Eventi Storici** [UDA - Storia]
- Concetto: Combinazione oggetti, array, metodi
- Progetto: Sistema gestione timeline storica (CRUD eventi, filtri per periodo/tipo, export JSON)

### Sezione 1.6: Asincrono e API (4 esercizi)

**ES27 - Promises** [PURO]
- Concetto: Promise creation, then/catch/finally, chaining
- Esercizio: Simulare operazioni asincrone, gestione errori

**ES28 - Async/Await** [PURO]
- Concetto: async functions, await keyword, try/catch
- Esercizio: Refactoring promises to async/await, error handling

**ES29 - Fetch API** [UDA - Italiano]
- Concetto: fetch(), GET/POST requests, response handling, JSON
- Esercizio: App citazioni letterarie da API pubblica (es. Quotable API)

**ES30 - [PROGETTO FINALE] Ricerca Normative** [UDA - Diritto]
- Concetto: Fetch, async/await, error handling, UI interattiva
- Progetto: App ricerca articoli Costituzione/Codici con API, filtri, salvataggio preferiti

---

## MODULO 2: TYPESCRIPT (15 esercizi)

### Sezione 2.1: Fondamenti TypeScript (5 esercizi)

**ES31 - Setup TypeScript e Tipi Primitivi** [PURO]
- Concetto: tsconfig.json, tipi base (string, number, boolean, any, unknown, never)
- Esercizio: Configurare progetto TS, annotazioni di tipo base

**ES32 - Union, Intersection e Literal Types** [PURO]
- Concetto: Union (|), intersection (&), literal types, type narrowing
- Esercizio: Type guards, typeof, controllo flusso tipizzato

**ES33 - Array e Tuple** [UDA - Fisica]
- Concetto: Array tipizzati, tuple, readonly arrays
- Esercizio: Vettori fisici tipizzati, coordinate [x, y, z] con tuple

**ES34 - Type Aliases** [UDA - Italiano]
- Concetto: type keyword, aliases complessi, composition
- Esercizio: Modellare gerarchia opere letterarie (Libro, Poesia, Racconto)

**ES35 - Enums** [UDA - Storia]
- Concetto: Enum numerici e string, const enum
- Esercizio: Periodi storici, classificazione eventi con enum

### Sezione 2.2: Interfacce e Oggetti (5 esercizi)

**ES36 - Interfacce Base** [PURO]
- Concetto: interface, proprietà opzionali (?), readonly, extends
- Esercizio: Modellare entità con interfacce, ereditarietà

**ES37 - Interfaces vs Type** [UDA - TLC]
- Concetto: Differenze interface/type, quando usare uno o l'altro
- Esercizio: Modellare protocolli rete (TCP, UDP) e loro proprietà

**ES38 - Function Types** [PURO]
- Concetto: Tipizzazione funzioni, parametri opzionali, overloading
- Esercizio: Signature complesse, callback tipizzati

**ES39 - Index Signatures e Mapped Types** [PURO]
- Concetto: Index signatures [key: string], mapped types
- Esercizio: Dizionari dinamici tipizzati

**ES40 - [PROGETTO] Sistema Particelle Fisiche** [UDA - Fisica]
- Concetto: Interfacce complesse, ereditarietà, composizione
- Progetto: Modellare sistema particelle (Elettrone, Protone, Neutrone) con calcoli

### Sezione 2.3: Generics e Progetti (5 esercizi)

**ES41 - Generics Base** [PURO]
- Concetto: Funzioni generiche, <T>, constraints con extends
- Esercizio: Utility functions generiche (identity, getFirst, swap)

**ES42 - Generic Classes e Interfaces** [PURO]
- Concetto: Classi generiche, interfacce generiche
- Esercizio: Implementare Stack<T>, Queue<T> tipizzate

**ES43 - Utility Types** [UDA - Diritto]
- Concetto: Partial, Required, Pick, Omit, Record, Readonly
- Esercizio: Gestione documenti legali con utility types (bozze, definitivi, pubblici)

**ES44 - [PROGETTO] Analizzatore Testi Letterari** [UDA - Italiano]
- Concetto: Generics, utility types, interfacce complesse
- Progetto: Analyzer per testi (frequenza parole, sentiment, statistiche) completamente tipizzato

**ES45 - [PROGETTO FINALE TS] Simulatore Circuiti** [UDA - Fisica]
- Concetto: TypeScript avanzato completo, OOP
- Progetto: Simulatore circuiti elettrici (resistenze serie/parallelo, legge Ohm) con validazione tipi

---

## MODULO 3: REACT CON VITE (25 esercizi)

### Sezione 3.1: Setup e Componenti (5 esercizi)

**ES46 - Setup Vite + React + TypeScript** [PURO]
- Concetto: Vite setup, struttura progetto, TSX, componenti base
- Esercizio: Creare primo progetto React con Vite, componente Hello World

**ES47 - JSX e Rendering** [PURO]
- Concetto: JSX syntax, espressioni {}, rendering condizionale, liste
- Esercizio: Componenti con logica condizionale e rendering liste

**ES48 - Props e TypeScript** [UDA - Italiano]
- Concetto: Props, tipizzazione props, children
- Esercizio: Componente Card per citazioni letterarie con props tipizzate

**ES49 - Composition e Children** [PURO]
- Concetto: Composizione componenti, props.children, pattern container/presentational
- Esercizio: Layout components (Container, Card, Modal)

**ES50 - Styling in React** [PURO]
- Concetto: CSS modules, inline styles, conditional classNames
- Esercizio: Stilizzare componenti, temi e varianti

### Sezione 3.2: State e Interattività (5 esercizi)

**ES51 - useState Hook** [UDA - Fisica]
- Concetto: useState, state management, re-rendering
- Esercizio: Contatore particelle, incremento/decremento con visualizzazione

**ES52 - Eventi e Handlers** [PURO]
- Concetto: onClick, onChange, onSubmit, event handling
- Esercizio: Form interattivi, gestione eventi, validazione base

**ES53 - State con Oggetti e Array** [UDA - Storia]
- Concetto: Immutabilità, spread operator, gestione state complessi
- Esercizio: Lista timeline eventi storici (aggiungi, rimuovi, modifica)

**ES54 - Lifting State Up** [PURO]
- Concetto: Sollevare state, comunicazione tra componenti sibling
- Esercizio: Componenti che condividono e modificano state comune

**ES55 - Forms Controllati** [UDA - Diritto]
- Concetto: Controlled inputs, form state, validazione
- Esercizio: Form inserimento dati contratto con validazione campi obbligatori

### Sezione 3.3: Effects e Side Effects (3 esercizi)

**ES56 - useEffect Base** [UDA - Fisica]
- Concetto: useEffect, dependency array, lifecycle, cleanup
- Esercizio: Timer per simulazione moto, aggiornamenti posizione ogni tick

**ES57 - Data Fetching con useEffect** [UDA - Italiano]
- Concetto: Fetch in useEffect, loading/error states, abort controller
- Esercizio: Caricare citazioni letterarie da API, gestire stati

**ES58 - useEffect Cleanup e Ottimizzazione** [UDA - TLC]
- Concetto: Cleanup functions, memory leaks, dependencies
- Esercizio: Monitoraggio stato rete/connessione con cleanup corretto

### Sezione 3.4: Hooks Avanzati (4 esercizi)

**ES59 - useContext** [PURO]
- Concetto: Context API, createContext, Provider, useContext
- Esercizio: Theme context (dark/light mode), global state semplice

**ES60 - useReducer** [UDA - Storia]
- Concetto: useReducer, actions, reducer pattern, complex state
- Esercizio: Gestione complessa timeline eventi storici con azioni multiple

**ES61 - Custom Hooks** [UDA - Fisica]
- Concetto: Creare custom hooks, riutilizzo logica, composition
- Esercizio: usePhysicsCalculator hook per calcoli ripetuti

**ES62 - useMemo e useCallback** [PURO]
- Concetto: Performance optimization, memoization, re-rendering control
- Esercizio: Ottimizzare componenti pesanti, evitare render inutili

### Sezione 3.5: Routing (3 esercizi)

**ES63 - React Router Setup e Navigazione** [PURO]
- Concetto: React Router, BrowserRouter, Routes, Route, Link, NavLink
- Esercizio: App multi-pagina con navigazione, rotte base

**ES64 - Dynamic Routes e Params** [UDA - Italiano]
- Concetto: useParams, route parameters, nested routes
- Esercizio: App biblioteca (lista autori → dettaglio autore → lista opere)

**ES65 - Layout e Protected Routes** [PURO]
- Concetto: Layout routes, Outlet, route guards, redirect
- Esercizio: App con layout condiviso e sezioni protette

### Sezione 3.6: PROGETTI COMPLETI (5 esercizi)

**ES66 - [PROGETTO] Simulatore Moto Fisico Interattivo** [UDA - Fisica]
- Tecnologie: React + TS, useState, useEffect, custom hooks
- Progetto: Simulatore moto uniformemente accelerato con grafici, controlli, animazione real-time

**ES67 - [PROGETTO] Archivio Letterario con API** [UDA - Italiano]
- Tecnologie: React + TS, useEffect, fetch, Context API, Router
- Progetto: App completa per ricerca opere letterarie, preferiti, note personali, routing

**ES68 - [PROGETTO] Task Manager Avanzato** [PURO]
- Tecnologie: React + TS, Context + useReducer, localStorage, drag&drop
- Progetto: Gestione task complessa (categorie, priorità, scadenze, filtri, statistiche)

**ES69 - [PROGETTO] Consulente Normativo** [UDA - Diritto]
- Tecnologie: React + TS, Router, Forms avanzati, validazione Zod
- Progetto: App per consultare Costituzione/Codici, ricerca full-text, segnalibri, note

**ES70 - [PROGETTO FINALE] Dashboard Multi-Tool** [PURO]
- Tecnologie: React + TS completo, tutti gli hooks, routing, charts, testing
- Progetto: Dashboard con tools vari (calcolatrice scientifica, converter unità, timer pomodoro, note)

---

## Struttura Directory Proposta

```
uda-javascript-informatica/
├── README.md
├── PIANO_UDA_INTERDISCIPLINARE.md
├── modulo-1-javascript/
│   ├── README.md
│   ├── sezione-1.1-fondamenti/
│   │   ├── es01-variabili-tipi/
│   │   │   ├── README.md
│   │   │   ├── esercizio.js
│   │   │   └── soluzione.js
│   │   └── ...
│   ├── sezione-1.2-controllo/
│   ├── sezione-1.3-array/
│   ├── sezione-1.4-funzioni/
│   ├── sezione-1.5-oggetti/
│   └── sezione-1.6-asincrono/
├── modulo-2-typescript/
│   ├── README.md
│   ├── tsconfig.json
│   ├── package.json
│   ├── sezione-2.1-fondamenti/
│   ├── sezione-2.2-interfacce/
│   └── sezione-2.3-generics/
└── modulo-3-react/
    ├── README.md
    ├── sezione-3.1-setup/
    │   ├── es46-vite-setup/
    │   │   ├── README.md
    │   │   └── [progetto vite]
    ├── sezione-3.2-state/
    ├── sezione-3.3-effects/
    ├── sezione-3.4-hooks-avanzati/
    ├── sezione-3.5-routing/
    └── sezione-3.6-progetti/
        ├── es66-simulatore-fisica/
        ├── es67-archivio-letterario/
        ├── es68-task-manager/
        ├── es69-consulente-normativo/
        └── es70-dashboard-multitools/
```

---

## Statistiche Piano Revisionato

### Totali
- **Totale esercizi**: 70
  - JavaScript: 30 esercizi
  - TypeScript: 15 esercizi
  - React: 25 esercizi

### Distribuzione UDA vs Puri
- **JavaScript**: 14 UDA + 16 puri (4 progettuali)
- **TypeScript**: 8 UDA + 7 puri (3 progettuali)
- **React**: 13 UDA + 12 puri (5 progetti finali)
- **Totale UDA interdisciplinari**: 35/70 (50%)

### Distribuzione Materie (35 esercizi UDA)
- **Fisica**: 10 esercizi (circuiti, moto, grandezze fisiche)
  - JavaScript: 3 | TypeScript: 3 | React: 4
- **Italiano**: 10 esercizi (analisi testi, opere letterarie)
  - JavaScript: 4 | TypeScript: 2 | React: 4
- **Storia**: 5 esercizi (timeline, eventi, periodi)
  - JavaScript: 2 | TypeScript: 1 | React: 2
- **TLC**: 5 esercizi (reti, sicurezza, mezzi trasmissivi)
  - JavaScript: 3 | TypeScript: 1 | React: 1
- **Diritto**: 5 esercizi (costituzione, normative, contratti)
  - JavaScript: 2 | TypeScript: 1 | React: 2

### Esercizi Progettuali (12 totali)
- **JavaScript**: ES16, ES22, ES26, ES30 (4 progetti)
- **TypeScript**: ES40, ES44, ES45 (3 progetti)
- **React**: ES66, ES67, ES68, ES69, ES70 (5 progetti completi)

### Progressione Didattica
1. **JavaScript (30)**: Fondamenti → Controllo flusso → Array → Funzioni → Oggetti → Asincrono
2. **TypeScript (15)**: Tipi base → Interfacce → Generics → Progetti tipizzati
3. **React (25)**: Componenti → State → Effects → Hooks avanzati → Routing → Progetti completi

---

## Approccio Metodologico

### Learning by Doing
- Focus su esercizi pratici e progettuali
- Progressione incrementale della complessità
- Progetti finali che integrano tutte le competenze

### Struttura Esercizio Standard (README.md)

**Per esercizi PURI (solo informatica):**
1. **Obiettivi**: Concetti tecnici da apprendere
2. **Teoria**: Spiegazione sintassi e concetti
3. **Esempio Guidato**: Codice commentato step-by-step
4. **Esercizio**: Problema da risolvere autonomamente
5. **Soluzione**: File separato con soluzione commentata
6. **Sfida Extra**: Estensioni opzionali

**Per esercizi UDA (interdisciplinari):**
1. **Obiettivi Informatici**: Concetti tecnici
2. **Connessione Disciplinare**: Materia e argomento collegato
3. **Teoria Integrata**: Informatica + materia collegata
4. **Esempio Guidato**: Applicazione pratica
5. **Esercizio**: Problema interdisciplinare
6. **Soluzione**: Commentata con riferimenti a entrambe le discipline
7. **Approfondimenti**: Collegamenti e risorse

**Per esercizi PROGETTUALI:**
1. **Obiettivi del Progetto**: Scope e requisiti
2. **Tecnologie**: Stack utilizzato
3. **Architettura**: Struttura e organizzazione
4. **User Stories**: Funzionalità da implementare
5. **Guida Implementazione**: Step incrementali
6. **Testing**: Casi di test
7. **Estensioni**: Idee per miglioramenti
