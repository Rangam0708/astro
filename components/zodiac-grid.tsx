"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { DailyHoroscopeModal } from "@/components/daily-horoscope-modal"

interface ZodiacSign {
  name: string
  dates: string
  icon: string
}

interface ZodiacGridProps {
  signs: ZodiacSign[]
}

export function ZodiacGrid({ signs }: ZodiacGridProps) {
  const [selectedSign, setSelectedSign] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSignClick = (sign: string) => {
    setSelectedSign(sign)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {signs.map((sign) => (
          <Card
            key={sign.name}
            className="group cursor-pointer overflow-hidden bg-white/10 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:shadow-emerald-500/20"
            onClick={() => handleSignClick(sign.name)}
          >
            <CardContent className="flex flex-col items-center p-4 text-center">
              <div className="mb-3 mt-2 h-16 w-16 overflow-hidden rounded-full bg-emerald-500/20 p-3">
                <Image
                  src={sign.icon || "/placeholder.svg"}
                  alt={sign.name}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-white">{sign.name}</h3>
              <p className="text-sm text-white/70">{sign.dates}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <DailyHoroscopeModal sign={selectedSign} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

