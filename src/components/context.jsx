"use client";
import { createContext } from "react";

export const DashboardContext = createContext({
  user: [],
  setUser: () => {},
});
