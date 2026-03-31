import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import FeedPage from "./pages/FeedPage";
import OptionsPage from "./pages/OptionsPage";
import ReasonPage from "./pages/ReasonPage";
import SoftReportPage from "./pages/SoftReportPage";
import MoreInformationPage from "./pages/MoreInformationPage";
import NextStepsPage from "./pages/NextStepsPage";
import ReportConfirmationPage from "./pages/ReportConfirmationPage";
import SuccessPage from "./pages/SuccessPage";
import MoreHelpPage from "./pages/MoreHelpPage";
import SuggestedReportingCategoryPage from "./pages/SuggestedReportingCategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/report/options" element={<OptionsPage />} />
        <Route path="/report/morehelp" element={<MoreHelpPage />} />
        <Route path="/report/suggested" element={<SuggestedReportingCategoryPage />} />
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
