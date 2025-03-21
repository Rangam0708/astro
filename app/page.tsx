"use client"

import { useState } from "react"
import { zodiacSigns } from "@/lib/zodiac-data"
import { AnimatedBackground } from "@/components/animated-background"
import { ZodiacGrid } from "@/components/zodiac-grid"
import { ReviewsCarousel } from "@/components/reviews-carousel"
import { UserDetailsForm } from "@/components/user-details-form"
import { SessionPackages } from "@/components/session-packages"
import { ChatBot } from "@/components/chat-bot"
import { AnimatedZodiac } from "@/components/animated-zodiac"
import { CosmicAnimation } from "@/components/cosmic-animation"
import { OfficeLocation } from "@/components/office-location"

export default function HomePage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<{ id: string; price: number } | null>(null)

  const handleSelectPackage = (packageId: string, price: number) => {
    setSelectedPackage({ id: packageId, price })
    setShowForm(true)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <CosmicAnimation />

      <div className="container relative z-10 mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Astro<span className="text-emerald-400">Insights</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-white/80">
            Discover your cosmic path with our personalized astrological readings and insights
          </p>

          <div className="mt-8 flex justify-center">
            <AnimatedZodiac />
          </div>
        </header>

        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">Explore Your Zodiac Sign</h2>
            <p className="mt-2 text-white/70">Click on your sign to see today's free horoscope</p>
          </div>

          <ZodiacGrid signs={zodiacSigns} />
        </section>

        <section className="mb-20 rounded-xl bg-white/10 p-8 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">Choose Your Astrology Session</h2>
            <p className="mt-2 text-white/70">Select the package that best suits your cosmic journey</p>
          </div>

          <SessionPackages
            packages={[
              {
                id: "basic",
                name: "Basic Reading",
                price: 499,
                description: "Essential astrological insights",
                features: ["Birth chart analysis", "Personality insights", "PDF report delivery", "24-hour delivery"],
              },
              {
                id: "premium",
                name: "Premium Reading",
                price: 999,
                description: "Comprehensive cosmic guidance",
                features: [
                  "Detailed birth chart analysis",
                  "Career & relationship insights",
                  "12-month predictions",
                  "PDF report delivery",
                  "Priority 12-hour delivery",
                ],
                popular: true,
              },
              {
                id: "custom",
                name: "Consultation",
                price: 1499,
                description: "Personalized 1-on-1 session",
                features: [
                  "30-minute video consultation",
                  "Detailed birth chart analysis",
                  "Specific question focus",
                  "Remedies & recommendations",
                  "Recording of the session",
                ],
              },
            ]}
            onSelectPackage={handleSelectPackage}
          />

          {showForm && selectedPackage && (
            <div className="mt-8">
              <h3 className="mb-4 text-center text-xl font-semibold text-white">
                Complete Your Details for{" "}
                {selectedPackage.id === "basic"
                  ? "Basic Reading"
                  : selectedPackage.id === "premium"
                    ? "Premium Reading"
                    : "Consultation"}
              </h3>
              <UserDetailsForm packagePrice={selectedPackage.price} packageId={selectedPackage.id} />
            </div>
          )}
        </section>

        <section className="mb-20">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">What Our Clients Say</h2>
            <p className="mt-2 text-white/70">Discover how our astrological insights have transformed lives</p>
          </div>

          <ReviewsCarousel />
        </section>

        <section className="rounded-xl bg-white/10 p-8 backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">Visit Our Office</h2>
            <p className="mt-2 text-white/70">Find us for in-person consultations or call us for inquiries</p>
          </div>

          <OfficeLocation />
        </section>
      </div>

      <ChatBot />
    </div>
  )
}

