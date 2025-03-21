"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface SessionPackage {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  popular?: boolean
}

interface SessionPackagesProps {
  packages: SessionPackage[]
  onSelectPackage: (packageId: string, price: number) => void
}

export function SessionPackages({ packages, onSelectPackage }: SessionPackagesProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {packages.map((pkg) => (
        <Card
          key={pkg.id}
          className={`relative overflow-hidden backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 ${
            pkg.popular ? "border-2 border-emerald-400 bg-white/20" : "bg-white/10"
          }`}
        >
          {pkg.popular && (
            <div className="absolute right-0 top-0 bg-emerald-500 px-3 py-1 text-xs font-medium text-white">
              Popular
            </div>
          )}

          <CardHeader>
            <CardTitle className="text-xl text-white">{pkg.name}</CardTitle>
            <CardDescription className="text-white/70">{pkg.description}</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="text-center">
              <span className="text-3xl font-bold text-white">₹{pkg.price}</span>
              {pkg.id !== "custom" && <span className="text-sm text-white/70"> one-time</span>}
            </div>

            <ul className="grid gap-2">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-white">
                  <Check className="h-4 w-4 text-emerald-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <Button
              className={`w-full ${
                pkg.popular
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  : "bg-white/20 hover:bg-white/30"
              }`}
              onClick={() => onSelectPackage(pkg.id, pkg.price)}
            >
              Select Package
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

