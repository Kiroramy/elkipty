import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdateAttendanceScreen from "./pages/UpdateAttendanceScreen";
import AddStudentScreen from "./pages/AddStudentScreen";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<AddStudentScreen />} />
          <Route path="/update" element={<UpdateAttendanceScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
