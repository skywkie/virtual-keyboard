interface HTMLCollectionOf<T extends Element> extends HTMLCollection {
  item(index: number): T;
  namedItem(name: string): T;
  [index: number]: T;
}

export type { HTMLCollectionOf };
