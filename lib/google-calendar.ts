// This is a mock service for demonstration purposes
// In a real app, this would connect to the Google Calendar API

export interface AppointmentData {
  title: string
  date: string
  time: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notes?: string
}

export async function addAppointmentToCalendar(data: AppointmentData): Promise<boolean> {
  // In a real implementation, this would make an API call to Google Calendar
  // to add the appointment to your calendar

  console.log("Adding appointment to Google Calendar:", data)

  // Format the appointment details
  const appointmentDetails = {
    summary: data.title,
    description: `
Customer: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}
${data.notes ? `Notes: ${data.notes}` : ""}
    `.trim(),
    start: {
      dateTime: `${data.date}T${data.time.split(" ")[0]}:00`,
      timeZone: "Asia/Kolkata",
    },
    end: {
      // Add 1 hour to the start time
      dateTime: `${data.date}T${data.time.split(" ")[0]}:00`,
      timeZone: "Asia/Kolkata",
    },
    attendees: [{ email: data.customerEmail, displayName: data.customerName }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 30 },
      ],
    },
  }

  console.log("Appointment details:", appointmentDetails)

  // Simulate a successful API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}

