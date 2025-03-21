import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email-service"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Log the received data
    console.log("Received data for email:", data)

    // Format email content
    const emailText = formatEmailBody(data)
    const emailHtml = formatEmailHtml(data)

    // Send the email
    const emailSent = await sendEmail({
      to: "rangam03@gmail.com", // Your email address
      subject: `New Astrology Order: ${data.package} - ${data.name}`,
      text: emailText,
      html: emailHtml,
    })

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: "Email sent successfully to rangam03@gmail.com",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

// Function to format email body as plain text
function formatEmailBody(data: any): string {
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
function formatEmailHtml(data: any): string {
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

