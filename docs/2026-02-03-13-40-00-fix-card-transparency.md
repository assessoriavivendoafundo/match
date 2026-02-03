# PRP - Fix Card Stack Transparency

**Data:** 2026-02-03
**Autore:** Gemini (UI Designer)
**Stato:** In attesa di conferma

## Obiettivo
Rimuovere l'effetto di trasparenza dalle carte posizionate sotto la carta attiva nel componente `SwipeDeck`. L'utente ha espresso insoddisfazione per la trasparenza, preferendo un look più solido e stratificato.

## Analisi Tecnica
Attualmente, il componente `Card` applica un'opacità di `0.6` quando non è la carta attiva. Questo avviene sia nelle varianti di animazione (`inactive`) che nelle proprietà di stile inline di Framer Motion.
Questo causa la sovrapposizione visiva dei contenuti delle carte sottostanti, riducendo la leggibilità e la pulizia del design "Liquid Glass".

## Piano di Azione
1.  **Modifica Varianti Card**: Aggiornare la variante `inactive` in `src/components/unimatch/SwipeDeck.tsx` impostando `opacity: 1`.
2.  **Modifica Stile Inline**: Aggiornare la prop `style` di `motion.div` nel componente `Card` per utilizzare `opacity: 1` (o rimuovere il legame con lo stato di attività per la trasparenza di base).
3.  **Ottimizzazione Gerarchia Visiva**: Per mantenere la percezione di profondità senza trasparenza:
    *   Mantenere `scale: 0.95` e `y: 30` per le carte inattive.
    *   Opzionale: aggiungere un leggero filtro di sfocatura o oscuramento se necessario, ma inizialmente punteremo sulla solidità.

## Risultato Atteso
Le carte nello stack appariranno come oggetti fisici solidi sovrapposti. La carta attiva sarà l'unica con contenuto completamente visibile, mentre quelle sottostanti mostreranno solo i loro bordi e la parte superiore/laterale a causa dello scaling, senza che il testo o i gradienti si mescolino in trasparenza.

Procedere?
