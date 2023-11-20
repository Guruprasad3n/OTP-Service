import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import { Routes, Route } from "react-router-dom";
import Verify from "./Components/Verify";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
