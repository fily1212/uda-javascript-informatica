# ES70 - Pomodoro Timer Suite (Progetto Finale)

## 📘 Tipo: PURO (Informatica)

## 🎯 Obiettivi Progetto
- Timer complesso con useEffect cleanup
- Notifiche browser
- Statistiche sessioni
- Settings personalizzabili

## 📋 Descrizione Progetto

Crea una suite completa per tecnica Pomodoro con:
- Timer 25 min lavoro / 5 min pausa
- Notifiche audio e browser
- Conta sessioni completate
- Statistiche giornaliere/settimanali
- Settings customizzabili
- Task integration (opzionale)

## 💡 Struttura Completa

```typescript
interface PomodoroSettings {
  workDuration: number; // minuti
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number; // ogni X pomodori
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

interface PomodoroSession {
  id: number;
  startTime: string;
  endTime: string;
  type: 'work' | 'break';
  completed: boolean;
  interrupted: boolean;
  task?: string;
}

interface PomodoroStats {
  today: {
    completed: number;
    focusTime: number; // minuti
    breaks: number;
  };
  week: {
    completed: number;
    focusTime: number;
  };
  allTime: {
    completed: number;
    focusTime: number;
  };
}
```

## ✅ Features Complete

### Core Timer
- ✅ Countdown timer con secondi
- ✅ Start/Pause/Reset
- ✅ Switch automatico work ↔ break
- ✅ Visual progress bar
- ✅ Sound notifications

### Notifications
- ✅ Browser notifications
- ✅ Audio alert customizzabile
- ✅ Update document title con countdown

### Sessions Tracking
- ✅ Salva ogni sessione completata
- ✅ History log con orari
- ✅ Conta sessioni giornaliere

### Settings
- ✅ Durate customizzabili
- ✅ Auto-start breaks/pomodori
- ✅ Toggle sound/notifications
- ✅ Salva in localStorage

### Statistics
- ✅ Dashboard stats (oggi/settimana)
- ✅ Grafico sessioni (opzionale)
- ✅ Focus time totale
- ✅ Streak counter

## 💡 Esempio Core Logic

