// src/components/RootLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout = () => {
  return (
    <>
      <Header />

      {/* Main Page Content injection window */}
      <main className="has-fixed-header">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
