// import EmailTemplate from "@/components/EmailTemplate";
// import { Resend } from "resend";
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/libs/mongodb";
// import User from "@/models/users";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(request) {
//   const data = await request.json();
//   const { email } = data;

//   console.log(data.email);

//   await connectDB();
//   const user = await User.findOne({ email: email });

//   if (!user) {
//     return NextResponse.json(
//       { message: "No se encontró un usuario con este correo electrónico" },
//       { status: 404 }
//     );
//   }
//   try {
//     const userId = user._id.toString();
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     const resetLink = `http://localhost:3000/reset-password?token=${token}`;

//     const data = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: "Change Password",
//       // react: <EmailTemplate resetLink={resetLink} />,
//       html: `<a href=${resetLink}>change pass</a>`,
//     });

//     console.log("data mail", data);
//     return NextResponse.json(data, {
//       message: "Se ha enviado el mail por favor verifica la bandeja de entrada",
//     });
//   } catch (error) {
//     console.error("Error sending mail:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import EmailTemplate from "@/components/EmailTemplate";
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
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    const msg = {
      to: data.email,
      from: "anddreshoy@gmail.com",
      subject: "Change Password",
      html: `<p>Para restablecer tu contraseña, haz click en el siguiente enlace: <a href="${resetLink}">${resetLink}</a></p>`,
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
