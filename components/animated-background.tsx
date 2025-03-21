"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create stars
    const stars: Star[] = []
    const starCount = 200

    // Create zodiac symbols
    const zodiacSymbols = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"]
    const symbols: Symbol[] = []
    const symbolCount = 12

    class Star {
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.twinkleSpeed = Math.random() * 0.01 + 0.003
      }

      update() {
        this.opacity += Math.sin(Date.now() * this.twinkleSpeed) * 0.01
        this.opacity = Math.max(0.2, Math.min(1, this.opacity))
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Symbol {
      x: number
      y: number
      symbol: string
      size: number
      opacity: number
      speed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.symbol = zodiacSymbols[Math.floor(Math.random() * zodiacSymbols.length)]
        this.size = Math.random() * 20 + 15
        this.opacity = Math.random() * 0.2 + 0.05
        this.speed = Math.random() * 0.2 + 0.1
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height + this.size) {
          this.y = -this.size
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        ctx.font = `${this.size}px serif`
        ctx.fillStyle = `rgba(180, 255, 220, ${this.opacity})`
        ctx.fillText(this.symbol, this.x, this.y)
      }
    }

    // Create nebula clouds
    const nebulae: Nebula[] = []
    const nebulaCount = 5

    class Nebula {
      x: number
      y: number
      radius: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 150 + 100

        // Create cosmic colors
        const hue = Math.random() * 60 + 220 // Blue to purple range
        const saturation = Math.random() * 30 + 70
        const lightness = Math.random() * 20 + 20
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.05)`
      }

      draw() {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize stars
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    // Initialize symbols
    for (let i = 0; i < symbolCount; i++) {
      symbols.push(new Symbol())
    }

    // Initialize nebulae
    for (let i = 0; i < nebulaCount; i++) {
      nebulae.push(new Nebula())
    }

    // Animation loop
    const animate = () => {
      // Create a dark green to deep blue gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(5, 25, 35, 1)")
      gradient.addColorStop(1, "rgba(0, 40, 30, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw nebulae
      for (const nebula of nebulae) {
        nebula.draw()
      }

      // Draw and update stars
      for (const star of stars) {
        star.update()
        star.draw()
      }

      // Draw and update symbols
      for (const symbol of symbols) {
        symbol.update()
        symbol.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-full w-full" />
}

