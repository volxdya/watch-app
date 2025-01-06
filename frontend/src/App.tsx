import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import TestPage from "@/pages/test";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<TestPage />} path="/test" />
    </Routes>
  );
}

export default App;
