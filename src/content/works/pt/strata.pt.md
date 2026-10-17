---
title: 'Strata'
description: 'Um armazenamento experimental de arquivos endereçados por conteúdo, executado em um único nó e escrito em Go.'
locale: pt
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

## Visão geral

O Strata é um armazenamento local e experimental de arquivos endereçados por conteúdo, executado em um único nó. Ele divide arquivos com FastCDC, grava blocos únicos no BadgerDB e identifica cada arquivo por meio do CID de seu manifesto.

## Abordagem

As leituras recompõem os arquivos bloco a bloco e verificam o conteúdo usando identificadores BLAKE3 ou SHA-256. A CLI oferece comandos para adicionar, obter, listar e remover arquivos, além de coleta de lixo e verificação de integridade. O Strata ainda não está pronto para produção: o formato do repositório pode mudar antes da versão 1.0 e não há suporte a backup, API remota ou coordenação distribuída.
