import { Route, Routes } from 'react-router-dom';

import { IndexPage } from '@/pages/index';
import { useEffect } from 'react';
import user from './store/user';
import { ProfilePage } from './pages/profile';
import { VideoPage } from './pages/video';

function App() {
  useEffect(() => {
    user.getToken();
  }, []);

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProfilePage />} path="/profile/:username" />
      <Route element={<VideoPage />} path="/video/:videoId" />
    </Routes>
  );
}

export default App;
