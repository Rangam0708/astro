"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { reviews } from "@/lib/review-data"

export function ReviewsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % reviews.length)
  }

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden rounded-xl bg-white/10 p-6 backdrop-blur-sm">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="min-w-full px-4">
              <Card className="border-0 bg-transparent shadow-none">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                      />
                    ))}
                  </div>

                  <blockquote className="mb-6 text-lg italic text-white">"{review.text}"</blockquote>

                  <Avatar className="h-16 w-16 border-2 border-emerald-500">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback className="bg-emerald-700 text-white">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="mt-4">
                    <h4 className="font-semibold text-white">{review.name}</h4>
                    <p className="text-sm text-white/70">{review.location}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/40"
        onClick={() => {
          prevSlide()
          setAutoplay(false)
        }}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous review</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-black/20 text-white backdrop-blur-sm hover:bg-black/40"
        onClick={() => {
          nextSlide()
          setAutoplay(false)
        }}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next review</span>
      </Button>
    </div>
  )
}

