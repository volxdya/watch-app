import { Route, Routes } from 'react-router-dom';
import { IndexPage } from '@/pages/index';
import { useEffect } from 'react';
import user from './store/user';
import { ProfilePage } from './pages/profile';
import { VideoPage } from './pages/video';
import { StudioPage } from './pages/studio';
import { SettingsPage } from './pages/settings';
import Test from './pages/test';
import { useQuery } from '@tanstack/react-query';
import { meFetch } from './api/User';
import { queryClient } from './api/queryClient';
import { Loader } from './components/loader';

function App() {
  useEffect(() => {
    user.getToken();
  }, []);

  const dataListQuery = useQuery(
    {
      queryFn: meFetch,
      queryKey: ['me'],
    },
    queryClient,
  );

  switch (dataListQuery.status) {
    case 'error':
      return dataListQuery.error.message;
    case 'pending':
      console.log('pending...')
      return <Loader />;
    case 'success':
      user.me = dataListQuery.data;
  }

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProfilePage />} path="/profile/:username" />
      <Route element={<VideoPage />} path="/video/:videoId" />
      <Route element={<StudioPage />} path="/studio" />
      <Route element={<SettingsPage />} path="/settings" />
      <Route element={<Test />} path="/test" />
    </Routes>
  );
}

export default App;
