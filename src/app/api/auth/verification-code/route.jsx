import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request) {
  const data = await request.json();
  const { phoneNumberVerification, verificationCode } = data;

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: `+${phoneNumberVerification}`, code: verificationCode })
      .then((verification_check) => console.log(verification_check.status));

    return NextResponse.json({ message: "Verification code successfully" });
  } catch (error) {
    console.error("Error verification code:", error);
    return NextResponse.json({ message: "Error verification code" });
  }
}
