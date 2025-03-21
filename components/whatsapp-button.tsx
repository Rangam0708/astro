"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  className?: string
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  // Replace with your actual WhatsApp number
  const whatsappNumber = "+919438077865"
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi,%20I'm%20interested%20in%20an%20astrology%20reading.`

  return (
    <Button
      variant="outline"
      className={`flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 ${className}`}
      onClick={() => window.open(whatsappUrl, "_blank")}
    >
      <MessageCircle className="h-5 w-5" />
      Chat on WhatsApp
    </Button>
  )
}

