import { usersFetch } from '@/api/User';
import FetchWrapper from '@/components/fetch-wrapper';
import Footer from '@/components/footer';
import { UsersType } from '@/types/user';
import { Users } from './users';

export default function Test() {
  return (
    <FetchWrapper<UsersType>
      props={{
        content: <Users />,
        key: ['users'],
        fetchFn: usersFetch,
      }}
    />
  );
}