```typescript
import { useState, useEffect, useRef } from 'react'

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

function PomodoroTimer() {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // secondi
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  
  // Settings
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    autoStartBreaks: false,
    soundEnabled: true,
    notificationsEnabled: true
  });

  // Timer Effect con Cleanup
  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Update document title
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.title = `${minutes}:${seconds.toString().padStart(2, '0')} - ${mode === 'work' ? '🍅 Work' : '☕ Break'}`;
  }, [timeLeft, mode]);

  // Notifications permission
  useEffect(() => {
    if (settings.notificationsEnabled && 'Notification' in window) {
      Notification.requestPermission();
    }
  }, [settings.notificationsEnabled]);

  function handleTimerComplete() {
    setIsRunning(false);

    // Play sound
    if (settings.soundEnabled) {
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {});
    }

    // Show notification
    if (settings.notificationsEnabled && Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: mode === 'work' ? '🎉 Work session complete!' : '✅ Break over!',
        icon: '/tomato-icon.png'
      });
    }

    // Switch mode
    if (mode === 'work') {
      setCompletedPomodoros(prev => prev + 1);
      
      // Long break after N pomodoros
      const nextMode = (completedPomodoros + 1) % settings.longBreakInterval === 0
        ? 'longBreak'
        : 'shortBreak';
      
      setMode(nextMode);
      setTimeLeft(nextMode === 'longBreak' ? settings.longBreak * 60 : settings.shortBreak * 60);
      
      if (settings.autoStartBreaks) {
        setIsRunning(true);
      }
    } else {
      setMode('work');
      setTimeLeft(settings.workDuration * 60);
      
      if (settings.autoStartPomodoros) {
        setIsRunning(true);
      }
    }
  }

  function resetTimer() {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(settings.workDuration * 60);
  }

  function skipToBreak() {
    setIsRunning(false);
    setMode('shortBreak');
    setTimeLeft(settings.shortBreak * 60);
  }

  // Format time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = mode === 'work'
    ? ((settings.workDuration * 60 - timeLeft) / (settings.workDuration * 60)) * 100
    : ((settings.shortBreak * 60 - timeLeft) / (settings.shortBreak * 60)) * 100;

  return (
    <div className={`pomodoro-app ${mode}`}>
      <h1>🍅 Pomodoro Timer</h1>

      {/* Mode Indicator */}
      <div className="mode-tabs">
        <button className={mode === 'work' ? 'active' : ''}>Work</button>
        <button className={mode.includes('Break') ? 'active' : ''}>Break</button>
      </div>

      {/* Timer Display */}
      <div className="timer-circle">
        <div className="time-display">
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
        <svg className="progress-ring">
          <circle
            cx="120"
            cy="120"
            r="110"
            stroke="#ddd"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="120"
            cy="120"
            r="110"
            stroke="currentColor"
            strokeWidth="10"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 110}`}
            strokeDashoffset={`${2 * Math.PI * 110 * (1 - progress / 100)}`}
            transform="rotate(-90 120 120)"
          />
        </svg>
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={() => setIsRunning(!isRunning)} className="btn-primary">
          {isRunning ? '⏸️ Pause' : '▶️ Start'}
        </button>
        <button onClick={resetTimer} className="btn-secondary">
          🔄 Reset
        </button>
        {mode === 'work' && (
          <button onClick={skipToBreak} className="btn-secondary">
            ⏭️ Skip
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="stats">
        <h3>📊 Today's Stats</h3>
        <p>Completed: <strong>{completedPomodoros}</strong></p>
        <p>Focus Time: <strong>{completedPomodoros * settings.workDuration} min</strong></p>
      </div>

      {/* Settings Panel */}
      {/* Implementa panel settings con durate customizzabili */}
    </div>
  );
}

export default PomodoroTimer;
```

## ✅ Checklist Completa

### Minimo (Sufficienza)
- ✅ Timer 25/5 minuti
- ✅ Start/Pause/Reset
- ✅ Conta pomodori completati
- ✅ Switch automatico work/break

### Buono
- ✅ Settings customizzabili
- ✅ LocalStorage persistence
- ✅ Browser notifications
- ✅ Sound alerts
- ✅ Statistics dashboard

### Ottimo
- ✅ History log sessioni
- ✅ Task integration
- ✅ Grafico produttività
- ✅ Export data JSON/CSV
- ✅ Streak counter
- ✅ Dark mode

## 🎨 Design Inspiration

- Circular progress indicator
- Color coding: red (work), green (break)
- Minimalist interface
- Smooth animations
- Mobile-responsive

## 🚀 Estensioni Avanzate

1. **Task Integration**: Associa timer a task specifiche
2. **Analytics**: Grafici produttività settimanale
3. **Spotify Integration**: Music control (opzionale)
4. **Team Mode**: Pomodoro sincronizzati con team
5. **Achievements**: Badge per streak e milestone

## 🎓 Concetti Applicati

Questo progetto finale mette insieme:
- ✅ useState (state management)
- ✅ useEffect (timer con cleanup)
- ✅ useContext (settings globali)
- ✅ useReducer (session history - opzionale)
- ✅ Custom Hooks (useTimer, useNotifications)
- ✅ LocalStorage (persistence)
- ✅ Browser APIs (Notification, Audio)

## 🎉 Congratulazioni!

Hai completato tutti i 70 esercizi React!

Ora sei in grado di:
- ✅ Creare componenti React complessi
- ✅ Gestire state e lifecycle
- ✅ Integrare API esterne
- ✅ Creare applicazioni complete
- ✅ Applicare React a domini interdisciplinari

**Prossimi passi:**
- Deploy su Vercel/Netlify
- Portfolio progetti
- Contributi open source
- Framework avanzati (Next.js, Remix)
