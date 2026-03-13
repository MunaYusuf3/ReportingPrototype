import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import ReasonPage from "./pages/ReasonPage";
import OptionsPage from "./pages/OptionsPage";
import SoftReportPage from "./pages/SoftReportPage";
import MoreInformationPage from "./pages/MoreInformationPage";
import NextStepsPage from "./pages/NextStepsPage";
import ReportConfirmationPage from "./pages/ReportConfirmationPage";
import SuccessPage from "./pages/SuccessPage";

import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/report/options" element={<OptionsPage />} />
        <Route path="/report/reason" element={<ReasonPage />} />
        <Route path="/report/softreport" element={<SoftReportPage />} />
        <Route path="/report/moreinfo" element={<MoreInformationPage />} />
        <Route path="/report/nextsteps" element={<NextStepsPage />} />
        <Route path="/report/confirmation" element={<ReportConfirmationPage />} />
        <Route path="/report/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;