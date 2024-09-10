import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { AuthProvider } from "./auth/useAuth";
import ConflictScreen from "./pages/ConflictScreen";
import NotFound from "./components/common/NotFound";
import CountryScreen from "./pages/CountryScreen";
import EarthScreen from "./pages/EarthScreen";

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/:conflict" element={<ConflictScreen />} />
      <Route path="/l" element={<EarthScreen />} />
      <Route path="/l/:countryCode" element={<CountryScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default App;
