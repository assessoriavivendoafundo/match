# PRP: UniMatch Italia - Tinder for Universities

**Data:** 2026-01-04 23:30:51
**Status:** In Attesa di Conferma

---

## 🎯 Obiettivo
Creare un'interfaccia di scoperta universitaria interattiva in stile "Tinder" per UniMatch Italia. L'obiettivo è aiutare gli studenti brasiliani a trovare la loro università ideale in Italia attraverso un'esperienza gamificata, mobile-first e ad alta energia.

## 🛠 Analisi Tecnica

### Stack Tecnologico
- **Framework:** Next.js (React)
- **Animazioni:** Framer Motion (gestures, spring physics, floating exclamations)
- **Styling:** Tailwind CSS (Design System: "Liquid Glass" / VisionOS inspired)
- **Data Parsing:** PapaParse per il caricamento di `universities.csv`
- **Iconografia:** Lucide-react

### Componenti Core
1. **SkimQuiz Overlay:** Filtro iniziale a 3 domande (Area, Budget, Città).
2. **SwipeDeck:** Gestore della pila di card con logica di swipe (left/right) e undo.
3. **UniversityCard:** Componente visuale con supporto a drag e feedback tattile.
4. **VibeFeedback:** Sistema di animazioni particellari per esclamazioni in portoghese ("Top!", "Mamma Mia!").
5. **WishlistDrawer:** Drawer sticky per visualizzare le università salvate.

### Flusso Dati
- Caricamento CSV lato client.
- Filtraggio iniziale tramite stato locale.
- Gestione della coda (stack) per lo swipe e lo storico (undo).

---

## 📋 Piano di Azione

### Fase 1: Setup & Data (Giorno 1)
- [ ] Configurazione ambiente Next.js e installazione dipendenze (`framer-motion`, `papaparse`).
- [ ] Creazione del file `/data/universities.csv` con dati di esempio accurati.
- [ ] Implementazione dell'utility di parsing CSV.

### Fase 2: Logica di Filtraggio & Quiz (Giorno 1)
- [ ] Sviluppo del `SkimQuiz` component.
- [ ] Implementazione della logica di filtraggio dei dati basata sulle risposte del quiz.

### Fase 3: Swipe Engine & Card UI (Giorno 2)
- [ ] Creazione della `UniversityCard` con Framer Motion (`useDrag`).
- [ ] Implementazione del `SwipeDeck` per gestire la rotazione delle card e le azioni (Like/Dislike).
- [ ] Aggiunta della funzionalità **Undo** (history stack).

### Fase 4: Esperienza Utente & "Vibe" (Giorno 2)
- [ ] Implementazione delle esclamazioni flottanti in portoghese su "Like".
- [ ] Sviluppo del `WishlistDrawer` per raccogliere le università selezionate.
- [ ] Applicazione del design "Liquid Glass" (glassmorphism, blur, arancione #e59936).

### Fase 5: Testing & Polishing (Giorno 3)
- [ ] Ottimizzazione performance (60fps su mobile).
- [ ] Test di usabilità e rifinitura delle curve di "Spring" physics.
- [ ] Verifica finale della responsività.

---

**Procedere con l'attuazione del piano?**
