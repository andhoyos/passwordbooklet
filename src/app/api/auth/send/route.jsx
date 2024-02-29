import { getEmailContent } from "@/helpers/emailTemplate";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/users";
import { NextResponse } from "next/server";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  const data = await request.json();

  await connectDB();
  const user = await User.findOne({ email: data.email });

  if (!user) {
    return NextResponse.json(
      { message: "No se encontró un usuario con este correo electrónico" },
      { status: 404 }
    );
  }
  try {
    const userId = user._id.toString();
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `http://passwordbooklet.vercel.app/reset-password?token=${token}`;

    const msg = {
      to: data.email,
      from: "Passwordbooklet <anddreshoy@gmail.com>",
      subject: "Reset Password",
      html: getEmailContent(resetLink),
    };

    await sgMail.send(msg);

    return NextResponse.json({
      message: "Se ha enviado el mail por favor verifica la bandeja de entrada",
    });
  } catch (error) {
    console.error("Error sending mail:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
