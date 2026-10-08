import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getOverview = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const spendingByCategory = await Transaction.aggregate([
      {
        $match: {
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: {
            $sum: "$amount",
          },
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);

    const totalTransactions =
      await Transaction.countDocuments();

    res.json({
      success: true,
      data: {
        totalUsers,
        totalTransactions,
        topSpendingCategories: spendingByCategory,
      },
    });
  } catch (error) {
    next(error);
  }
};