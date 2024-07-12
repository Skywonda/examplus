
import { Route, Routes } from "react-router-dom";
import Home from "./home";
import "./index.css";
import ExamQuestions from "./exam/questions";
import Login from "./auth/login";
import Register from "./auth/signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/exam/questions" element={<ExamQuestions />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Routes>
    </>
  );
}


export default App;
