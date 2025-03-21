"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedBackground } from "@/components/animated-background"

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "Test Customer",
    email: "rangam03@gmail.com", // Your email address
    phone: "+919876543210",
    birthDate: "1990-01-01",
    birthTime: "12:00",
    birthPlace: "New Delhi, India",
    package: "Premium Reading",
    price: "999",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTestEmail = async () => {
    setLoading(true)
    setResult(null)

    try {
      // Send a test email with the form data
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          paymentId: "test_payment_" + Math.random().toString(36).substring(2, 10),
          orderDate: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      setResult({
        success: data.success,
        message: data.message || "Email test completed",
      })
    } catch (error) {
      console.error("Error testing email:", error)
      setResult({
        success: false,
        message: "An error occurred while testing the email service",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTestSheet = async () => {
    setLoading(true)
    setResult(null)

    try {
      // Send a test update to Google Sheets with the form data
      const response = await fetch("/api/update-sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          paymentId: "test_payment_" + Math.random().toString(36).substring(2, 10),
          orderDate: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      setResult({
        success: data.success,
        message: data.message || "Google Sheet test completed",
      })
    } catch (error) {
      console.error("Error testing Google Sheet:", error)
      setResult({
        success: false,
        message: "An error occurred while testing the Google Sheet service",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="mx-auto w-full max-w-md bg-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Test Email & Google Sheet</CardTitle>
            <CardDescription className="text-white/70">
              Send a test email to rangam03@gmail.com and update a test Google Sheet
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-white">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/30 text-white placeholder:text-white/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">
                Your Email (for testing)
              </Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-white/30 text-white placeholder:text-white/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-white">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white/30 text-white placeholder:text-white/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="package" className="text-white">
                Package
              </Label>
              <Input
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="bg-white/30 text-white placeholder:text-white/50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price" className="text-white">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="bg-white/30 text-white placeholder:text-white/50"
              />
            </div>

            {result && (
              <div className={`rounded-md p-3 ${result.success ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
                <p className="text-white">{result.message}</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="grid w-full grid-cols-2 gap-4">
              <Button
                onClick={handleTestEmail}
                disabled={loading}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                {loading ? "Testing..." : "Test Email"}
              </Button>

              <Button
                onClick={handleTestSheet}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {loading ? "Testing..." : "Test Sheet"}
              </Button>
            </div>

            <p className="text-center text-sm text-white/70">
              This page is for testing purposes only. Check the console for detailed logs.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

