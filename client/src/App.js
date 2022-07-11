import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogReg from "./views/LogReg";
import Dashboard from "./components/Dashboard";
import DateReview from "./components/DateReview";
import EditDate from "./components/EditDate";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LogReg />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dates/:_id" element={<DateReview />} />
          <Route path="/dates/:_id/edit" element={<EditDate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
