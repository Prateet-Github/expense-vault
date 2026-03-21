import mongoose, { Schema, model, models } from "mongoose";

const ExpenseSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "What did you spend on?"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "How much was it?"],
      min: [0, "Amount cannot be negative"],
    },
    category: {
      type: String,
      enum: [
        "Food",
        "Transport",
        "Rent",
        "Entertainment",
        "Shopping",
        "Health",
        "Stationery",
        "Other",
      ],
      default: "Other",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    currency: {
      type: String,
      default: "INR",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ userId: 1, category: 1 });

const Expense = models.Expense || model("Expense", ExpenseSchema);

export default Expense;