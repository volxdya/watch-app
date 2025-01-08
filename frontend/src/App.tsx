import { Route, Routes } from 'react-router-dom';

import { IndexPage } from '@/pages/index';
import { useEffect } from 'react';
import user from './store/user';
import { ProfilePage } from './pages/profile';
import { VideoPage } from './pages/video';
import { StudioPage } from './pages/studio';

function App() {
  useEffect(() => {
    user.getToken();
    user.getMe();
  }, []);

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProfilePage />} path="/profile/:username" />
      <Route element={<VideoPage />} path="/video/:videoId" />
      <Route element={<StudioPage />} path="/studio" />
    </Routes>
  );
}

export default App;
