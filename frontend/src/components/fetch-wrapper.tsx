import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient';

interface Props<T> {
  props: {
    fetchFn: () => Promise<T>;
    key: string[];
    content: React.ReactNode;
  };
}

export default function FetchWrapper<T>({ props }: Props<T>) {
  const { fetchFn, key, content } = props;

  const dataListQuery = useQuery<T>(
    {
      queryFn: fetchFn,
      queryKey: key,
    },
    queryClient,
  );

  useEffect(() => {
    fetchFn();
  }, [fetchFn]);

  switch (dataListQuery.status) {
    case 'pending':
      return <div>Loading...</div>;
    case 'error':
      return (
        <div>
          {(dataListQuery.error as Error).message} — Сделать компонент для
          ошибки
        </div>
      );
    case 'success':
      return <div>{ content }</div>;
    default:
      return <div>Loading...</div>;
  }
}
