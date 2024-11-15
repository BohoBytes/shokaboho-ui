import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthScreen from "./pages/AuthScreen";
import { AuthProvider } from "./components/auth/useAuth";
import ConflictScreen from "./pages/ConflictScreen";
import NotFound from "./components/common/NotFound";
import CountryScreen from "./pages/CountryScreen";
import EarthScreen from "./pages/EarthScreen";
import ContinentScreen from "./pages/ContinentScreen";

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/:conflict" element={<ConflictScreen />} />
      <Route path="/w" element={<EarthScreen />} />
      <Route path="/w/:continentCode" element={<ContinentScreen />} />
      <Route path="/w/c/:countryCode" element={<CountryScreen />} />
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default App;
