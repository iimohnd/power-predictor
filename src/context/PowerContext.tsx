"use client";
import { createContext, useContext, useState } from "react";

const PowerContext = createContext();

export function PowerProvider({ children }) {
  const [formData, setFormData] = useState({
    personCount: 1,
    selectedCity: "",
    selectedMonth: "",
    lastBill: "",
    devices: [],
  });

  return (
    <PowerContext.Provider value={{ formData, setFormData }}>
      {children}
    </PowerContext.Provider>
  );
}

export function usePower() {
  return useContext(PowerContext);
}
