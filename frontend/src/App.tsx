import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavbarSite from "./Components/NavbarSite/NavbarSite";
import RegisterUser from "./Components/RegisterUser/RegisterUser";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarSite />
        <Routes>
            {/* <Route path="/prueba_tecnica" element={<Profile />} /> */}
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
