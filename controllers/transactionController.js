import Transaction from "../models/Transaction.js";

const isValidTransactionId = (id) => /^[a-f\d]{24}$/i.test(id);

export const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user._id,
      date: new Date(req.body.date),
    });

    res.status(201).json({
      success: true,
      message: "Transaction created",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const filter = {
      user: req.user._id,
    };

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.date.$lte = end;
      }
    }

    const transactions = await Transaction.find(filter).sort({
      date: -1,
    });

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthlySummary = async (req, res, next) => {
  try {
    const year = Number(req.query.year);
    const month = Number(req.query.month);

    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      month < 1 ||
      month > 12
    ) {
      return res.status(400).json({
        success: false,
        message: "Provide valid year and month",
      });
    }

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const summary = await Transaction.aggregate([
      {
        $match: {
          user: req.user._id,
          date: {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const income = summary.find((item) => item._id === "income")?.total || 0;

    const expense = summary.find((item) => item._id === "expense")?.total || 0;

    res.json({
      success: true,
      data: {
        year,
        month,
        income,
        expense,
        balance: income - expense,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    if (!isValidTransactionId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      {
        ...req.body,
        date: req.body.date ? new Date(req.body.date) : undefined,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      message: "Transaction updated",
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    if (!isValidTransactionId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid transaction ID",
      });
    }

    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      message: "Transaction deleted",
    });
  } catch (error) {
    next(error);
  }
};
