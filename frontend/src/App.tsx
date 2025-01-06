import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import TestPage from "@/pages/test";
import ProfilePage from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<TestPage />} path="/test" />
      <Route element={<ProfilePage />} path="/profile" />
    </Routes>
  );
}

export default App;
