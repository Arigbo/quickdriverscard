"use client";
import { useState } from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import { DashboardContext } from "./components/context";
export default function Layout({ children }) {
  const [user, setUser] = useState([
    { id: 1, name: "Jesse", car: "Camry", carNumber: "111gttt" },
    { id: 2, name: "Jesse", car: "Camry", carNumber: "111gttt" },
    { id: 3, name: "Jesse", car: "Camry", carNumber: "111gttt" },
    { id: 4, name: "Jesse", car: "Camry", carNumber: "111gttt" },
  ]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <>
        <Header></Header>
        {children}
        <Footer></Footer>
      </>
    </DashboardContext.Provider>
  );
}
