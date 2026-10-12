---
title: 'Structs in Go: Understanding Memory, Alignment, and Type Identity'
publishDate: 2026-10-12
tags:
  - go
  - programming
  - memory
  - performance
description: 'A practical look at how Go lays out structs in memory, why padding exists, when field order matters, and how type identity affects assignment and conversion.'
draft: false
---

Structs are one of Go's primary tools for modeling data. They group related values into a single type, make domain concepts explicit, and often let the compiler arrange data efficiently in memory.

That simple definition hides a few details worth understanding. A struct's size is not always the sum of its fields, two structs that look alike are not necessarily the same type, and changing field order can affect memory usage without changing behavior.

This article explores those details and shows how to inspect them in a running Go program.

## Modeling data with structs

A struct is a sequence of named fields:

```go
type Sample struct {
	Enabled bool
	Count   int16
	Ratio   float32
}
```

Each field has its own type, but the fields together form a new type: `Sample`.

The zero value of a struct is useful immediately. Declaring a variable without an initializer sets every field to the zero value of its type:

```go
var sample Sample

fmt.Println(sample.Enabled) // false
fmt.Println(sample.Count)   // 0
fmt.Println(sample.Ratio)   // 0
```

When values are known, a keyed composite literal makes the intent clear:

```go
sample := Sample{
	Enabled: true,
	Count:   10,
	Ratio:   0.5,
}
```

Keyed fields are usually preferable to positional literals because they remain readable and do not depend on field order.

## Size is more than the sum of the fields

At first glance, `Sample` appears to require seven bytes:

- `bool`: 1 byte
- `int16`: 2 bytes
- `float32`: 4 bytes

On the standard Go compiler and common architectures, however, `Sample` occupies eight bytes. The extra byte is **padding** inserted to satisfy alignment requirements.

Processors generally access values most efficiently when their addresses are aligned to boundaries appropriate for their types. In this example, `int16` requires two-byte alignment and `float32` requires four-byte alignment.

The fields are laid out like this:

```text
byte      0       1       2       3       4       5       6       7
        +-------+-------+---------------+-------------------------------+
field   |Enabled|  pad  |     Count     |             Ratio             |
        +-------+-------+---------------+-------------------------------+
```

`Enabled` starts at offset 0. The compiler then inserts one byte of padding so that `Count` can start at offset 2. After `Count`, offset 4 already satisfies the alignment requirement of `Ratio`.

The result is:

```text
1 byte + 1 byte padding + 2 bytes + 4 bytes = 8 bytes
```

Alignment details are architecture- and compiler-dependent. When an exact layout matters, measure the target environment instead of treating a diagram as a universal guarantee.

## Inspecting layout with `unsafe`

The `unsafe` package exposes the size, alignment, and offset information chosen by the compiler:

```go
package main

import (
	"fmt"
	"unsafe"
)

type Sample struct {
	Enabled bool
	Count   int16
	Ratio   float32
}

func main() {
	var sample Sample

	fmt.Println("size:", unsafe.Sizeof(sample))
	fmt.Println("alignment:", unsafe.Alignof(sample))
	fmt.Println("Enabled offset:", unsafe.Offsetof(sample.Enabled))
	fmt.Println("Count offset:", unsafe.Offsetof(sample.Count))
	fmt.Println("Ratio offset:", unsafe.Offsetof(sample.Ratio))
}
```

On a typical 64-bit system, this prints:

```text
size: 8
alignment: 4
Enabled offset: 0
Count offset: 2
Ratio offset: 4
```

These operations are useful for inspection, low-level interoperability, and performance work. They are not needed for ordinary struct usage.

## Why structs may have trailing padding

A struct's alignment is determined by the strictest alignment requirement among its fields. Its total size is then rounded up to a multiple of that alignment.

This rule keeps every element properly aligned when structs are stored in an array or slice. Consider a value whose fields use seven bytes but whose required alignment is four. Without one trailing padding byte, the second element in an array would begin at an unsuitable address.

```text
[ 7-byte value ][ 7-byte value ]
                 ^ next value starts at offset 7

[ 8-byte value ][ 8-byte value ]
                 ^ next value starts at offset 8
```

Padding at the end preserves alignment for every element, not only the first one.

## When field order changes the size

The original `Sample` cannot become smaller simply by reordering its fields: its seven bytes of field data still need to be rounded up to a multiple of four, so every ordering occupies at least eight bytes on the assumed architecture.

Field order does matter when padding appears in several places. On a typical 64-bit architecture, compare these definitions:

```go
type Scattered struct {
	Active bool  // 1 byte + 7 bytes padding
	Count  int64 // 8 bytes
	Ready  bool  // 1 byte + 7 bytes trailing padding
}

type Compact struct {
	Count  int64 // 8 bytes
	Active bool  // 1 byte
	Ready  bool  // 1 byte + 6 bytes trailing padding
}
```

Their measured sizes are typically:

```go
fmt.Println(unsafe.Sizeof(Scattered{})) // 24
fmt.Println(unsafe.Sizeof(Compact{}))   // 16
```

Grouping fields with similar alignment requirements reduces the padding from fourteen bytes to six.

That does not mean every struct should be ordered solely by field size. Field order can communicate meaning, and changing it may break code that relies on a binary layout or positional composite literals. Optimize layout when measurements show that memory density matters, especially for large slices of frequently allocated values.

## Named structs and type identity

Go distinguishes between a type's representation and its identity. Two named struct types remain distinct even when their fields are identical:

```go
type Bill struct {
	ID int
}

type Nancy struct {
	ID int
}

var bill Bill
var nancy Nancy

// bill = nancy // compile error: cannot use Nancy as Bill
```

This distinction is useful. A `CustomerID` and an `InvoiceID`, for example, may share the same representation while describing different concepts that should not be mixed accidentally.

When two named struct types have identical underlying types, an explicit conversion states that the change is intentional:

```go
bill = Bill(nancy)
```

Anonymous struct types follow structural identity rules. Their fields must have the same names, types, order, tags, and embedded status to be identical:

```go
first := struct {
	ID int
}{ID: 1}

second := struct {
	ID int
}{ID: 2}

first = second // allowed: the anonymous struct types are identical
```

Change a field name, type, order, tag, or embedding, and the anonymous struct types are no longer identical.

## Explicit conversion makes intent visible

Go generally avoids implicit conversion between different named types, even when their underlying representations are compatible. The rule applies beyond structs:

```go
var signed int = -5

// var unsigned uint = signed // compile error
unsigned := uint(signed) // explicit, but probably not what you want
```

The conversion compiles, but it does not make the value semantically valid. Converting a negative integer to an unsigned type produces a large positive value according to Go's conversion rules.

Explicit syntax puts that decision at the point where it can be reviewed. The compiler requires intent; the programmer remains responsible for correctness.

## Practical guidelines

- Use structs to give related data a meaningful shape and name.
- Prefer keyed composite literals when initializing fields.
- Rely on zero values when they represent a valid default state.
- Remember that padding may make a struct larger than the sum of its fields.
- Measure layout with `unsafe.Sizeof`, `unsafe.Alignof`, and `unsafe.Offsetof` on the target architecture.
- Reorder fields only when memory usage matters and the change does not violate an external layout contract.
- Treat named types as semantic boundaries, not merely as collections of fields.
- Use explicit conversions carefully; they express intent but do not guarantee correctness.

Structs reflect several of Go's broader design priorities: explicitness, predictable behavior, and practical performance. Understanding their memory layout and type identity helps when these details matter, while the language keeps them out of the way when they do not.
