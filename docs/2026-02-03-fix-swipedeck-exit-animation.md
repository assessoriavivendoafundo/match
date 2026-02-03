# Fix: SwipeDeck Exit Animation "Snap Back"

## Obiettivo
Risolvere il comportamento indesiderato dove le card swipate, invece di volare via ("disappearing"), sembravano tornare indietro o dissolversi sul posto ("send them to the back of the deck").

## Analisi Tecnica
- **Causa:** La variante `exit` del componente `Card` controllava `if (!active)` per determinare se eseguire l'animazione di uscita o un semplice fade-out istantaneo.
- **Problema:** In alcune circostanze (race conditions di render o aggiornamenti di stato), una card appena swipata poteva essere renderizzata con `active=false` (o props stantie) durante la fase di uscita gestita da `AnimatePresence`. Di conseguenza, entrava nel ramo `if (!active)`, eseguendo un fade-out a coordinate `0,0` (centro), che visivamente sembrava un "tornare nel mazzo".
- **Soluzione:** Prioritizzare la presenza di una direzione esplicita (`dir`) salvata nel ref `exitDirectionsRef`.

## Soluzione Implementata
Refactoring della logica `exit` in `src/components/unimatch/SwipeDeck.tsx`:

```typescript
exit: (customRef) => {
    const dir = customRef.current[data.id];

    // 1. Priorità assoluta: Se c'è una direzione registrata, la card è stata swipata.
    // DEVE volare via, indipendentemente da altri stati.
    if (dir) {
        // ... Logica di fly-out (x: 1000 / -1000)
        return { ... };
    }

    // 2. Fallback: Solo se NON c'è direzione (es. card spinta fuori dallo stack da un Undo),
    // esegui il fade-out istantaneo.
    return { x: 0, y: 0, opacity: 0, transition: { duration: 0 } };
}
```

Questo garantisce che ogni interazione esplicita dell'utente (Like/Nope) risulti sempre in un'animazione di uscita fluida e corretta.
