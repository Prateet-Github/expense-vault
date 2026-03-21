import { connectDB } from "@/lib/db";
import Expense from "@/models/expense.model";
import { getUserFromRequest } from "@/lib/getUser";

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const expense = await Expense.create({
      ...body,
      userId: user.userId,
    });

    return Response.json(expense);

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromRequest();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const query: any = { userId: user.userId };

    if (category) query.category = category;

    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const expenses = await Expense.find(query).sort({ date: -1 });

    return Response.json(expenses);

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}