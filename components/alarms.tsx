"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const equipmentTypes = ["Collator", "LVD", "ScriptPick", "Dispenser", "Manual Pack", "FlexSort"]

const generateAlarms = () => {
  const alarms = []
  const categories = ["LVD", "Flexbed", "Manual Pack", "Script pick", "Collator", "Dispenser"]

  categories.forEach((category, index) => {
    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      alarms.push({
        id: `ALM-${String(index * 10 + i + 1).padStart(3, "0")}`,
        category,
        type: "Low fill alert",
        primarySensor: "CV",
        status: Math.random() > 0.3 ? "Active" : "Inactive",
        severity: Math.random() > 0.5 ? "Critical" : "Warning",
        assetType: equipmentTypes[Math.floor(Math.random() * equipmentTypes.length)],
        lastAlarmTime: new Date(Date.now() - Math.random() * 86400000).toLocaleString(),
        participatingSensors: Math.floor(Math.random() * 5) + 1,
      })
    }
  })

  return alarms
}

export default function Alarms() {
  const alarms = generateAlarms()
  const activeAlarms = alarms.filter((alarm) => alarm.status === "Active")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{activeAlarms.length}</div>
            <p className="text-sm text-muted-foreground">Active Alarms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{alarms.length}</div>
            <p className="text-sm text-muted-foreground">Total Alarms</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-amber-600">
              {alarms.filter((a) => a.severity === "Critical").length}
            </div>
            <p className="text-sm text-muted-foreground">Critical</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {alarms.filter((a) => a.severity === "Warning").length}
            </div>
            <p className="text-sm text-muted-foreground">Warnings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alarm Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alarm ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Asset Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Alarm Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alarms.map((alarm) => (
                <TableRow key={alarm.id}>
                  <TableCell className="font-mono">{alarm.id}</TableCell>
                  <TableCell>{alarm.category}</TableCell>
                  <TableCell>{alarm.type}</TableCell>
                  <TableCell>{alarm.assetType}</TableCell>
                  <TableCell>
                    <Badge variant={alarm.severity === "Critical" ? "destructive" : "secondary"}>
                      {alarm.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={alarm.status === "Active" ? "destructive" : "secondary"}>{alarm.status}</Badge>
                  </TableCell>
                  <TableCell>{alarm.lastAlarmTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
