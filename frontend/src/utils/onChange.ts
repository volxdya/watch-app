import { ChangeEvent } from 'react';

export const onChange =
  (fn: (value: string) => void) =>
  (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    fn(value);
  };
