---
title: 'Chi Starter'
description: 'A TUI and CLI project generator for production-focused Go services built with Chi.'
tech:
  - Go
  - Chi
  - Bubble Tea
repo: 'https://github.com/mexirica/chi-starter'
order: 3
publishDate: 2026-04-12
---

## Brief

Chi Starter generates a Go and Chi service through either an interactive terminal flow or a scriptable CLI. Its core scaffold includes lifecycle wiring, configuration validation, structured logging, request middleware, health and readiness probes, and tests.

## Approach

Projects remain minimal by default, then opt into Postgres, Redis, observability, and Docker blocks. The generator writes ordinary Go source instead of adding a runtime framework, keeping the composition root and dependencies visible.
