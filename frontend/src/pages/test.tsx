import { usersFetch } from '@/api/User';
import FetchWrapper from '@/components/fetch-wrapper';
import { UsersType } from '@/types/user';

// test component
export default function Test() {
  return (
    <FetchWrapper<UsersType>
      props={{
        content: 'OK',
        key: ['users'],
        fetchFn: usersFetch,
      }}
    />
  );
}
