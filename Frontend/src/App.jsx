import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import ReasonPage from "./pages/ReasonPage";
import OptionsPage from "./pages/OptionsPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/report/options" element={<OptionsPage />} />
        <Route path="/report/reason" element={<ReasonPage />} />
      </Routes>
    </Router>
  );
}

export default App;