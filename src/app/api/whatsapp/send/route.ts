import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { phone, memberName, amount, membershipId } = await req.json();

    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;

    if (!token || !phoneId) {
      console.warn("WhatsApp credentials not found. Skipping notification.");
      return NextResponse.json({ success: false, error: "Credentials missing" });
    }

    // Send to Admin
    await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "919176101115", // Admin Phone
        type: "template",
        template: {
          name: "new_member_alert", // Template must be created in Meta Business Manager
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: memberName },
                { type: "text", text: `₹${amount}` },
                { type: "text", text: membershipId },
              ]
            }
          ]
        }
      })
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("WhatsApp API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
