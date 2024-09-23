export function group<TItem, TKey>(
  items: TItem[],
  keySelector: (item: TItem) => TKey
): TItem[][] {
  const map = new Map<TKey, TItem[]>();

  for (const item of items) {
    const key = keySelector(item);
    const group = map.get(key);

    if (group) {
      group.push(item);
    } else {
      map.set(key, [item]);
    }
  }

  return [...map.keys()].map((key) => map.get(key)!);
}
