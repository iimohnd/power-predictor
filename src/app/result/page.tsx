"use client";
import { usePower } from "@/context/PowerContext";
import { Card, CardContent } from "@/components/ui/card";

interface Device {
  name: string;
  hours: string;
  quantity: string;
  customName?: string;
  watts?: string;
}

const RATE_TIERS = [
  { limit: 4000, rate: 0.014 },
  { limit: 6000, rate: 0.018 },
  { limit: Infinity, rate: 0.032 },
];

function calculateConsumption(devices: Device[]): number {
  let totalKw = 0;
  devices.forEach((device) => {
    const watts = parseFloat(device.watts ?? "0") || 1000;
    const hours = parseFloat(device.hours) || 0;
    const qty = parseInt(device.quantity) || 1;
    const dailyKw = (watts / 1000) * hours * qty;
    totalKw += dailyKw * 30;
  });
  return totalKw * 0.7;
}

function calculateBill(kw: number): number {
  let remaining = kw;
  let cost = 0;
  for (const tier of RATE_TIERS) {
    const used = Math.min(tier.limit, remaining);
    cost += used * tier.rate;
    remaining -= used;
    if (remaining <= 0) break;
  }
  return cost;
}

export default function ResultPage() {
  const { formData } = usePower();
  const { personCount, selectedCity, selectedMonth, devices } = formData;

  const estimatedKw = calculateConsumption(devices);
  const estimatedCost = calculateBill(estimatedKw);

  return (
    <div className="min-h-screen bill-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-xl">
          <CardContent className="p-8 space-y-4">
            <h1 className="text-3xl font-bold text-indigo-800">🔍 Estimated Power Usage</h1>
            <p className="text-lg">City: <strong>{selectedCity}</strong></p>
            <p className="text-lg">Month: <strong>{selectedMonth}</strong></p>
            <p className="text-lg">People in home: <strong>{personCount}</strong></p>
            <p className="text-lg">Estimated Usage: <strong>{estimatedKw.toFixed(2)} kWh</strong></p>
            <p className="text-lg">Estimated Bill: <strong>{estimatedCost.toFixed(2)} OMR</strong></p>
            <p className="text-sm text-gray-600 italic">Note: Accuracy improves as you provide more real data monthly.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
