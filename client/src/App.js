import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogReg from "./views/LogReg";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LogReg />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
