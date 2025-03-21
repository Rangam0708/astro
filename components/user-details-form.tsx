"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarBooking } from "@/components/calendar-booking"
import { CalendarCheck } from "lucide-react"

interface UserDetailsFormProps {
  packagePrice?: number
  packageId?: string
}

export function UserDetailsForm({ packagePrice = 999, packageId = "premium" }: UserDetailsFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
  })

  const [showCalendar, setShowCalendar] = useState(packageId === "custom")
  const [appointmentDate, setAppointmentDate] = useState<string>("")
  const [appointmentTime, setAppointmentTime] = useState<string>("")
  const [formattedAppointmentDate, setFormattedAppointmentDate] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBookingComplete = (date: string, time: string, formattedDate: string) => {
    setAppointmentDate(date)
    setAppointmentTime(time)
    setFormattedAppointmentDate(formattedDate)
    setShowCalendar(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query params with all user details
    const params = new URLSearchParams({
      package: packageId,
      price: packagePrice.toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      birthDate: formData.birthDate,
      birthTime: formData.birthTime || "",
      birthPlace: formData.birthPlace,
    })

    // Add appointment details if it's a consultation
    if (packageId === "custom" && appointmentDate && appointmentTime) {
      params.append("appointmentDate", appointmentDate)
      params.append("appointmentTime", appointmentTime)
      params.append("formattedAppointmentDate", formattedAppointmentDate)
    }

    // Redirect to payment page with all details
    router.push(`/payment?${params.toString()}`)
  }

  // For consultation package, show calendar first
  if (packageId === "custom" && showCalendar) {
    return <CalendarBooking onBookingComplete={handleBookingComplete} />
  }

  return (
    <Card className="mx-auto max-w-md bg-white/20 backdrop-blur-md">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          {packageId === "custom" && appointmentDate && (
            <div className="mb-2 rounded-md bg-emerald-500/20 p-3">
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-emerald-400" />
                <p className="text-sm font-medium text-white">Appointment Scheduled</p>
              </div>
              <p className="mt-1 text-sm text-white">
                {formattedAppointmentDate} at {appointmentTime}
              </p>
              <Button
                type="button"
                variant="link"
                className="mt-1 p-0 text-xs text-emerald-300"
                onClick={() => setShowCalendar(true)}
              >
                Change appointment
              </Button>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="name" className="text-white">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="bg-white/30 placeholder:text-white/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="bg-white/30 placeholder:text-white/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone" className="text-white">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              className="bg-white/30 placeholder:text-white/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birthDate" className="text-white">
              Birth Date
            </Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              required
              className="bg-white/30 text-white placeholder:text-white/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birthTime" className="text-white">
              Birth Time (if known)
            </Label>
            <Input
              id="birthTime"
              name="birthTime"
              type="time"
              value={formData.birthTime}
              onChange={handleChange}
              className="bg-white/30 text-white placeholder:text-white/50"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="birthPlace" className="text-white">
              Birth Place
            </Label>
            <Input
              id="birthPlace"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              placeholder="City, Country"
              required
              className="bg-white/30 placeholder:text-white/50"
            />
          </div>

          <Button
            type="submit"
            className="mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-lg font-semibold hover:from-emerald-600 hover:to-teal-700"
          >
            Continue to Payment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

