import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/utils/hash";
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {

    await connectDB();

    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error during signup:', error);
    return NextResponse.json({ error: 'An error occurred during signup' }, { status: 500 });
  }
}