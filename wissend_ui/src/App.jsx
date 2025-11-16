import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./pages/Components/Task";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


function App() {
  return (
    <BrowserRouter>
      <div className="font-sans">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/task" element={<Task />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
