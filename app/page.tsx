"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import SmartInsights from "@/components/smart-insights"
import Alarms from "@/components/alarms"
import Telemetry from "@/components/telemetry"
import Assets from "@/components/assets"

const equipmentTypes = [
  "Collator",
  "Collator Controller",
  "Crosscheck",
  "Dispenser",
  "Flexbed",
  "FlexSort",
  "LVD",
  "LVM Controller",
  "Manual Pack",
  "Package Sortation",
  "PackageSorter",
  "ScriptPick",
  "ScriptPick Channel",
  "ScriptPick Controller Service",
  "ScriptPick Service",
  "Sprint",
  "Unilabel",
]

export default function PerformanceDashboard() {
  const [activeTab, setActiveTab] = useState("Smart Insights")
  const [selectedView, setSelectedView] = useState("Temperature")

  // Generate sample active alarms count
  const activeAlarmsCount = 3

  const renderContent = () => {
    switch (activeTab) {
      case "Smart Insights":
        return <SmartInsights />
      case "Alarms":
        return <Alarms />
      case "Telemetry":
        return <Telemetry />
      case "Assets":
        return <Assets />
      case "2D Layout":
        return (
          <Card>
            <CardHeader>
              <CardTitle>2D Store Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src="/2d-warehouse-floor-plan-layout-with-equipment-stat.jpg"
                  alt="2D Store Layout"
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>
        )
      case "3D Digital Twin":
        return (
          <Card>
            <CardHeader>
              <CardTitle>3D Digital Twin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* View Selection Buttons */}
                <div className="flex gap-2">
                  {["Temperature", "Flexbed", "LVD"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setSelectedView(view)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedView === view ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>

                {/* Image Display */}
                <div className="relative w-full h-[600px] bg-gray-50 rounded-lg overflow-hidden">
                  {selectedView === "Temperature" && (
                    <img
                      src="/temperature-view.png"
                      alt="Temperature View - 3D Digital Twin"
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={() => setSelectedView("Flexbed")}
                    />
                  )}
                  {selectedView === "Flexbed" && (
                    <img
                      src="/flexbed-view.png"
                      alt="Flexbed View - 3D Digital Twin"
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={() => setSelectedView("LVD")}
                    />
                  )}
                  {selectedView === "LVD" && (
                    <img
                      src="/lvd-view.png"
                      alt="LVD View - 3D Digital Twin"
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={() => setSelectedView("Temperature")}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case "Location Info":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Facility Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Location Details</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Store ID:</span> 3971
                        </div>
                        <div>
                          <span className="font-medium">Name:</span> HW Central Fill
                        </div>
                        <div>
                          <span className="font-medium">Address:</span> 554 Portier St, Orlando, FL 32812
                        </div>
                        <div>
                          <span className="font-medium">Region:</span> 31A
                        </div>
                        <div>
                          <span className="font-medium">F3 Market:</span> 321
                        </div>
                        <div>
                          <span className="font-medium">F5 Sub Market:</span> 321.8
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Operational Status</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Status:</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Operating</span>
                        </div>
                        <div>
                          <span className="font-medium">Facility Type:</span> Central Fill Pharmacy
                        </div>
                        <div>
                          <span className="font-medium">Operating Hours:</span> 24/7
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Equipment Overview</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Total Equipment:</span> {equipmentTypes.length} Types
                        </div>
                        <div>
                          <span className="font-medium">Active Systems:</span> 47
                        </div>
                        <div>
                          <span className="font-medium">Maintenance Status:</span> Up to Date
                        </div>
                        <div>
                          <span className="font-medium">Last Inspection:</span> 2024-01-15
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Performance Metrics</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Daily Capacity:</span> 15,000 prescriptions
                        </div>
                        <div>
                          <span className="font-medium">Current Utilization:</span> 78%
                        </div>
                        <div>
                          <span className="font-medium">Efficiency Rating:</span> 94.2%
                        </div>
                        <div>
                          <span className="font-medium">Uptime:</span> 99.1%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Content for {activeTab} will be implemented here.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="https://brandcenter.walmart.com/content/dam/brand/home/brand-identity/spark/spark-yellow-on-blue.png"
                  alt="Walmart Spark Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-semibold">Home</span>
            </div>
            <div className="text-sm text-muted-foreground">3971</div>
          </div>
        </div>
      </div>

      {/* Location Info */}
      <div className="bg-white border-b px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Operating</span>
          <span className="font-medium">3971</span> - HW Central Fill - 554 Portier St, Orlando, FL 32812
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b px-6">
        <div className="flex gap-6">
          {[
            "Smart Insights",
            "Work Orders",
            "Alarms",
            "Telemetry",
            "2D Layout",
            "Assets",
            "Location Info",
            "3D Digital Twin",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab === "Smart Insights" && activeAlarmsCount > 0 && (
                <div className="flex items-center gap-2">
                  <span>{tab}</span>
                  <div
                    className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs cursor-pointer hover:bg-red-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveTab("Alarms")
                    }}
                  >
                    <AlertTriangle className="h-3 w-3" />
                    <span>Alarms {activeAlarmsCount}</span>
                  </div>
                </div>
              )}
              {tab !== "Smart Insights" && tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">{renderContent()}</div>
    </div>
  )
}
