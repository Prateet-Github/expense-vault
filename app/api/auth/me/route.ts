import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/utils/jwt';
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 }); // Return 200 so fetch doesn't crash
    }

    const decoded: any = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    await connectDB();
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Wrap the response in a 'user' object
    return NextResponse.json({ user }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 500 });
  }
}