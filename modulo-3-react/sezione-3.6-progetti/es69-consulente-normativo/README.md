# ES69 - [PROGETTO] Consulente Normativo

## 📘 Tipo: PROGETTO UDA - Diritto

## 🎯 Obiettivi
- App ricerca normative
- Forms avanzati con validazione
- Routing complesso
- Segnalibri e note

## 🔗 Connessione: Diritto - Consultazione Leggi

## 📚 Features
- Database Costituzione/Codici locale
- Ricerca full-text
- Navigazione per articolo
- Segnalibri personalizzati
- Note private su articoli
- Export risultati

## 🏗️ Componenti
```typescript
<App>
  <Router>
    <Route path="/" element={<Home />} />
    <Route path="/costituzione" element={<Costituzione />} />
    <Route path="/articolo/:id" element={<DettaglioArticolo />} />
    <Route path="/preferiti" element={<Preferiti />} />
  </Router>
</App>
```

## 💡 Suggerimenti
- React Router v6
- Zod per validazione forms
- Context per segnalibri globali

## ➡️ Prossimo: ES70 - Pomodoro Suite (FINALE)
