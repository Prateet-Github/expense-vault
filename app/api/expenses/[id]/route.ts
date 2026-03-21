import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Expense from "@/models/expense.model";
import { getUserFromRequest } from "@/lib/getUser";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // defining params as a Promise
) {
  try {
    await connectDB();

    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // await the params object to extract the ID
    const { id } = await params;

    const expense = await Expense.findOne({
      _id: id,
      userId: user.userId, // ensuring user owns this expense
    });

    if (!expense) {
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { userId, ...updateData } = body;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: id, userId: user.userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return NextResponse.json({ error: "Expense not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(updatedExpense);
  } catch (error: any) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deletedExpense = await Expense.findOneAndDelete({
      _id: id,
      userId: user.userId,
    });

    if (!deletedExpense) {
      return NextResponse.json(
        { error: "Expense not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Expense deleted successfully"
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}