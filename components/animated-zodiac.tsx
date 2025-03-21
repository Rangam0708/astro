"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface AnimatedZodiacProps {
  className?: string
}

export function AnimatedZodiac({ className = "" }: AnimatedZodiacProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const images = container.querySelectorAll("img")

    // Set initial positions
    images.forEach((img, index) => {
      const angle = (index / images.length) * 2 * Math.PI
      const radius = 120 // Orbit radius
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius

      img.style.transform = `translate(${x}px, ${y}px) rotate(0deg)`
    })

    // Animation
    let animationFrame: number
    let rotation = 0

    const animate = () => {
      rotation += 0.002 // Speed of rotation

      images.forEach((img, index) => {
        const angle = rotation + (index / images.length) * 2 * Math.PI
        const radius = 120 // Orbit radius
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        img.style.transform = `translate(${x}px, ${y}px) rotate(${rotation * 30}deg)`
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className={`relative h-[300px] w-[300px] ${className}`} ref={containerRef}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-16 w-16 rounded-full bg-emerald-500/30 p-2">
          <Image
            src="https://img1.wsimg.com/isteam/ip/5ae9f433-f883-4e4d-9887-a30f550ec189/blob-e935595.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,h:1200,cg:true"
            width={40}
            height={40}
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 p-2"
        >
          <Image
            src={`https://img1.wsimg.com/isteam/ip/5ae9f433-f883-4e4d-9887-a30f550ec189/blob-e935595.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1200,h:1200,cg:true`}
            alt={`Zodiac ${index + 1}`}
            width={40}
            height={40}
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  )
}

