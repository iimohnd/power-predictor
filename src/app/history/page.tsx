// app/history/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("energy_history") || "[]");
    setHistory(data);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-indigo-800">📜 History of Your Inputs</h1>
        {history.length === 0 ? (
          <p className="text-gray-600">No records found yet.</p>
        ) : (
          history.map((entry: any, index) => (
            <Card key={index} className="shadow border border-gray-200">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold">Entry #{index + 1}</h2>
                <p><strong>City:</strong> {entry.selectedCity}</p>
                <p><strong>Month:</strong> {entry.selectedMonth}</p>
                <p><strong>People:</strong> {entry.personCount}</p>
                <p><strong>Bill:</strong> {entry.lastBill} OMR</p>
                <p><strong>Devices:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  {entry.devices.map((dev: any, i: number) => (
                    <li key={i}>
                      <strong>{dev.quantity}× {dev.name}</strong>
                      {dev.hours && ` – ${dev.hours} h/day`}
                      {dev.watts && ` – ${dev.watts} watts`}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
