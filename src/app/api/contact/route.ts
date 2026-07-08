import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, phone, message } = await req.json()

    // Validation
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: "Required fields are missing (firstName, email, and message are required)." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      )
    }

    const payload = {
      firstName,
      lastName: lastName || "",
      email,
      phone: phone || "Not provided",
      message,
      timestamp: new Date().toISOString()
    }

    let sentSuccessfully = false
    let methodUsed = "none"

    // 1. Try Discord Webhook integration
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (discordWebhookUrl) {
      try {
        const embed = {
          title: "📩 New Contact Form Submission",
          color: 0x3b82f6, // primary blue color code
          fields: [
            { name: "Name", value: `${payload.firstName} ${payload.lastName}`.trim(), inline: true },
            { name: "Email", value: payload.email, inline: true },
            { name: "Phone", value: payload.phone, inline: true },
            { name: "Message", value: payload.message }
          ],
          timestamp: payload.timestamp
        }

        const res = await fetch(discordWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ embeds: [embed] })
        })

        if (res.ok) {
          sentSuccessfully = true
          methodUsed = "discord"
        } else {
          console.error("Discord Webhook responded with error status:", res.status)
        }
      } catch (err) {
        console.error("Error sending to Discord Webhook:", err)
      }
    }

    // 2. Try Resend integration if Discord failed or wasn't configured
    const resendApiKey = process.env.RESEND_API_KEY
    if (!sentSuccessfully && resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Contact Form <onboarding@resend.dev>",
            to: "contact@nispalbhattarai.com.np",
            subject: `New Portfolio Message from ${payload.firstName} ${payload.lastName}`,
            html: `
              <h3>New Portfolio Message</h3>
              <p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p>
              <p><strong>Email:</strong> ${payload.email}</p>
              <p><strong>Phone:</strong> ${payload.phone}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; padding: 10px; background-color: #f3f4f6; border-radius: 4px;">${payload.message}</p>
              <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">Submitted at ${payload.timestamp}</p>
            `
          })
        })

        if (res.ok) {
          sentSuccessfully = true
          methodUsed = "resend"
        } else {
          const errData = await res.json()
          console.error("Resend API responded with error:", errData)
        }
      } catch (err) {
        console.error("Error sending via Resend API:", err)
      }
    }

    // Logging for local environments / backup
    console.log(`[Contact Submission] [Method: ${methodUsed}] Received payload:`, payload)

    return NextResponse.json({
      success: true,
      message: "Message received successfully.",
      methodUsed
    })
  } catch (error) {
    console.error("API contact error:", error)
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    )
  }
}
