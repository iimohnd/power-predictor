// React + Tailwind - واجهة احترافية منظمة وجذابة
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { usePower } from "@/context/PowerContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const cities = ["Muscat", "Salalah", "Nizwa", "Sohar", "Sur", "Bahla", "Ibri", "Rustaq"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const fullDeviceList = [
  "Air Conditioner", "Fridge", "LED TV", "Washing Machine", "Microwave", "Laptop", "Water Heater",
  "Ceiling Fan", "Electric Kettle", "Toaster", "Iron", "Vacuum Cleaner", "Dishwasher", "Desktop PC",
  "Smartphone Charger", "Tablet", "Smart TV", "Projector", "Gaming Console", "Oven", "Hair Dryer",
  "Freezer", "Router", "WiFi Extender", "Electric Blanket", "Fan Heater", "Bread Maker", "Rice Cooker",
  "Food Processor", "Electric Grill", "Clothes Dryer", "Air Purifier", "Humidifier", "Dehumidifier",
  "Water Dispenser", "Coffee Machine", "Smart Speaker", "Printer", "Scanner", "Electric Shaver",
  "Electric Toothbrush", "Electric Mower", "Electric Pressure Cooker", "Slow Cooker", "Soundbar",
  "Set Top Box", "Monitor", "External Hard Drive", "Smart Light", "Cordless Drill", "Mixer",
  "Hair Straightener", "Gaming PC", "Bluetooth Speaker", "Clock Radio", "Garage Door Opener",
  "EV Charger", "Jacuzzi", "Electric Stove", "Radiator Heater", "Other"
];

export default function DeviceInputForm() {
  const router = useRouter();
  const { formData, setFormData } = usePower();

  const [devices, setDevices] = useState([]);
  const [personCount, setPersonCount] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [lastBill, setLastBill] = useState("");
  const [search, setSearch] = useState("");
  const [newDevice, setNewDevice] = useState({ name: "", hours: "", quantity: "", customName: "", watts: "" });

  const addDevice = () => {
    if (newDevice.name && newDevice.hours && newDevice.quantity) {
      const deviceToAdd = {
        ...newDevice,
        name: newDevice.name === "Other" && newDevice.customName ? newDevice.customName : newDevice.name,
      };
      setDevices([...devices, deviceToAdd]);
      setNewDevice({ name: "", hours: "", quantity: "", customName: "", watts: "" });
    }
  };

  const removeDevice = (index) => {
    setDevices(devices.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const newEntry = {
      personCount,
      selectedCity,
      selectedMonth,
      lastBill,
      devices,
    };

    console.log("✅ Saved entry:", newEntry);
    alert("✅ تم حفظ السجل في جهازك!");

    setFormData(newEntry);

    const history = JSON.parse(localStorage.getItem("energy_history") || "[]");
    history.push(newEntry);
    localStorage.setItem("energy_history", JSON.stringify(history));

    router.push("/result");
  };

  const filteredDevices = fullDeviceList.filter((dev) =>
    dev.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* General Info */}
        <Card className="shadow-xl border border-indigo-200">
          <CardContent className="space-y-6 p-8">
            <h2 className="text-3xl font-semibold text-indigo-800 flex items-center gap-2">
              🏠 Home Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of People</label>
                <Input
                  type="number"
                  value={personCount}
                  onChange={(e) => setPersonCount(Number(e.target.value))}
                  placeholder="e.g. 4"
                  min={1}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <Select onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Devices Section */}
        <Card className="shadow-xl border border-indigo-200">
          <CardContent className="space-y-6 p-8">
            <h2 className="text-3xl font-semibold text-indigo-800 flex items-center gap-2">
              🔌 Devices
            </h2>
            <div className="space-y-2">
              <Input
                placeholder="Search for a device..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device</label>
                  <Select onValueChange={(val) => setNewDevice({ ...newDevice, name: val })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select device" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                      {filteredDevices.map((device) => (
                        <SelectItem key={device} value={device}>{device}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours / Day</label>
                  <Input
                    type="number"
                    placeholder="e.g. 6"
                    value={newDevice.hours}
                    onChange={(e) => setNewDevice({ ...newDevice, hours: e.target.value })}
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <Input
                    type="number"
                    placeholder="e.g. 2"
                    value={newDevice.quantity}
                    onChange={(e) => setNewDevice({ ...newDevice, quantity: e.target.value })}
                    min={1}
                  />
                </div>
              </div>
              {newDevice.name === "Other" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custom Device Name</label>
                    <Input
                      type="text"
                      placeholder="e.g. Water Pump"
                      value={newDevice.customName}
                      onChange={(e) => setNewDevice({ ...newDevice, customName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">(Optional) Watts</label>
                    <Input
                      type="number"
                      placeholder="e.g. 1200"
                      value={newDevice.watts}
                      onChange={(e) => setNewDevice({ ...newDevice, watts: e.target.value })}
                      min={0}
                    />
                  </div>
                </div>
              )}
              <div>
                <Button className="mt-4" onClick={addDevice}>+ Add Device</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {devices.map((dev, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center border border-gray-200 p-4 rounded-xl bg-white shadow-sm"
                >
                  <span className="text-gray-800 text-sm">
                    {dev.quantity} × {dev.name} — {dev.hours}h/day
                  </span>
                  <Button variant="destructive" onClick={() => removeDevice(idx)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bill Section */}
        <Card className="shadow-xl border border-indigo-200">
          <CardContent className="space-y-6 p-8">
            <h2 className="text-3xl font-semibold text-indigo-800 flex items-center gap-2">
              💵 Last Month's Bill
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount (OMR)</label>
                <Input
                  type="number"
                  value={lastBill}
                  onChange={(e) => setLastBill(e.target.value)}
                  placeholder="e.g. 32.5"
                  min={0}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                <Select onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="mt-4" onClick={handleSubmit}>🔍 Predict Next Bill</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
