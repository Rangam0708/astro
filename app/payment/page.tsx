"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/animated-background"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarCheck } from "lucide-react"
import { addAppointmentToCalendar } from "@/lib/google-calendar"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "razorpay">("upi")
  const [upiId, setUpiId] = useState("")
  const [paymentError, setPaymentError] = useState("")

  // Get package info from URL params
  const packageId = searchParams?.get("package") || "premium"
  const price = searchParams?.get("price") || "999"
  const name = searchParams?.get("name") || ""
  const email = searchParams?.get("email") || ""
  const phone = searchParams?.get("phone") || ""
  const birthDate = searchParams?.get("birthDate") || ""
  const birthTime = searchParams?.get("birthTime") || ""
  const birthPlace = searchParams?.get("birthPlace") || ""
  const appointmentDate = searchParams?.get("appointmentDate") || ""
  const appointmentTime = searchParams?.get("appointmentTime") || ""
  const formattedAppointmentDate = searchParams?.get("formattedAppointmentDate") || ""

  const packageNames = {
    basic: "Basic Reading",
    premium: "Premium Reading",
    custom: "Consultation",
  }

  const packageName =
    packageId === "basic" ? packageNames.basic : packageId === "premium" ? packageNames.premium : packageNames.custom

  // Simulate Razorpay script loading
  useEffect(() => {
    // In a real app, you would load the Razorpay script here
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleRazorpayPayment = () => {
    setLoading(true)
    setPaymentError("")

    // Simulate Razorpay payment
    setTimeout(() => {
      // In a real app, you would create a Razorpay order and open the payment modal

      // Simulate successful payment
      const paymentId = `rzp_${Math.random().toString(36).substring(2, 10)}`

      // Process after successful payment
      processSuccessfulPayment(paymentId)
    }, 1000)
  }

  const handleUpiPayment = () => {
    setLoading(true)
    setPaymentError("")

    // Validate UPI ID
    if (!upiId || !upiId.includes("@")) {
      setPaymentError("Please enter a valid UPI ID (e.g., yourname@upi)")
      setLoading(false)
      return
    }

    // Simulate UPI payment
    setTimeout(() => {
      // Simulate successful payment
      const paymentId = `upi_${Math.random().toString(36).substring(2, 10)}`

      // Process after successful payment
      processSuccessfulPayment(paymentId)
    }, 1500)
  }

  const processSuccessfulPayment = async (paymentId: string) => {
    try {
      // 1. Add appointment to Google Calendar if it's a consultation
      if (packageId === "custom" && appointmentDate && appointmentTime) {
        await addAppointmentToCalendar({
          title: `Astrology Consultation with ${name}`,
          date: appointmentDate,
          time: appointmentTime,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          notes: `Birth Details: ${birthDate} ${birthTime || ""} at ${birthPlace}`,
        })
      }

      // 2. Send customer data to email
      const customerData = {
        name,
        email,
        phone,
        birthDate,
        birthTime,
        birthPlace,
        package: packageName,
        price,
        appointmentDate: formattedAppointmentDate || appointmentDate,
        appointmentTime,
        paymentId,
        orderDate: new Date().toISOString(),
      }

      // Send data directly to the API endpoint
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })

      if (!emailResponse.ok) {
        console.error("Failed to send email notification")
      }

      // Also update Google Sheet
      const sheetResponse = await fetch("/api/update-sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })

      if (!sheetResponse.ok) {
        console.error("Failed to update Google Sheet")
      }

      // 3. Redirect to thank you page
      router.push(`/thank-you?package=${packageId}&paymentId=${paymentId}`)
    } catch (error) {
      console.error("Error processing payment:", error)
      setPaymentError("An error occurred while processing your payment. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="mx-auto w-full max-w-md bg-white/20 backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Complete Your Payment</CardTitle>
            <CardDescription className="text-white/70">
              Your personalized astrology {packageId === "custom" ? "consultation" : "report"} is just one step away
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-6 rounded-lg bg-white/10 p-4 text-center">
              <p className="text-sm text-white/70">Total Amount</p>
              <p className="text-3xl font-bold text-white">₹{price}</p>
              <p className="text-xs text-white/70">{packageName}</p>

              {packageId === "custom" && appointmentDate && appointmentTime && (
                <div className="mt-3 rounded-md bg-white/10 p-3">
                  <div className="flex items-center justify-center gap-2">
                    <CalendarCheck className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm font-medium text-white">Appointment Details</p>
                  </div>
                  <p className="mt-1 text-sm text-white">
                    {formattedAppointmentDate || appointmentDate} at {appointmentTime}
                  </p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={paymentMethod === "upi" ? "default" : "outline"}
                  className={`flex items-center justify-center gap-2 ${
                    paymentMethod === "upi"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  <Image src="/placeholder.svg?height=24&width=24&text=UPI" alt="UPI" width={24} height={24} />
                  <span className="text-white">UPI Payment</span>
                </Button>
                <Button
                  variant={paymentMethod === "razorpay" ? "default" : "outline"}
                  className={`flex items-center justify-center gap-2 ${
                    paymentMethod === "razorpay"
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  onClick={() => setPaymentMethod("razorpay")}
                >
                  <Image
                    src="/placeholder.svg?height=24&width=24&text=Razorpay"
                    alt="Razorpay"
                    width={24}
                    height={24}
                  />
                  <span className="text-white">Razorpay</span>
                </Button>
              </div>
            </div>

            {paymentError && (
              <div className="mb-4 rounded-md bg-red-500/20 p-3 text-center text-white">{paymentError}</div>
            )}

            {paymentMethod === "upi" ? (
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center bg-white/10 p-2 hover:bg-white/20"
                  >
                    <Image src="/placeholder.svg?height=40&width=40" alt="GPay" width={40} height={40} />
                    <span className="mt-1 text-xs text-white">GPay</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center bg-white/10 p-2 hover:bg-white/20"
                  >
                    <Image src="/placeholder.svg?height=40&width=40" alt="PhonePe" width={40} height={40} />
                    <span className="mt-1 text-xs text-white">PhonePe</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center bg-white/10 p-2 hover:bg-white/20"
                  >
                    <Image src="/placeholder.svg?height=40&width=40" alt="Paytm" width={40} height={40} />
                    <span className="mt-1 text-xs text-white">Paytm</span>
                  </Button>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="upi-id" className="text-white">
                    UPI ID
                  </Label>
                  <Input
                    id="upi-id"
                    placeholder="yourname@upi"
                    className="bg-white/30 placeholder:text-white/50"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleUpiPayment}
                  disabled={loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  {loading ? "Processing..." : "Pay Now with UPI"}
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                <div className="rounded-lg bg-white/10 p-4">
                  <div className="flex justify-center">
                    <Image
                      src="/placeholder.svg?height=60&width=200&text=Razorpay"
                      alt="Razorpay"
                      width={200}
                      height={60}
                      className="h-12 object-contain"
                    />
                  </div>
                  <p className="mt-2 text-center text-sm text-white/70">Secure payments powered by Razorpay</p>
                </div>

                <Button
                  onClick={handleRazorpayPayment}
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  {loading ? "Processing..." : "Pay ₹" + price + " with Razorpay"}
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <Image src="/placeholder.svg?height=20&width=20" alt="Secure" width={20} height={20} />
              <p className="text-xs text-white/70">Secure Payment</p>
            </div>
            <p className="text-xs text-white/70">By proceeding, you agree to our Terms of Service and Privacy Policy</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

