"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const equipmentTypes = ["Collator", "LVD", "ScriptPick", "Dispenser", "Manual Pack", "FlexSort"]

const generateTelemetryData = () => {
  const data = []
  for (let i = 0; i < 24; i++) {
    const hour = i
    const baseValue = Math.random() * 100 + 50
    data.push({
      time: `${hour.toString().padStart(2, "0")}:00`,
      Collator: Math.random() > 0.9 ? 0 : baseValue + Math.random() * 20,
      LVD: Math.random() > 0.85 ? 0 : baseValue + Math.random() * 30,
      ScriptPick: Math.random() > 0.95 ? 0 : baseValue + Math.random() * 25,
      Dispenser: baseValue + Math.random() * 15,
      "Manual Pack": baseValue + Math.random() * 10,
    })
  }
  return data
}

const generateSensorData = () => {
  const sensors = []
  const sensorTypes = [
    "Conveyor Velocity",
    "Blocked Detection",
    "Power Status",
    "Temperature",
    "Vibration",
    "Fill Level",
  ]

  equipmentTypes.slice(0, 10).forEach((equipment, index) => {
    const sensorType = sensorTypes[Math.floor(Math.random() * sensorTypes.length)]
    sensors.push({
      sensorId: `SEN-${String(index + 1).padStart(3, "0")}`,
      location: equipment,
      sensorName: sensorType,
      status: Math.random() > 0.2 ? "Online" : "Offline",
      lastUpdate: new Date(Date.now() - Math.random() * 3600000).toLocaleString(),
    })
  })

  return sensors
}

export default function Telemetry() {
  const telemetryData = generateTelemetryData()
  const sensorData = generateSensorData()
  const activeAlarmsCount = 3

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{activeAlarmsCount}</div>
            <p className="text-sm text-muted-foreground">Active Alarms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-sm text-muted-foreground">Overall Throughput</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm text-muted-foreground">Equipment Online</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Equipment Offline</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Equipment Throughput (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Line type="monotone" dataKey="Collator" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="LVD" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="ScriptPick" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="Dispenser" stroke="#8b5cf6" strokeWidth={2} />
                <Line type="monotone" dataKey="Manual Pack" stroke="#06b6d4" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Sensors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sensor ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Sensor Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sensorData.map((sensor) => (
                <TableRow key={sensor.sensorId}>
                  <TableCell className="font-mono">{sensor.sensorId}</TableCell>
                  <TableCell>{sensor.location}</TableCell>
                  <TableCell>{sensor.sensorName}</TableCell>
                  <TableCell>
                    <Badge variant={sensor.status === "Online" ? "default" : "destructive"}>{sensor.status}</Badge>
                  </TableCell>
                  <TableCell>{sensor.lastUpdate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
