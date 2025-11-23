# ES63 - Route Parameters

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Parametri dinamici nelle route
- useParams hook
- Route con ID

## 📚 Teoria - Route Parameters

### URL Dinamici

Invece di creare route separate per ogni prodotto:

```typescript
// ❌ Non scalabile!
<Route path="/product/1" element={<Product1 />} />
<Route path="/product/2" element={<Product2 />} />
<Route path="/product/3" element={<Product3 />} />
// ...1000 prodotti?! 😱
```

Usa **parametri dinamici**:

```typescript
// ✅ Una route per tutti i prodotti!
<Route path="/product/:id" element={<ProductPage />} />
```

### useParams Hook

```typescript
import { useParams } from 'react-router-dom'

function ProductPage() {
  const { id } = useParams();

  return <h1>Product ID: {id}</h1>;
}
```

**URL: `/product/42`** → `id = "42"`

## 💡 Esempio Completo

```typescript
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 899 },
  { id: 2, name: "Phone", price: 599 },
  { id: 3, name: "Tablet", price: 399 }
];

function ProductList() {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: €{product.price}</p>
      <Link to="/products">← Back</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 📖 Concetti Chiave

- ✅ **:id** = parametro dinamico
- ✅ **useParams()** = leggi parametri
- ✅ **Multiple params** = `/user/:userId/post/:postId`

## ➡️ Prossimo: ES64 - Navigation and Links
