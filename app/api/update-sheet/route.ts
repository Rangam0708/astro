import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Log the received data
    console.log("Received data for Google Sheet:", data)

    // In a real implementation, you would use the Google Sheets API
    // to add a new row to your spreadsheet

    // For demonstration purposes, we'll simulate updating a Google Sheet
    const sheetUpdated = await simulateUpdateSheet(data)

    if (sheetUpdated) {
      return NextResponse.json({
        success: true,
        message: "Google Sheet updated successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to update Google Sheet",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error updating Google Sheet:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

async function simulateUpdateSheet(data: any): Promise<boolean> {
  // This function simulates updating a Google Sheet
  // In a real implementation, you would use the Google Sheets API

  // Simulate a delay to mimic API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Format the data as it would appear in a spreadsheet row
  const rowData = [
    data.orderDate || new Date().toISOString(),
    data.name || "N/A",
    data.email || "N/A",
    data.phone || "N/A",
    data.package || "N/A",
    data.price || "N/A",
    data.birthDate || "N/A",
    data.birthTime || "N/A",
    data.birthPlace || "N/A",
    data.appointmentDate || "N/A",
    data.appointmentTime || "N/A",
    data.paymentId || "N/A",
  ]

  // Log what would be added to the Google Sheet
  console.log("Would add to Google Sheet:", rowData)

  // Return true to simulate successful update
  return true
}

