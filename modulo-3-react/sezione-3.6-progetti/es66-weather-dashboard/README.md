# ES66 - [PROGETTO] Weather Dashboard

## 📘 Tipo: PROGETTO PURO

## 🎯 Obiettivi Progetto
- App meteo completa con React + TS
- Integration con OpenWeatherMap API
- State management, hooks, effects
- Charts e visualizzazioni dati

## 📚 Tecnologie
- React 18 + TypeScript
- Vite
- OpenWeatherMap API
- Recharts/Chart.js (grafici)
- Geolocation API

## 🏗️ Funzionalità

**Core:**
- Meteo corrente per città
- Previsioni 5 giorni
- Geolocalizzazione automatica
- Ricerca città manuale

**Visualizzazioni:**
- Temperatura, umidità, vento
- Grafici temperatura 5 giorni
- Icone condizioni meteo
- Sunrise/sunset times

**Features Extra:**
- Città preferite (localStorage)
- Unità °C / °F
- Dark/Light mode
- Refresh automatico

## 🎨 Componenti

```typescript
// Struttura
<WeatherApp>
  <SearchBar onSearch={handleSearch} />
  <CurrentWeather data={current} />
  <Forecast days={forecast} />
  <Chart data={chartData} />
  <Favorites cities={favorites} />
</WeatherApp>
```

## 📝 Implementazione

### Step 1: Setup API
```typescript
const API_KEY = 'your_key';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function fetchWeather(city: string) {
  const res = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
  return res.json();
}
```

### Step 2: State Management
```typescript
interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  // ...
}

const [weather, setWeather] = useState<WeatherData | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Step 3: Geolocation
```typescript
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude)
    );
  }
}, []);
```

### Step 4: Charts
Usa Recharts per grafici temperatura

### Step 5: Favorites
localStorage per salvare città preferite

## 🧪 Test Funzionalità
- [ ] Ricerca città funziona
- [ ] Geolocalizzazione automatica
- [ ] Previsioni 5 giorni visibili
- [ ] Grafici renderizzano correttamente
- [ ] Preferiti persistono
- [ ] Loading/Error states

## 💡 Suggerimenti
- API gratuita: https://openweathermap.org/api
- 60 calls/min con free tier
- Debounce search input
- Cache risultati
- Icons da API: https://openweathermap.org/img/wn/${icon}@2x.png

## 🚀 Estensioni
1. Mappa interattiva
2. Alert meteo
3. Comparazione città
4. Storico meteo

## ➡️ Prossimo: ES67 - Archivio Letterario
