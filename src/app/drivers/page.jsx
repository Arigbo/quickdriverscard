"use client";
import { useContext } from "react";
import { DashboardContext } from "./components/context";
export default function Drivers() {
  const { user } = useContext(DashboardContext);
  return (
    <>
      <h1>
        {user.map((item) => {
          return (
            <div key={item.id}>
              <h1>{item.name}</h1>
            </div>
          );
        })}
      </h1>
    </>
  );
}
