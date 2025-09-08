import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Team from "./components/Team";
import Build from "./components/Into-the-Deep/Build";
import Code from "./components/Into-the-Deep/Code";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/build/into-the-deep" element={<Build />} />
        <Route path="/code/into-the-deep" element={<Code />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
