"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getDailyHoroscope } from "@/lib/horoscope-service"

interface DailyHoroscopeModalProps {
  sign: string
  isOpen: boolean
  onClose: () => void
}

export function DailyHoroscopeModal({ sign, isOpen, onClose }: DailyHoroscopeModalProps) {
  const [horoscope, setHoroscope] = useState<{
    prediction: string
    lucky_number: string
    lucky_color: string
    mood: string
  } | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isOpen && sign) {
      setLoading(true)
      getDailyHoroscope(sign.toLowerCase())
        .then((data) => {
          setHoroscope(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching horoscope:", error)
          setLoading(false)
        })
    }
  }, [isOpen, sign])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <Card className="relative w-full max-w-lg bg-white/20 backdrop-blur-md">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>

        <CardHeader>
          <CardTitle className="text-center text-2xl text-white">{sign} Daily Horoscope</CardTitle>
          <CardDescription className="text-center text-white/70">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          ) : horoscope ? (
            <div className="space-y-4">
              <p className="text-white">{horoscope.prediction}</p>

              <div className="grid grid-cols-3 gap-4 rounded-lg bg-white/10 p-4">
                <div className="text-center">
                  <p className="text-sm text-white/70">Lucky Number</p>
                  <p className="text-lg font-semibold text-white">{horoscope.lucky_number}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/70">Lucky Color</p>
                  <p className="text-lg font-semibold text-white">{horoscope.lucky_color}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-white/70">Mood</p>
                  <p className="text-lg font-semibold text-white">{horoscope.mood}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-white">Unable to load horoscope. Please try again later.</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            onClick={onClose}
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

