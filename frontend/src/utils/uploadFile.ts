import { FormEvent } from 'react';
import { stopDefault } from './stopDefault';
import { postRequest } from './request';

interface IFormDataArgs {
  key: string;
  value: any;
}

export const uploadFile = async (
  e: FormEvent,
  formDataArgs: IFormDataArgs[],
  file: any,
  fn: () => void,
  upload: Prefixes,
) => {
  stopDefault(e);

  if (!file) {
    console.error('Файл не выбран!');
    return;
  }

  const formData = new FormData();

  formDataArgs.forEach((item: IFormDataArgs) => {
    formData.append(item.key, item.value);
  });

  try {
    await postRequest(upload, 'upload', formData);
    fn();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};
