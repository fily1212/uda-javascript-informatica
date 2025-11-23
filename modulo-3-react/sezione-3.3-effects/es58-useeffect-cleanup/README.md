# ES58 - useEffect Cleanup

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi
- Capire quando serve cleanup
- Prevenire memory leaks
- Rimuovere event listeners
- Cancellare timer e subscriptions

## 📚 Teoria - Cleanup: Pulire dopo di Sé

### Il Problema: Memory Leaks

Alcuni side effects creano **risorse** che devono essere **pulite**:

```typescript
// ❌ MEMORY LEAK!
function Orologio() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
    // ❌ Timer continua anche dopo unmount!
  }, []);

  return <div>{time.toLocaleTimeString()}</div>;
}
```

**Problema:** Se il componente viene rimosso, l'`interval` **continua a girare**!

### La Soluzione: Cleanup Function

**Return** una funzione dall'effect per fare cleanup:

```typescript
// ✅ CORRETTO con cleanup
function Orologio() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // 🧹 Cleanup function
    return () => {
      clearInterval(intervalId);
      console.log("Timer rimosso!");
    };
  }, []);

  return <div>{time.toLocaleTimeString()}</div>;
}
```

**Quando viene eseguita la cleanup?**
1. **Prima** di ri-eseguire l'effect (se dependencies cambiano)
2. Quando il componente viene **unmounted** (rimosso)

### Casi che Richiedono Cleanup

#### 1. Timer (setInterval, setTimeout)

```typescript
useEffect(() => {
  const timerId = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => clearInterval(timerId); // 🧹 Cleanup
}, []);
```

#### 2. Event Listeners

```typescript
useEffect(() => {
  function handleResize() {
    console.log("Window resized");
  }

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize); // 🧹 Cleanup
  };
}, []);
```

#### 3. Subscriptions / WebSocket

```typescript
useEffect(() => {
  const ws = new WebSocket('ws://example.com');

  ws.onmessage = (event) => {
    console.log(event.data);
  };

  return () => {
    ws.close(); // 🧹 Cleanup
  };
}, []);
```

#### 4. Fetch con AbortController

```typescript
useEffect(() => {
  const controller = new AbortController();

  async function fetchData() {
    try {
      const res = await fetch('/api/data', {
        signal: controller.signal
      });
      const data = await res.json();
      setData(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(err);
      }
    }
  }

  fetchData();

  return () => {
    controller.abort(); // 🧹 Cancella fetch
  };
}, []);
```

### Cleanup con Dependencies

Quando le dependencies cambiano, React:
1. Esegue la **cleanup** dell'effect precedente
2. Esegue il **nuovo** effect

```typescript
function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log(`Fetching user ${userId}...`);
    let cancelled = false;

    async function fetchUser() {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();

      if (!cancelled) {
        setUser(data);
      }
    }

    fetchUser();

    return () => {
      console.log(`Cleanup for user ${userId}`);
      cancelled = true; // 🧹 Previeni setState su componente unmounted
    };
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

**Sequenza quando userId cambia da 1 a 2:**
```
1. Fetching user 1...
2. [userId cambia a 2]
3. Cleanup for user 1    👈 Cleanup PRIMA
4. Fetching user 2...     👈 Nuovo effect DOPO
```

### Cleanup: Quando Serve?

**Serve cleanup per:**
- ✅ `setInterval` / `setTimeout`
- ✅ Event listeners (`addEventListener`)
- ✅ WebSocket / EventSource
- ✅ Subscriptions (RxJS, ecc.)
- ✅ Fetch con AbortController
- ✅ Animation frames (`requestAnimationFrame`)
- ✅ External libraries (D3, Three.js, ecc.)

**NON serve cleanup per:**
- ❌ Semplici fetch senza abort
- ❌ Modifiche al DOM (React gestisce)
- ❌ console.log
- ❌ LocalStorage set/get
- ❌ Calcoli puri

### Pattern Comuni

#### Timer con Cleanup

```typescript
function Countdown({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;

    const timerId = setTimeout(() => {
      setRemaining(remaining - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [remaining]);

  return <div>{remaining > 0 ? remaining : "Time's up!"}</div>;
}
```

#### Event Listener con Cleanup

```typescript
function KeyboardListener() {
  const [key, setKey] = useState("");

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      setKey(event.key);
    }

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return <p>Last key pressed: {key}</p>;
}
```

#### Cleanup Condizionale

```typescript
function Component({ shouldListen }: { shouldListen: boolean }) {
  useEffect(() => {
    if (!shouldListen) return; // Nessun setup, nessun cleanup

    function handler() {
      console.log("Click!");
    }

    window.addEventListener('click', handler);

    return () => {
      window.removeEventListener('click', handler);
    };
  }, [shouldListen]);

  return <div>Component</div>;
}
```

## 💡 Esempio Completo - Timer Pomodoro

```typescript
import { useState, useEffect } from 'react'
import './Pomodoro.css'

type Mode = 'work' | 'break';

function PomodoroTimer() {
  const [mode, setMode] = useState<Mode>('work');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 minuti
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  // Effect: Timer con cleanup
  useEffect(() => {
    if (!isRunning) return; // Nessun timer se non in running

    console.log("Timer started");

    const intervalId = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          // Timer finito
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // 🧹 Cleanup: rimuovi interval
    return () => {
      console.log("Timer cleanup");
      clearInterval(intervalId);
    };
  }, [isRunning]); // Ri-setup quando isRunning cambia

  // Effect: Aggiorna document title
  useEffect(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    document.title = `${minutes}:${seconds.toString().padStart(2, '0')} - ${
      mode === 'work' ? '🍅 Work' : '☕ Break'
    }`;
  }, [secondsLeft, mode]);

  // Effect: Notifica audio quando timer finisce
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      // Suona notifica (se supportato)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Pomodoro Timer', {
          body: mode === 'work' ? '🎉 Work session complete!' : '✅ Break over!',
        });
      }
    }
  }, [secondsLeft, isRunning, mode]);

  // Effect: Richiedi permessi notifiche al mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  function handleTimerComplete() {
    setIsRunning(false);

    if (mode === 'work') {
      setCompletedPomodoros(prev => prev + 1);
      setMode('break');
      setSecondsLeft(5 * 60); // 5 min break
    } else {
      setMode('work');
      setSecondsLeft(25 * 60); // 25 min work
    }
  }

  function toggleTimer() {
    setIsRunning(!isRunning);
  }

  function resetTimer() {
    setIsRunning(false);
    setMode('work');
    setSecondsLeft(25 * 60);
  }

  function skipToBreak() {
    setIsRunning(false);
    setMode('break');
    setSecondsLeft(5 * 60);
  }

  // Format time
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // Progress percentage
  const totalSeconds = mode === 'work' ? 25 * 60 : 5 * 60;
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className={`pomodoro ${mode}`}>
      <h1>🍅 Pomodoro Timer</h1>

      <div className="mode-indicator">
        <span className={mode === 'work' ? 'active' : ''}>Work</span>
        <span className={mode === 'break' ? 'active' : ''}>Break</span>
      </div>

      <div className="timer-display">
        <div className="time">{timeString}</div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="controls">
        <button onClick={toggleTimer} className="btn-primary">
          {isRunning ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button onClick={resetTimer} className="btn-secondary">
          🔄 Reset
        </button>
        {mode === 'work' && (
          <button onClick={skipToBreak} className="btn-secondary">
            ⏭️ Skip to Break
          </button>
        )}
      </div>

      <div className="stats">
        <h3>📊 Statistics</h3>
        <p>Completed Pomodoros: <strong>{completedPomodoros}</strong></p>
        <p>Focus Time: <strong>{completedPomodoros * 25} minutes</strong></p>
      </div>

      <div className="instructions">
        <h4>📖 How it works</h4>
        <ol>
          <li>Work for 25 minutes (1 Pomodoro)</li>
          <li>Take a 5 minute break</li>
          <li>Repeat!</li>
        </ol>
      </div>
    </div>
  );
}

