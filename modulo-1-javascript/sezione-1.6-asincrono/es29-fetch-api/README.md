# ES29 - Fetch API

## 📘 Tipo: UDA - Italiano

## 🎯 Obiettivi
- Usare Fetch API
- GET/POST requests
- Gestire response/errors
- Applicare a API letterarie

## 🔗 Connessione: Italiano - Citazioni Letterarie
Caricare citazioni da API pubbliche (Quotable, Wikiquote)

## 📚 Teoria
```javascript
// GET request
fetch('https://api.quotable.io/random')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Con async/await
async function getQuote() {
  try {
    const res = await fetch('url');
    if (!res.ok) throw new Error('HTTP error');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// POST request
fetch('url', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({data: 'value'})
});
```

## ✏️ Esercizio
App citazioni letterarie:
1. Fetch citazione random
2. Ricerca citazioni per autore
3. Salva preferiti localmente
4. Loading/error states
5. Refresh automatico

API suggerite:
- Quotable API: https://api.quotable.io
- Open Library: https://openlibrary.org/dev/docs/api

```javascript
async function getCitazioneRandom() {
  const loading = true;
  try {
    const res = await fetch('https://api.quotable.io/random');
    const quote = await res.json();
    return {content: quote.content, author: quote.author};
  } catch (err) {
    return {error: 'Errore caricamento'};
  } finally {
    loading = false;
  }
}
```

## 💡 Suggerimenti
- Controlla res.ok prima di .json()
- Headers per autenticazione
- CORS policy
- AbortController per timeout

## ➡️ Prossimo: ES30 - Progetto Ricerca Normative
