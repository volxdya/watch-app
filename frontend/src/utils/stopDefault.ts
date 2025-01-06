import { FormEvent } from 'react';

export const stopDefault = (e: FormEvent) => {
  e.preventDefault();
  e.stopPropagation();
};
