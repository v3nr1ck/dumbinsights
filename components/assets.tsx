"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const equipmentTypes = ["Collator", "LVD", "ScriptPick", "Dispenser", "Manual Pack"]

const brands = [
  "McKesson",
  "Omnicell",
  "Arxium",
  "RxSafe",
  "Tension Packaging",
  "Parata",
  "Providen Logistics",
  "ScriptPro",
]

const generateAssets = () => {
  const assets = []
  let siNo = 1

  equipmentTypes.forEach((equipmentType) => {
    const count = Math.floor(Math.random() * 20) + 15 // 15-35 units per type
    for (let i = 0; i < count; i++) {
      const brand = brands[Math.floor(Math.random() * brands.length)]
      const modelSuffix = Math.random().toString(36).substring(2, 8).toUpperCase()
      const tagId = `${equipmentType.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`

      assets.push({
        siNo: siNo++,
        brand,
        model: `${brand}-${modelSuffix}`,
        tagId,
        locationId: "3971",
      })
    }
  })

  return assets.slice(0, 87) // Limit to 87 items
}

export default function Assets() {
  const assets = generateAssets()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assets ({assets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SI No.</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Model#</TableHead>
                <TableHead>Tag ID</TableHead>
                <TableHead>Location ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset) => (
                <TableRow key={asset.siNo}>
                  <TableCell>{asset.siNo}</TableCell>
                  <TableCell>{asset.brand}</TableCell>
                  <TableCell>{asset.model}</TableCell>
                  <TableCell className="font-mono">{asset.tagId}</TableCell>
                  <TableCell>{asset.locationId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
