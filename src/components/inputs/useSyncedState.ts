import { useEffect, useState } from 'react';

/**
 * Prop'tan başlayan ve prop değişince ona uyan yerel durum.
 * Kontroller hem Playground/prop ile hem de kullanıcının tıklamasıyla değişebilsin diye kullanılır.
 */
export function useSyncedState<T>(value: T) {
  const [state, setState] = useState(value);
  useEffect(() => setState(value), [value]);
  return [state, setState] as const;
}
