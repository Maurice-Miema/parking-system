import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import Vehicule from "./pages/Vehicule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique : Login */}
        <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />

        {/* Routes du dashboard */}
        <Route path="/*" element={<MainLayout />}>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Vehicule" element={<Vehicule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;