import type { AtomEffect } from 'recoil';

export const sessionEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue) as T);
    }
    onSet((newValue, _, isReset) => {
      if (isReset) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };
