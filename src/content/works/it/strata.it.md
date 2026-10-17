---
title: 'Strata'
description: 'Un archivio sperimentale di file indirizzati per contenuto, eseguito su un singolo nodo e scritto in Go.'
locale: it
translationKey: strata
tech:
  - Go
  - Content-Addressed Storage
  - FastCDC
  - Badger
repo: 'https://github.com/mexirica/strata'
order: 1
publishDate: 2026-10-08
---

## Panoramica

Strata è un archivio locale e sperimentale di file indirizzati per contenuto, eseguito su un singolo nodo. Suddivide i file con FastCDC, salva i blocchi univoci in BadgerDB e identifica ogni file tramite il CID del relativo manifesto.

## Approccio

Le letture ricostruiscono i file blocco per blocco e verificano i contenuti tramite identificatori BLAKE3 o SHA-256. La CLI consente di aggiungere, recuperare, elencare e rimuovere file, oltre a eseguire la garbage collection e il controllo di integrità. Strata non è ancora pronto per la produzione: il formato del repository può cambiare prima della versione 1.0 e non sono supportati backup, API remote o coordinamento distribuito.
