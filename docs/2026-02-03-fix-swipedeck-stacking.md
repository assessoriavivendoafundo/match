# Fix: Progressive Card Stacking in SwipeDeck

## Obiettivo
Risolvere il glitch visuale dove le card inattive (sottostanti) appaiono disordinate o sporgono in modo anomalo ("green sliver") da sotto la card attiva.

## Analisi Tecnica
- **Problema:** Tutte le card inattive condividevano gli stessi valori di trasformazione (`scale: 0.95`, `y: 30`). Questo causava una sovrapposizione esatta delle card sottostanti, dove l'unica differenza era la rotazione casuale (`randomRotate`). Se le rotazioni erano divergenti, gli angoli delle card inferiori (es. la terza nello stack) sporgevano visibilmente, creando un effetto "sporco" o glitch.
- **Soluzione:** Implementare uno stacking progressivo basato sulla profondità della card nello stack (`stackIndex`).

## Soluzione Implementata
1.  **Calcolo `stackIndex`:** Nel loop di render di `SwipeDeck`, calcoliamo l'indice inverso (`stackIndex`) per ogni card visualizzata (`0` = attiva, `1` = subito dietro, `2` = ultima).
2.  **Propagazione:** Passato `stackIndex` come prop al componente `Card`.
3.  **Varianti Dinamiche:** Aggiornato l'oggetto `variants.inactive` per usare valori calcolati dinamicamente:
    - `scale`: `1 - stackIndex * 0.05` (1.0, 0.95, 0.90...)
    - `y`: `stackIndex * 15` (0px, 15px, 30px...)

Questo crea un effetto di profondità pulito ("piramide") dove ogni card successiva è progressivamente più piccola e leggermente più in basso, garantendo che le card più profonde rimangano nascoste o ordinate visivamente dietro quelle superiori, eliminando il glitch della "green sliver".
