import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/users";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const data = await request.json();

  try {
    await connectDB();

    const { username, email, password } = data;
    const userFound = await User.findOne({ email: email });

    if (userFound)
      return NextResponse.json(
        { message: "email already exist" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const users = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(users);

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.error(
      "An error occurred during user registration. Please try again later."
    );
  }
}
