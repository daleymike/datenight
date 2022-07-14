import "./App.css";
import {useState} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogReg from "./views/LogReg";
import Dashboard from "./components/Dashboard";
import DateReview from "./components/DateReview";
import EditDate from "./components/EditDate";
import Protected from "./components/Protected";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [protectedError, setProtectedError] = useState("");



  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LogReg setUserEmail={setUserEmail} setIsLoggedIn={setIsLoggedIn} setProtectedError={setProtectedError} protectedError={protectedError}/>} />
          <Route path="/dashboard" element={<Protected isLoggedIn={isLoggedIn} setProtectedError={setProtectedError}><Dashboard userEmail={userEmail} user={user} setUser={setUser}  /> </Protected>} />
          <Route path="/dates/:_id" element={<Protected setProtectedError={setProtectedError} isLoggedIn={isLoggedIn}><DateReview userEmail={userEmail} user={user}/></Protected>} />
          <Route path="/dates/:_id/edit" element={<Protected setProtectedError={setProtectedError} isLoggedIn={isLoggedIn}><EditDate /></Protected>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
