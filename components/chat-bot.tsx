"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your AstroInsights assistant. How can I help you with your cosmic journey today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'd be happy to help you understand your birth chart! Could you share your birth date, time, and location?",
        "The stars are aligned for new beginnings in your life. This is a great time for personal growth.",
        "Astrology can provide insights into your personality, relationships, and life path. What specific area are you interested in?",
        "Your zodiac sign is just one aspect of your astrological profile. Your moon sign reveals your emotional nature.",
        "Would you like to book a personalized reading with one of our expert astrologers?",
        "Mercury retrograde can affect communication and technology. It's a good time to review and reflect rather than start new projects.",
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat button */}
      <Button
        className={`fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 p-0 shadow-lg hover:from-emerald-600 hover:to-teal-700 ${
          isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        } transition-all duration-300`}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="sr-only">Open chat</span>
      </Button>

      {/* Chat window */}
      <Card
        className={`fixed bottom-4 right-4 z-50 w-80 overflow-hidden bg-white/20 backdrop-blur-md md:w-96 ${
          isOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"
        } transition-all duration-300 ease-in-out`}
      >
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-white" />
              <CardTitle className="text-white">Astro Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="h-80 overflow-y-auto p-4">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex max-w-[80%] gap-2">
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                      <AvatarFallback className="bg-emerald-500 text-white">AI</AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-emerald-500 text-white" : "bg-white/30 text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="mt-1 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <CardFooter className="border-t border-white/20 p-3">
          <div className="flex w-full gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white/30 text-white placeholder:text-white/50"
            />
            <Button
              size="icon"
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

