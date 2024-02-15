import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/users";

export async function PUT(request) {
  const data = await request.json();
  const { updatedData, user } = data;
  const session = user;

  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const userUpdate = await User.findOneAndUpdate(
      {
        _id: session.user._id,
      },
      {
        $set: {
          username: updatedData.username,
          email: updatedData.email,
        },
      },
      { new: true }
    );

    if (!userUpdate) {
      return NextResponse.json(
        { message: "user or user not found" },
        { status: 404 }
      );
    }

    session.user = userUpdate;

    return NextResponse.json(userUpdate, {
      headers: {
        "set-cookie": session.cookie,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
