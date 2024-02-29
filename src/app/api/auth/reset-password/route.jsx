import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function PUT(request) {
  const data = await request.json();
  const { password, token } = data;
  const hashedPassword = await bcrypt.hash(password, 12);
  const tokenData = token;

  try {
    console.log(tokenData);
    const decodedToken = jwt.verify(tokenData, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    await connectDB();

    const userUpdate = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    if (!userUpdate) {
      return NextResponse.json({ message: "user  not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
