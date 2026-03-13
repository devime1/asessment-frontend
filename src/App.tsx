import { Routes, Route } from "react-router-dom";

import AssessmentListPage from "./pages/AssessmentListPage";
import AssessmentPage from "./pages/AssessmentPage";

import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/assessments" element={<AssessmentListPage />} />
      <Route path="/assessment/:id" element={<AssessmentPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
