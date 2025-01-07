import { Route, Routes } from 'react-router-dom';

import IndexPage from '@/pages/index';
import { useEffect } from 'react';
import user from './store/user';
import { ProfilePage } from './pages/profile';

function App() {
  useEffect(() => {
    user.getToken();
  }, []);

  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProfilePage />} path="/profile/:username" />
    </Routes>
  );
}

export default App;
