import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { AuthProvider } from "./auth/useAuth";
import Conflict from "./pages/Conflict";
import NotFound from "./components/common/NotFound";
import Region from "./pages/Location";

const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/:conflict" element={<Conflict />} />
      <Route path="/l/:location" element={<Region />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/not-found" element={<NotFound />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default App;
