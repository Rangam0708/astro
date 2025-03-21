// This is a mock service for demonstration purposes
// In a real app, this would connect to your backend API
// which would use the WhatsApp Business API to send messages

export interface CustomerData {
  name: string
  email: string
  phone: string
  birthDate: string
  birthTime?: string
  birthPlace: string
  package: string
  price: string
  appointmentDate?: string
  appointmentTime?: string
}

export async function sendCustomerDataToWhatsApp(data: CustomerData): Promise<boolean> {
  // In a real implementation, this would make an API call to your backend
  // which would then use the WhatsApp Business API to send a message

  console.log("Sending customer data to WhatsApp:", data)

  // Format the message that would be sent to your WhatsApp
  const message = `
🔮 New Astrology Order 🔮

Customer: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Package: ${data.package}
Price: ₹${data.price}

Birth Details:
- Date: ${data.birthDate}
- Time: ${data.birthTime || "Not provided"}
- Place: ${data.birthPlace}

${data.appointmentDate ? `Appointment: ${data.appointmentDate} at ${data.appointmentTime}` : ""}
  `.trim()

  console.log("Message that would be sent:", message)

  // Simulate a successful API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

