"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, AlertTriangle, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const baseMultipliers = {
  today: 1,
  "3days": 3,
  "7days": 7,
  "1month": 30,
  "3months": 90,
}

export default function SmartInsights() {
  const [timeFilter, setTimeFilter] = useState("today")
  const [expandedInsights, setExpandedInsights] = useState<number[]>([])

  const getMetricsForTimeFilter = (filter: string) => {
    const multiplier = baseMultipliers[filter as keyof typeof baseMultipliers] || 1
    return {
      systemTotals: [
        { title: "Received", value: (52000 * multiplier).toLocaleString(), change: "+2.3%", trend: "up" as const },
        { title: "Filled", value: (48500 * multiplier).toLocaleString(), change: "+1.8%", trend: "up" as const },
        {
          title: "PV (Pharmacist Verification)",
          value: (45200 * multiplier).toLocaleString(),
          change: "+1.2%",
          trend: "up" as const,
        },
        { title: "Packed", value: (44800 * multiplier).toLocaleString(), change: "+0.9%", trend: "up" as const },
        { title: "Sorted", value: (47900 * multiplier).toLocaleString(), change: "+1.5%", trend: "up" as const },
        { title: "Completed", value: (4850 * multiplier).toLocaleString(), change: "+3.1%", trend: "up" as const },
        { title: "Cancelled", value: (1200 * multiplier).toLocaleString(), change: "-0.5%", trend: "down" as const },
        { title: "Shipping Totes", value: (4800 * multiplier).toLocaleString(), change: "+2.1%", trend: "up" as const },
        {
          title: "Manifested Totes",
          value: (4650 * multiplier).toLocaleString(),
          change: "+1.9%",
          trend: "up" as const,
        },
        { title: "On Hold", value: (850 * multiplier).toLocaleString(), change: "-1.2%", trend: "down" as const },
        {
          title: "Total Scripts in System",
          value: (65000 * multiplier).toLocaleString(),
          change: "+4.2%",
          trend: "up" as const,
        },
        { title: "Total Alarms", value: "3", change: "-0.8%", trend: "down" as const },
      ],
      processingTimes: [
        { title: "Average Fill Time", value: "42 min", change: "+1.2%", trend: "up" as const },
        { title: "Average PV Time", value: "5.3 min", change: "-0.5%", trend: "down" as const },
        { title: "Average Pack Time", value: "15 min", change: "+0.8%", trend: "up" as const },
        { title: "Average Sort Time", value: "8 min", change: "-1.1%", trend: "down" as const },
        { title: "Total Processing Time", value: "70.3 min", change: "+0.4%", trend: "up" as const },
        { title: "Queue Wait Time", value: "12 min", change: "+2.1%", trend: "up" as const },
      ],
    }
  }

  const metrics = getMetricsForTimeFilter(timeFilter)

  const systemOverviewData = [
    { name: "Received", value: 52000, fill: "#3b82f6" },
    { name: "Filled", value: 48500, fill: "#10b981" },
    { name: "PV", value: 45200, fill: "#f59e0b" },
    { name: "Packed", value: 44800, fill: "#8b5cf6" },
    { name: "Completed", value: 4850, fill: "#06b6d4" },
  ]

  const processingTimeData = [
    { name: "Sort", time: 3, fill: "#3b82f6" },
    { name: "Pack", time: 2, fill: "#10b981" },
    { name: "PV", time: 1.5, fill: "#f59e0b" },
    { name: "Fill", time: 0.5, fill: "#8b5cf6" },
  ]

  const insights = [
    {
      title: "PV Time Performance Issue",
      description:
        "Your average PV time is 1.5x that of other central fill locations. We note that you have less Pharmacists on staff on a per-prescription basis than other Central Fill locations. This may indicate you need to hire another Pharmacist.",
      severity: "warning" as const,
    },
    {
      title: "LVD 1 Hopper Optimization",
      description:
        "We noted that your hopper arrangement in your LVD 1 is causing significant additional time to fill prescriptions. If you arrange your hoppers in this order, you could increase your fill rate by 3x: \nMetformin in Hopper 1 \nLisinopril in Hopper 2 \nAmlodipine in Hopper 3 \nOmeprazole in Hopper 4 \nMetoprolol in Hopper 5",
      severity: "info" as const,
    },
  ]

  const toggleInsight = (index: number) => {
    setExpandedInsights((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="space-y-6">
      {/* Needs Attention Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Needs Attention
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="border rounded-lg">
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto"
                onClick={() => toggleInsight(index)}
              >
                <div className="flex items-center gap-3">
                  <AlertCircle
                    className={`h-4 w-4 ${insight.severity === "warning" ? "text-amber-500" : "text-blue-500"}`}
                  />
                  <span className="font-medium text-left">{insight.title}</span>
                </div>
                {expandedInsights.includes(index) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
              {expandedInsights.includes(index) && (
                <div className="px-4 pb-4 text-sm text-muted-foreground whitespace-pre-line">{insight.description}</div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Time Filter */}
      <div className="flex gap-2 mb-6">
        {Object.keys(baseMultipliers).map((filter) => (
          <Button
            key={filter}
            variant={timeFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeFilter(filter)}
          >
            {filter === "today"
              ? "Today"
              : filter === "3days"
                ? "Last 3 Days"
                : filter === "7days"
                  ? "Last 7 Days"
                  : filter === "1month"
                    ? "1 Month"
                    : "3 Months"}
          </Button>
        ))}
      </div>

      {/* System Totals Grid */}
      <div className="grid grid-cols-6 gap-4">
        {metrics.systemTotals.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.title}</p>
              <div
                className={`text-xs flex items-center gap-1 ${
                  metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"
                }`}
              >
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : metric.trend === "down" ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Processing Times Grid */}
      <div className="grid grid-cols-6 gap-4">
        {metrics.processingTimes.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.title}</p>
              <div
                className={`text-xs flex items-center gap-1 ${
                  metric.trend === "up" ? "text-green-600" : metric.trend === "down" ? "text-red-600" : "text-gray-600"
                }`}
              >
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : metric.trend === "down" ? (
                  <TrendingDown className="h-3 w-3" />
                ) : null}
                {metric.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={systemOverviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Times (minutes)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="time" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
