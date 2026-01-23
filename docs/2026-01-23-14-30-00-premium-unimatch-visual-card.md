# Design First: Premium UniMatch Visual Card & Logo Link
**Date:** 2026-01-23
**Status:** Planning

## Obiettivo
Elevare l'estetica della card visuale (mockup smartphone) a un livello "world-class" e implementare il link di ritorno alla home per il brand AcademItaly.

## Analisi Tecnica
1. **Logo Link:** Avvolgere il `motion.div` del logo AcademItaly in un componente `Link` di Next.js che punti a `/`.
2. **Visual Card (Mockup):**
   - **Bezel:** Ridurre lo spessore del bordo nero per un look più moderno (stile iPhone 15/16 Pro).
   - **Luce Dinamica:** Aggiungere un elemento di riflesso `motion.div` che scorre diagonalmente per dare vita al vetro.
   - **Parallasse:** Ottimizzare il `translateZ` per gli elementi interni (Università, MapPin, Sparkles).
   - **Colori:** Utilizzare gradienti più profondi (Navy #1D3557 e Blue #457B9D) con accenti Gold/Yellow (#FFD054) per le icone di successo.
   - **Icons:** Aggiungere un effetto "floating/breathe" più organico.

## Piano di Azione
1. **Step 1:** Modifica di `src/app/unimatch/page.tsx` per aggiungere il `Link` al logo.
2. **Step 2:** Refactoring del mockup dello smartphone per massimizzare l'estetica "alluring".
3. **Step 3:** Test di build e verifica visiva.

## Feedback Atteso
- Procedere con l'implementazione? (Procedi)