export default PomodoroTimer;
```

## ✏️ Esercizio

### Parte 1: Stopwatch con Cleanup
```typescript
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // TODO: useEffect con setInterval
  // - Incrementa seconds ogni secondo se isRunning
  // - CLEANUP: clearInterval

  function toggle() {
    setIsRunning(!isRunning);
  }

  function reset() {
    setIsRunning(false);
    setSeconds(0);
  }

  return (
    <div>
      <h1>{seconds}s</h1>
      <button onClick={toggle}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Parte 2: Window Size Tracker
```typescript
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // TODO: useEffect con addEventListener
  // - Ascolta 'resize'
  // - Aggiorna size
  // - CLEANUP: removeEventListener

  return (
    <div>
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
    </div>
  );
}
```

### Parte 3: Auto-Save con Cleanup
```typescript
function AutoSaveEditor() {
  const [text, setText] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // TODO: useEffect che salva dopo 2 secondi di inattività
  // - Usa setTimeout
  // - Salva in localStorage
  // - CLEANUP: clearTimeout (se user continua a scrivere)

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Scrivi... (auto-save dopo 2s)"
      />
      {lastSaved && <p>Last saved: {lastSaved.toLocaleTimeString()}</p>}
    </div>
  );
}
```

### Parte 4: Click Outside Detector
```typescript
function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // TODO: useEffect che chiude dropdown quando clicco fuori
  // - addEventListener su document
  // - Controlla se click è fuori ref.current
  // - CLEANUP: removeEventListener

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
      {isOpen && (
        <div className="dropdown">
          <p>Menu Item 1</p>
          <p>Menu Item 2</p>
        </div>
      )}
    </div>
  );
}
```

## 🎯 Output Atteso

```
🍅 Pomodoro Timer

[Work] Break

┌─────────────┐
│   24:35     │
│ ▓▓░░░░░░░░  │  (10% progress)
└─────────────┘

[▶️ Start] [🔄 Reset] [⏭️ Skip to Break]

📊 Statistics
Completed Pomodoros: 3
Focus Time: 75 minutes

📖 How it works
1. Work for 25 minutes
2. Take a 5 minute break
3. Repeat!
```

## 💡 Suggerimenti

- **Return Function**: Ritorna funzione da useEffect per cleanup
- **clearInterval/clearTimeout**: Sempre in cleanup!
- **removeEventListener**: Passa STESSA funzione di addEventListener
- **Riferimenti**: Salva ID di timer/listener in variabili
- **Conditional Setup**: Se nessun setup, non serve cleanup (early return)
- **Unmount**: Cleanup esegue sempre all'unmount

## 🚀 Sfida Extra

1. **Chat Simulator**: WebSocket con cleanup
2. **Animation Loop**: requestAnimationFrame con cleanup
3. **Scroll Spy**: Traccia posizione scroll con cleanup
4. **Debounced Search**: Cancella fetch se user continua a scrivere

## 📖 Concetti Chiave

- ✅ **Cleanup Function** = return function da useEffect
- ✅ **Memory Leaks** = risorse non pulite continuano a girare
- ✅ **clearInterval/clearTimeout** = cleanup timer
- ✅ **removeEventListener** = cleanup event listeners
- ✅ **Unmount** = cleanup esegue quando componente rimosso
- ✅ **Dependencies Change** = cleanup prima di ri-eseguire effect
- ✅ **AbortController** = cancella fetch in corso

## ➡️ Prossimo: ES59 - useContext Hook
