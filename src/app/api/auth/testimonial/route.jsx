import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import Testimonial from "@/models/testimonial";

export async function GET() {
  try {
    await connectDB();
    const testimonialsFound = await Testimonial.find();

    return NextResponse.json(testimonialsFound);
  } catch (error) {
    console.error("Error fetching Testimonials:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  const data = await request.json();

  try {
    await connectDB();

    const { user, description } = data;

    const Testimonials = await Testimonial.create({
      user: user._id,
      username: user.username,
      description,
    });

    console.log(Testimonials);

    return NextResponse.json(Testimonials);
  } catch (error) {
    console.error("Error during testimonial registration:", error);
    return NextResponse.error(
      "An error occurred during tetsimonial registration. Please try again later."
    );
  }
}
