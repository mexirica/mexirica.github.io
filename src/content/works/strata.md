---
title: 'Strata'
description: 'An experimental single-node, content-addressed file store written in Go.'
tech:
  - Go
  - Content-Addressed Storage
  - FastCDC
  - Badger
repo: 'https://github.com/mexirica/strata'
order: 1
publishDate: 2026-10-08
---

## Brief

Strata is an experimental local, single-node content-addressed file store. It splits files with FastCDC, writes unique chunks to BadgerDB, and identifies each file through a manifest CID.

## Approach

Reads stream files back chunk by chunk and verify content against BLAKE3 or SHA-256 identifiers. The CLI covers add, get, list, remove, garbage collection, and integrity scrubbing. Strata is not production-ready: its repository format may change before v1, and it has no supported backup, remote API, or distributed coordination.
