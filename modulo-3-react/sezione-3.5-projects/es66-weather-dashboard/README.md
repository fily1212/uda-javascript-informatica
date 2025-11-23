# ES66 - Weather Dashboard (Progetto)

## 📘 Tipo: UDA - TLC + Informatica

## 🎯 Obiettivi Progetto
- Integrare API esterna (Weather API)
- State management complesso
- useEffect per API calls
- Gestire loading e errori
- **Applicazione TLC**: Protocolli HTTP, API REST

## 📋 Descrizione Progetto

Crea un'app meteo completa che:
- Mostra meteo attuale di una città
- Cerca città per nome
- Mostra previsioni 5 giorni
- Salva città preferite
- Gestisce loading ed errori

## 🔑 API: OpenWeatherMap

### Setup

1. Registrati su [OpenWeatherMap](https://openweathermap.org/api)
2. Ottieni API Key gratuita
3. Endpoint:
   - Current: `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=it`
   - Forecast: `https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={API_KEY}&units=metric&lang=it`

## 💡 Esempio Completo

```typescript
import { useState, useEffect } from 'react'
import './WeatherApp.css'

// Types
interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

interface ForecastDay {
  dt: number;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

const API_KEY = 'YOUR_API_KEY_HERE'; // ⚠️ Sostituisci con la tua!

function WeatherApp() {
  const [city, setCity] = useState('Roma');
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('weatherFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch weather when city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  async function fetchWeather(cityName: string) {
    setLoading(true);
    setError(null);

    try {
      // Current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=it`
      );

      if (!weatherRes.ok) {
        throw new Error('Città non trovata');
      }

      const weatherData = await weatherRes.json();
      setWeather(weatherData);

      // Forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric&lang=it`
      );

      const forecastData = await forecastRes.json();

      // Prendi una previsione al giorno (ogni 24h = 8 intervalli da 3h)
      const dailyForecast = forecastData.list.filter((_: any, index: number) =>
        index % 8 === 0
      ).slice(0, 5);

      setForecast(dailyForecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore di rete');
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      setSearchInput('');
    }
  }

  function addToFavorites() {
    if (weather && !favorites.includes(weather.name)) {
      setFavorites([...favorites, weather.name]);
    }
  }

  function removeFromFavorites(cityName: string) {
    setFavorites(favorites.filter(c => c !== cityName));
  }

  function getWeatherIcon(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  return (
    <div className="weather-app">
      <header>
        <h1>🌤️ Weather Dashboard</h1>
      </header>

      {/* Search */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Cerca città..."
        />
        <button type="submit">🔍 Cerca</button>
      </form>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="favorites">
          <h3>⭐ Città Preferite</h3>
          <div className="favorite-tags">
            {favorites.map(fav => (
              <span key={fav} className="favorite-tag">
                <button onClick={() => setCity(fav)}>{fav}</button>
                <button onClick={() => removeFromFavorites(fav)}>×</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="loading">
          <p>Caricamento...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="error">
          <p>❌ {error}</p>
        </div>
      )}

      {/* Current Weather */}
      {weather && !loading && (
        <div className="current-weather">
          <div className="city-header">
            <h2>{weather.name}</h2>
            <button onClick={addToFavorites}>⭐ Aggiungi ai preferiti</button>
          </div>

          <div className="weather-main">
            <img
              src={getWeatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
            />
            <div className="temperature">
              <span className="temp">{Math.round(weather.main.temp)}°C</span>
              <span className="description">{weather.weather[0].description}</span>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail">
              <span className="label">Percepita:</span>
              <span className="value">{Math.round(weather.main.feels_like)}°C</span>
            </div>
            <div className="detail">
              <span className="label">Umidità:</span>
              <span className="value">{weather.main.humidity}%</span>
            </div>
            <div className="detail">
              <span className="label">Vento:</span>
              <span className="value">{weather.wind.speed} m/s</span>
            </div>
            <div className="detail">
              <span className="label">Pressione:</span>
              <span className="value">{weather.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      )}

      {/* Forecast */}
      {forecast.length > 0 && !loading && (
        <div className="forecast">
          <h3>📅 Previsioni 5 Giorni</h3>
          <div className="forecast-grid">
            {forecast.map((day, index) => (
              <div key={day.dt} className="forecast-card">
                <p className="day">
                  {index === 0 ? 'Oggi' : new Date(day.dt * 1000).toLocaleDateString('it-IT', { weekday: 'short' })}
                </p>
                <img
                  src={getWeatherIcon(day.weather[0].icon)}
                  alt={day.weather[0].description}
                />
                <p className="temp">{Math.round(day.main.temp)}°C</p>
                <p className="desc">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TLC Info */}
      <div className="tlc-info">
        <h4>📡 Concetti TLC</h4>
        <ul>
          <li><strong>API REST:</strong> Comunicazione client-server via HTTP</li>
          <li><strong>JSON:</strong> Formato dati strutturati</li>
          <li><strong>GET Request:</strong> Richiesta dati al server</li>
          <li><strong>Status Codes:</strong> 200 OK, 404 Not Found, 500 Error</li>
          <li><strong>Query Parameters:</strong> ?q=city&appid=key</li>
        </ul>
      </div>
    </div>
  );
}

export default WeatherApp;
```

## 🎨 CSS Suggerito

```css
.weather-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.search-form {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.search-form input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.current-weather {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin: 2rem 0;
}

.weather-main {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.temperature .temp {
  font-size: 4rem;
  font-weight: bold;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.forecast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.forecast-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
}
```

## ✅ Features da Implementare

### Minimo (Sufficienza)
- ✅ Ricerca città
- ✅ Mostra meteo attuale
- ✅ Loading state
- ✅ Error handling

### Intermedio (Buono)
- ✅ Previsioni 5 giorni
- ✅ Città preferite
- ✅ LocalStorage persistence
- ✅ Icone meteo

### Avanzato (Ottimo)
- ✅ Grafico temperature
- ✅ Geolocation (meteo posizione corrente)
- ✅ Multiple unità (°C / °F)
- ✅ Dark mode

## 🎓 Connessione con TLC

- **HTTP Protocol**: GET requests con query parameters
- **REST API**: Resource-based architecture
- **JSON**: Data interchange format
- **Status Codes**: 200, 404, 500
- **Headers**: Content-Type, Authorization
- **Rate Limiting**: API quota e throttling

## 🚀 Estensioni Possibili

1. **Grafici**: Chart.js per visualizzare temperature
2. **Mappa**: Leaflet.js per visualizzare posizione
3. **Notifiche**: Alert per condizioni meteo estreme
4. **Comparazione**: Confronta meteo di più città

## ➡️ Prossimo: ES67 - Literary Archive (Progetto)
