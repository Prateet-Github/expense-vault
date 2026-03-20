import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";

export async function GET(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

  const decoded: any = await verifyToken(token);
  if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  await connectDB();
  const user = await User.findById(decoded.userId).select("-password");

  return NextResponse.json(user);
}