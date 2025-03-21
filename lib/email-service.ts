// This service handles sending customer data to email and Google Sheets
import nodemailer from "nodemailer"

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
  paymentId?: string
  orderDate: string
}

export async function sendCustomerDataToEmail(data: CustomerData): Promise<boolean> {
  try {
    // Send email directly from this function
    const emailSent = await sendEmail({
      to: "rangam03@gmail.com",
      subject: `New Astrology Order: ${data.package} - ${data.name}`,
      text: formatEmailBody(data),
      html: formatEmailHtml(data),
    })

    if (!emailSent) {
      console.error("Failed to send email")
      return false
    }

    // Send data to the Google Sheets API endpoint
    const sheetResponse = await fetch("/api/update-sheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const sheetResult = await sheetResponse.json()

    if (!sheetResult.success) {
      console.error("Failed to update Google Sheet:", sheetResult.message)
    }

    // Return true if both operations were successful
    return emailSent && sheetResult.success
  } catch (error) {
    console.error("Error in sendCustomerDataToEmail:", error)
    return false
  }
}

// Function to format email body as plain text
function formatEmailBody(data: CustomerData): string {
  return `
🔮 New Astrology Order 🔮

Order Date: ${data.orderDate || new Date().toISOString()}
Payment ID: ${data.paymentId || "N/A"}

Customer Details:
- Name: ${data.name || "N/A"}
- Email: ${data.email || "N/A"}
- Phone: ${data.phone || "N/A"}

Package: ${data.package || "N/A"}
Price: ₹${data.price || "N/A"}

Birth Details:
- Date: ${data.birthDate || "N/A"}
- Time: ${data.birthTime || "Not provided"}
- Place: ${data.birthPlace || "N/A"}

${data.appointmentDate ? `Appointment: ${data.appointmentDate} at ${data.appointmentTime}` : ""}
  `.trim()
}

// Function to format email body as HTML
function formatEmailHtml(data: CustomerData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1e9e6a; color: white; padding: 10px 20px; border-radius: 5px; }
    .section { margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px; }
    .label { font-weight: bold; color: #1e9e6a; }
    .appointment { background-color: #e6f7f2; padding: 15px; border-radius: 5px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔮 New Astrology Order 🔮</h1>
    </div>
    
    <div class="section">
      <p><span class="label">Order Date:</span> ${new Date(data.orderDate || new Date()).toLocaleString()}</p>
      <p><span class="label">Payment ID:</span> ${data.paymentId || "N/A"}</p>
    </div>
    
    <div class="section">
      <h2>Customer Details</h2>
      <p><span class="label">Name:</span> ${data.name || "N/A"}</p>
      <p><span class="label">Email:</span> ${data.email || "N/A"}</p>
      <p><span class="label">Phone:</span> ${data.phone || "N/A"}</p>
    </div>
    
    <div class="section">
      <h2>Order Details</h2>
      <p><span class="label">Package:</span> ${data.package || "N/A"}</p>
      <p><span class="label">Price:</span> ₹${data.price || "N/A"}</p>
    </div>
    
    <div class="section">
      <h2>Birth Details</h2>
      <p><span class="label">Date:</span> ${data.birthDate || "N/A"}</p>
      <p><span class="label">Time:</span> ${data.birthTime || "Not provided"}</p>
      <p><span class="label">Place:</span> ${data.birthPlace || "N/A"}</p>
    </div>
    
    ${
      data.appointmentDate
        ? `
    <div class="appointment">
      <h2>Appointment Details</h2>
      <p><span class="label">Date:</span> ${data.appointmentDate}</p>
      <p><span class="label">Time:</span> ${data.appointmentTime}</p>
    </div>
    `
        : ""
    }
  </div>
</body>
</html>
  `.trim()
}

// Email sending function
interface EmailOptions {
  to: string
  subject: string
  text: string
  html: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Create a transporter using Gmail SMTP
    // Note: For production, you should use environment variables for these credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "your-email@gmail.com", // Replace with your Gmail address
        pass: process.env.EMAIL_PASS || "your-app-password", // Replace with your Gmail app password
      },
    })

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"AstroInsights" <your-email@gmail.com>', // Replace with your Gmail address
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })

    console.log("Email sent successfully:", info.messageId)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// Function to test the email service with dummy data
export async function testEmailService(): Promise<boolean> {
  const dummyData: CustomerData = {
    name: "Test Customer",
    email: "test@example.com",
    phone: "+919876543210",
    birthDate: "1990-01-01",
    birthTime: "12:00",
    birthPlace: "New Delhi, India",
    package: "Premium Reading",
    price: "999",
    appointmentDate: "2025-04-15",
    appointmentTime: "2:00 PM",
    paymentId: "test_payment_123",
    orderDate: new Date().toISOString(),
  }

  return await sendCustomerDataToEmail(dummyData)
}

