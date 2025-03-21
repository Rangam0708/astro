"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface CosmicAnimationProps {
  className?: string
}

export function CosmicAnimation({ className = "" }: CosmicAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create floating elements
    const elements = container.querySelectorAll(".cosmic-element")

    // Animation
    elements.forEach((element) => {
      // Random initial position
      const xPos = Math.random() * 100
      const yPos = Math.random() * 100

      // Random animation properties
      const duration = 15 + Math.random() * 20
      const delay = Math.random() * 5

      const htmlElement = element as HTMLElement

      // Set initial styles
      htmlElement.style.left = `${xPos}%`
      htmlElement.style.top = `${yPos}%`
      htmlElement.style.animationDuration = `${duration}s`
      htmlElement.style.animationDelay = `${delay}s`
    })
  }, [])

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} ref={containerRef}>
      {/* Moon */}
      <div className="cosmic-element absolute h-24 w-24 animate-float opacity-70">
        <Image
          src="/placeholder.svg?height=96&width=96&text=🌙"
          alt="Moon"
          width={96}
          height={96}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Sun */}
      <div className="cosmic-element absolute h-32 w-32 animate-pulse-slow opacity-80">
        <Image
          src="/placeholder.svg?height=128&width=128&text=☀️"
          alt="Sun"
          width={128}
          height={128}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Planet */}
      <div className="cosmic-element absolute h-20 w-20 animate-spin-slow opacity-70">
        <Image
          src="/placeholder.svg?height=80&width=80&text=🪐"
          alt="Planet"
          width={80}
          height={80}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Star */}
      <div className="cosmic-element absolute h-16 w-16 animate-pulse opacity-90">
        <Image
          src="/placeholder.svg?height=64&width=64&text=⭐"
          alt="Star"
          width={64}
          height={64}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Comet */}
      <div className="cosmic-element absolute h-28 w-28 animate-float-fast opacity-60">
        <Image
          src="/placeholder.svg?height=112&width=112&text=☄️"
          alt="Comet"
          width={112}
          height={112}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  )
}

