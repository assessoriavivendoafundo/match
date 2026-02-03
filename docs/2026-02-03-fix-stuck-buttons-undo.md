# Fix: Stuck Match/Nope Buttons & Undo Activation

## Obiettivo
Risolvere un bug visuale nel `SwipeDeck` dove i pulsanti "Match" e "Nope" rimanevano bloccati in uno stato "attivo" (ingranditi/colorati) dopo uno swipe rapido, e impedire che i pulsanti reagiscano visivamente durante l'animazione di "Undo".

## Analisi Tecnica
1.  **Race Condition (Stuck Buttons):**
    - Quando una card viene rimossa (`removeCard`), viene chiamata `activeX.set(0)` per resettare l'UI globale.
    - Tuttavia, la card uscente (gestita da `AnimatePresence` di Framer Motion) continua la sua animazione di uscita.
    - Durante questa animazione, il valore `x` della card cambia e triggera `onSwipeUpdate`.
    - A causa di una race condition tra il render di React (che aggiorna `topCardIdRef`) e il loop di animazione, la card uscente poteva occasionalmente essere considerata ancora "attiva" e sovrascrivere `activeX` con un valore non zero, lasciando i pulsanti "incastrati".

2.  **Undo Activation:**
    - Durante l'operazione di Undo, la card ripristinata entra nello stack. Sebbene ci fossero controlli per l'animazione di entrata, l'utente ha richiesto esplicitamente di garantire che i pulsanti non vengano mai attivati in alcun modo durante questo processo.

## Soluzione Implementata
Modificato la funzione `updateGlobalX` in `src/components/unimatch/SwipeDeck.tsx` introducendo due guardie critiche:

```typescript
const updateGlobalX = (val: number, id: string) => {
    // 1. Prevent updates during undo operations to avoid button flashing
    if (isUndoingRef.current) return;

    // 2. Prevent updates from cards that are currently being removed/swiped out
    // This fixes the "stuck button" glitch where an exiting card overwrites the reset state
    if (swipeRef.current === id) return;

    // Standard check for top card
    if (id === topCardIdRef.current) {
        activeX.set(val);
    }
};
```

Queste modifiche garantiscono che lo stato globale dell'UI (`activeX`) sia guidato *esclusivamente* dalla card attiva corrente e mai da card in uscita o in fase di ripristino.
