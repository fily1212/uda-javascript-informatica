# ES28 - Async/Await

## 📘 Tipo: PURO

## 🎯 Obiettivi
- Usare async/await
- Convertire promises in async
- Error handling con try/catch
- Operazioni sequenziali e parallele

## 📚 Teoria
```javascript
// Async function
async function caricaDati() {
  try {
    const response = await fetch('url');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Parallelo con Promise.all
async function caricaTutti() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  return {user, posts, comments};
}
```

## ✏️ Esercizio
1. Converti promises in async/await
2. Sequenza di operazioni async
3. Parallelo con Promise.all
4. Error handling con try/catch
5. Refactoring codice esistente

```javascript
async function processUser(id) {
  try {
    const user = await getUser(id);
    const posts = await getPosts(user.id);
    const processed = await processPosts(posts);
    return processed;
  } catch (err) {
    console.error("Errore:", err);
    throw err;
  }
}
```

## 💡 Suggerimenti
- async sempre return Promise
- await pausa esecuzione
- try/catch per errori
- Parallelo quando possibile

## ➡️ Prossimo: ES29 - Fetch API
