import { FormEvent } from 'react';

export const stopDefault = (e: FormEvent): void => {
  e.preventDefault();
  e.stopPropagation();
};
