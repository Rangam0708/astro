"use client"

import { useState, useEffect } from "react"
import { format, isBefore, isAfter, startOfDay, addMonths } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock } from "lucide-react"

interface CalendarBookingProps {
  onBookingComplete: (date: string, time: string, formattedDate: string) => void
}

export function CalendarBooking({ onBookingComplete }: CalendarBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Generate time slots for the selected date
  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true)

      // In a real app, you would fetch available time slots from your API
      // based on your Google Calendar availability

      // Simulate API call to get available times
      setTimeout(() => {
        // Generate slots from 10 AM to 7 PM
        const slots = []
        for (let hour = 10; hour <= 19; hour++) {
          const hourString = hour > 12 ? hour - 12 : hour
          const amPm = hour >= 12 ? "PM" : "AM"

          // Randomly make some slots unavailable to simulate a real calendar
          if (Math.random() > 0.3) {
            slots.push(`${hourString}:00 ${amPm}`)
          }

          if (hour < 19 && Math.random() > 0.3) {
            slots.push(`${hourString}:30 ${amPm}`)
          }
        }

        setAvailableTimes(slots)
        setIsLoading(false)
      }, 500)
    } else {
      setAvailableTimes([])
    }
  }, [selectedDate])

  // Disable past dates, weekends, and dates more than 2 months in the future
  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date())
    const twoMonthsFromNow = addMonths(today, 2)

    // Disable past dates
    if (isBefore(date, today)) {
      return true
    }

    // Disable dates more than 2 months in the future
    if (isAfter(date, twoMonthsFromNow)) {
      return true
    }

    // Disable weekends (0 = Sunday, 6 = Saturday)
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      const formattedDate = format(selectedDate, "EEEE, MMMM d, yyyy")
      onBookingComplete(format(selectedDate, "yyyy-MM-dd"), selectedTime, formattedDate)
    }
  }

  return (
    <Card className="bg-white/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="text-xl text-white">Schedule Your Consultation</CardTitle>
        <CardDescription className="text-white/70">
          Choose a date and time for your personalized astrology consultation
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="rounded-md border border-white/20 bg-white/10 p-4">
          <div className="flex items-center justify-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-medium text-white">Select a Date</h3>
          </div>

          <div className="mt-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={disabledDays}
              className="rounded-md border-0 bg-transparent"
              classNames={{
                day_selected: "bg-emerald-500 text-white hover:bg-emerald-600",
                day_today: "bg-white/20 text-white",
                day: "text-white hover:bg-white/20",
                day_disabled: "text-white/30 hover:bg-transparent",
                nav_button: "border border-white/20 bg-white/10 text-white hover:bg-white/20",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                caption: "text-white",
                head_cell: "text-white/70",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                root: "w-full",
                table: "w-full border-collapse",
                row: "flex w-full",
                head_row: "flex",
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
              }}
              components={{
                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                IconRight: () => <ChevronRight className="h-4 w-4" />,
              }}
            />
          </div>
        </div>

        <div className="rounded-md border border-white/20 bg-white/10 p-4">
          <div className="flex items-center justify-center">
            <Clock className="mr-2 h-5 w-5 text-emerald-400" />
            <h3 className="text-lg font-medium text-white">Select a Time</h3>
          </div>

          {selectedDate ? (
            isLoading ? (
              <div className="mt-4 text-center text-white">
                <p>Loading available time slots...</p>
              </div>
            ) : availableTimes.length > 0 ? (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    className={`border-white/20 bg-white/10 text-white hover:bg-white/20 ${
                      selectedTime === time ? "border-emerald-500 bg-emerald-500/20" : ""
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="mt-4 text-center text-white">
                <p>No available time slots for this date.</p>
                <p className="mt-2 text-sm text-white/70">Please select another date.</p>
              </div>
            )
          ) : (
            <div className="mt-4 text-center text-white/70">
              <p>Please select a date first</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTime}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
        >
          Continue to Details
        </Button>
      </CardFooter>
    </Card>
  )
}

