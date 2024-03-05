import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
  const data = await request.json();
  const { phoneNumber } = data;

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: `${phoneNumber}`, channel: "sms" })
      .then((verification) => console.log(verification.status));

    return NextResponse.json({
      message: "Verification code sent successfully",
    });
  } catch (error) {
    console.error("Error sending verification code:", error);
    return NextResponse.json({ message: "Error sending verification code" });
  }
}
