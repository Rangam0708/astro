"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, CalendarCheck, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/animated-background"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const packageId = searchParams?.get("package") || ""
  const paymentId = searchParams?.get("paymentId") || ""

  // In a real app, you would verify the payment status here
  useEffect(() => {
    // This would be an API call to verify payment status
    console.log("Verifying payment:", paymentId)
  }, [paymentId])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="mx-auto w-full max-w-md bg-white/20 backdrop-blur-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
              <CheckCircle className="h-10 w-10 text-emerald-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Payment Successful!</CardTitle>
            <CardDescription className="text-white/70">Thank you for your purchase</CardDescription>
          </CardHeader>

          <CardContent className="text-center">
            {packageId === "custom" ? (
              <p className="mb-4 text-white">
                Your consultation has been scheduled. We'll send a confirmation to your email shortly.
              </p>
            ) : (
              <p className="mb-4 text-white">
                Your personalized astrology report is being prepared. We will send it to your email shortly.
              </p>
            )}

            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-sm text-white/70">Order Reference</p>
              <p className="font-mono text-lg font-semibold text-white">
                #AST-{Math.floor(100000 + Math.random() * 900000)}
              </p>
              <p className="mt-1 text-xs text-white/70">Payment ID: {paymentId}</p>
            </div>

            <div className="mt-6 rounded-lg bg-emerald-500/20 p-4">
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-5 w-5 text-emerald-400" />
                <p className="text-sm font-medium text-white">Order Details Sent</p>
              </div>
              <p className="mt-1 text-xs text-white/70">
                Your order details have been sent to our team and saved to our records
              </p>
            </div>

            {packageId === "custom" && (
              <div className="mt-4 rounded-lg bg-white/10 p-4">
                <div className="flex items-center justify-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-white">Appointment Added to Calendar</p>
                </div>
                <p className="mt-1 text-xs text-white/70">You'll receive a calendar invitation via email</p>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              asChild
            >
              <Link href="/">Return to Home</Link>
            </Button>

            <p className="text-center text-sm text-white/70">
              If you have any questions, please contact our support team.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

