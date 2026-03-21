import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Expense from "@/models/expense.model";
import { getUserFromRequest } from "@/lib/getUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const user = await getUserFromRequest();
    
    //  strict check: ensuring user and userId exist
    if (!user || !user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // type-cast to string to satisfy the ObjectId constructor
    const validUserId = new mongoose.Types.ObjectId(user.userId as string);

    const stats = await Expense.aggregate([
      { 
        $match: { 
          userId: validUserId 
        } 
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Aggregation Error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}