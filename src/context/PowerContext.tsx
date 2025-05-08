"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 👇 نحدد نوع البيانات اللي بنخزنها
interface Device {
  name: string;
  hours: string;
  quantity: string;
  customName?: string;
  watts?: string;
}

interface FormDataType {
  personCount: number;
  selectedCity: string;
  selectedMonth: string;
  lastBill: string;
  devices: Device[];
}

interface PowerContextType {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

// 👇 نحدد النوع بشكل صريح
const PowerContext = createContext<PowerContextType | undefined>(undefined);

export function PowerProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormDataType>({
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
  const context = useContext(PowerContext);
  if (!context) throw new Error("usePower must be used within a PowerProvider");
  return context;
}
