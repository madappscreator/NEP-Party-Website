import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route to send membership card to member's WhatsApp
 * Uses Meta Business WhatsApp API with a template message containing card image
 * 
 * POST /api/whatsapp/send-card
 * Body: { 
 *   phone: string,           // Member's phone number (with country code)
 *   memberName: string,      // Member's name
 *   membershipId: string,    // Membership ID
 *   cardImageUrl?: string,   // Optional: URL to card image (if pre-generated)
 *   membershipType?: string  // Optional: Membership type
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const { phone, memberName, membershipId, cardImageUrl, membershipType } = await req.json();

    // Validate required fields
    if (!phone || !memberName || !membershipId) {
      return NextResponse.json({ 
        success: false, 
        error: "Missing required fields: phone, memberName, membershipId" 
      }, { status: 400 });
    }

    const token = process.env.WHATSAPP_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_ID;

    if (!token || !phoneId) {
      console.warn("WhatsApp credentials not found. Skipping card notification.");
      return NextResponse.json({ 
        success: false, 
        error: "WhatsApp credentials not configured. Contact administrator." 
      }, { status: 503 });
    }

    // Format phone number (ensure it has country code)
    let formattedPhone = phone.replace(/\D/g, ''); // Remove non-digits
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '91' + formattedPhone.substring(1); // Replace leading 0 with 91
    } else if (!formattedPhone.startsWith('91') && formattedPhone.length === 10) {
      formattedPhone = '91' + formattedPhone; // Add India country code
    }

    // Send membership card notification to member
    // Option 1: If card image URL is provided, send image with caption
    if (cardImageUrl) {
      const imageResponse = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: formattedPhone,
          type: "image",
          image: {
            link: cardImageUrl,
            caption: `🎉 *Welcome to National Ex Servicemen Party!*\n\n` +
              `Dear *${memberName}*,\n\n` +
              `Your membership has been confirmed!\n\n` +
              `📋 *Membership ID:* ${membershipId}\n` +
              `🏷️ *Type:* ${membershipType || 'Basic'}\n\n` +
              `Please save this card for future reference.\n\n` +
              `_Jai Hind!_ 🇮🇳`
          }
        })
      });

      const imageResult = await imageResponse.json();
      
      if (!imageResponse.ok) {
        console.error("WhatsApp Image API Error:", imageResult);
        // Fall back to template message
      } else {
        return NextResponse.json({ 
          success: true, 
          message: "Card sent to WhatsApp successfully",
          messageId: imageResult.messages?.[0]?.id
        });
      }
    }

    // Option 2: Send using approved template message (more reliable)
    const templateResponse = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: formattedPhone,
        type: "template",
        template: {
          name: "membership_card_notification", // Template must be created in Meta Business Manager
          language: { code: "en" },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: memberName },
                { type: "text", text: membershipId },
                { type: "text", text: membershipType || 'Basic' }
              ]
            }
          ]
        }
      })
    });

    const templateResult = await templateResponse.json();

    if (!templateResponse.ok) {
      console.error("WhatsApp Template API Error:", templateResult);
      
      // Final fallback: Send simple text message
      const textResponse = await fetch(`https://graph.facebook.com/v18.0/${phoneId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: formattedPhone,
          type: "text",
          text: {
            body: `🎉 *Welcome to NEP!*\n\nDear ${memberName},\n\nYour membership is confirmed!\n\n📋 Membership ID: ${membershipId}\n🏷️ Type: ${membershipType || 'Basic'}\n\nVisit our website to download your digital membership card.\n\n_Jai Hind!_ 🇮🇳`
          }
        })
      });

      const textResult = await textResponse.json();
      
      if (!textResponse.ok) {
        return NextResponse.json({ 
          success: false, 
          error: "Failed to send WhatsApp message",
          details: textResult
        }, { status: 500 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Card notification sent via text message",
        messageId: textResult.messages?.[0]?.id
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Card sent to WhatsApp successfully",
      messageId: templateResult.messages?.[0]?.id
    });

  } catch (error: any) {
    console.error("WhatsApp Send Card API Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

