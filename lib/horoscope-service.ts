// This is a mock service for demonstration purposes
// In a real app, this would connect to an actual horoscope API

interface Horoscope {
  prediction: string
  lucky_number: string
  lucky_color: string
  mood: string
}

const horoscopePredictions: Record<string, Horoscope> = {
  aries: {
    prediction:
      "Today is a day of new beginnings for Aries. Your natural leadership abilities will shine through, especially in professional settings. Take initiative on projects you've been putting off. Your energy is high, making this an excellent time for physical activity.",
    lucky_number: "9",
    lucky_color: "Red",
    mood: "Energetic",
  },
  taurus: {
    prediction:
      "Stability is key for Taurus today. Focus on financial planning and long-term security. Your practical approach will help solve a persistent problem. Take time to appreciate the beauty around you, as your sensual nature is heightened.",
    lucky_number: "6",
    lucky_color: "Green",
    mood: "Grounded",
  },
  gemini: {
    prediction:
      "Communication flows easily for Gemini today. Your wit and charm will open doors in both personal and professional relationships. It's an excellent day for networking and sharing ideas. Stay flexible as plans may change unexpectedly.",
    lucky_number: "3",
    lucky_color: "Yellow",
    mood: "Curious",
  },
  cancer: {
    prediction:
      "Emotional insights are strong for Cancer today. Trust your intuition, especially regarding family matters. Your nurturing nature will be appreciated by those close to you. Take time for self-care and creating a comfortable environment at home.",
    lucky_number: "2",
    lucky_color: "Silver",
    mood: "Intuitive",
  },
  leo: {
    prediction:
      "The spotlight is on Leo today. Your creative energy is at a peak, making this an excellent time for artistic pursuits or presentations. Romance may blossom for single Leos. Express your generous nature by helping someone in need.",
    lucky_number: "1",
    lucky_color: "Gold",
    mood: "Confident",
  },
  virgo: {
    prediction:
      "Details matter for Virgo today. Your analytical skills will help solve a complex problem at work. Health improvements come through small, consistent changes. Take time to organize your space, as a clear environment will lead to mental clarity.",
    lucky_number: "5",
    lucky_color: "Navy Blue",
    mood: "Analytical",
  },
  libra: {
    prediction:
      "Harmony is the theme for Libra today. Relationships of all kinds are highlighted, with opportunities for deeper connections. Your diplomatic skills will be needed to resolve a conflict. Balance work and leisure for optimal well-being.",
    lucky_number: "7",
    lucky_color: "Pink",
    mood: "Balanced",
  },
  scorpio: {
    prediction:
      "Transformation is key for Scorpio today. Let go of what no longer serves you, whether it's a relationship, habit, or belief. Your intensity and focus will help you achieve a long-held goal. Trust your instincts in financial matters.",
    lucky_number: "8",
    lucky_color: "Burgundy",
    mood: "Determined",
  },
  sagittarius: {
    prediction:
      "Adventure calls to Sagittarius today. Explore new ideas, places, or philosophies. Your optimistic outlook will inspire those around you. Learning opportunities abound, so keep an open mind. Travel plans may develop unexpectedly.",
    lucky_number: "4",
    lucky_color: "Purple",
    mood: "Adventurous",
  },
  capricorn: {
    prediction:
      "Achievement is highlighted for Capricorn today. Your disciplined approach will lead to progress in career goals. Recognition for past efforts may arrive. Take time to plan your next steps carefully, as foundations laid now will support future success.",
    lucky_number: "10",
    lucky_color: "Brown",
    mood: "Ambitious",
  },
  aquarius: {
    prediction:
      "Innovation is the focus for Aquarius today. Your unique perspective will lead to breakthrough solutions. Social connections bring unexpected opportunities. Humanitarian causes may call for your attention and expertise.",
    lucky_number: "11",
    lucky_color: "Electric Blue",
    mood: "Inventive",
  },
  pisces: {
    prediction:
      "Spiritual insights flow for Pisces today. Your compassionate nature will help someone in need. Creative inspiration is strong, especially in music or visual arts. Take time for meditation or quiet reflection to access your deep inner wisdom.",
    lucky_number: "12",
    lucky_color: "Sea Green",
    mood: "Dreamy",
  },
}

export async function getDailyHoroscope(sign: string): Promise<Horoscope> {
  // In a real app, this would fetch from an actual horoscope API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Normalize the sign name to lowercase for matching
      const normalizedSign = sign.toLowerCase()

      // Return the prediction for the requested sign, or a default if not found
      resolve(
        horoscopePredictions[normalizedSign] || {
          prediction:
            "The stars are aligning in your favor today. Stay open to new opportunities and trust your intuition.",
          lucky_number: "7",
          lucky_color: "Blue",
          mood: "Hopeful",
        },
      )
    }, 1000)
  })
}

