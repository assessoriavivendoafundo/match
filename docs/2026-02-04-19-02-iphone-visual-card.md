# Design First: iPhone-Style Animated Preview Card
**Date:** 2026-02-04
**Status:** Planning

## Obiettivo
Trasformare la "Visual Card" (preview animata) nella pagina UniMatch in un mockup realistico di iPhone, mantenendo l'estetica "Liquid Glass" (trasparenze, sfocature, riflessi) e i colori del brand.

## Analisi Tecnica
1.  **iPhone Chassis**:
    - Utilizzare un contenitore con `aspect-[9/19]` per rispettare le proporzioni moderne.
    - Applicare un raggio di curvatura maggiore (`rounded-[3rem]`) tipico degli iPhone.
    - Aggiungere un bordo scuro (`border-[8px] md:border-[12px] border-black/90`) per simulare la cornice (bezel).
    - Implementare la "Dynamic Island" (pillola nera in alto) utilizzando un `div` assoluto.
    - Inserire pulsanti laterali stilizzati (volume, power) per aumentare il realismo.

2.  **Liquid Glass Aesthetic**:
    - Il "bezel" avrà un riflesso metallico sottile (`ring-1 ring-white/20`).
    - Lo "schermo" interno manterrà il `backdrop-blur-2xl` e il gradiente semi-trasparente.
    - Aggiungere un riflesso diagonale animato (shimmer) che attraversa lo schermo periodicamente.

3.  **Content Adaptation**:
    - Ridimensionare leggermente gli elementi interni per adattarsi alla nuova cornice senza clipping.
    - Mantenere le animazioni 3D/parallasse esistenti.

## Piano di Azione
1.  **Modifica `src/app/unimatch/page.tsx`**:
    - Refactoring del contenitore della Visual Card.
    - Aggiunta dei sotto-elementi per il frame iPhone (frame, dynamic island, side buttons).
    - Ottimizzazione del padding interno.
2.  **Verifica**:
    - Controllo reattività (mobile vs desktop).
    - Build test.

## Feedback Atteso
- Procedere con l'implementazione? (Procedi)
