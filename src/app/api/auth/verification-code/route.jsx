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
    const verification_check = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `${phoneNumberVerification}`,
        code: verificationCode,
      });

    console.log(verification_check.status);

    if (verification_check.status === "approved") {
      return NextResponse.json({
        message: "Verification code approved",
        status: verification_check.status,
      });
    } else {
      return NextResponse.json({
        message: "Verification code not approved",
        status: 401,
      });
    }
  } catch (error) {
    console.error("Error verification code:", error);
    return NextResponse.json({ message: "Error verification code" });
  }
}
