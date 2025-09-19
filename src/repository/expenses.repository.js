const { Expense } = require('../models/Expense.model');

const getAll = async (query) => {
  const { userId, categories, from, to } = query;
  let expenses = await Expense.findAll();

  expenses = expenses.filter((expense) => {
    if (userId && !categories) {
      if (expense.userId !== +userId) {
        return false;
      }

      return true;
    }

    if (categories) {
      if (Array.isArray(categories)) {
        const categoriesUpd = categories.map((item) => item.toLowerCase());

        if (!categoriesUpd.includes(expense.category)) {
          return false;
        }
      } else {
        if (expense.category.toLowerCase() !== categories.toLowerCase()) {
          return false;
        }
      }

      return true;
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      return false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      return false;
    }

    return true;
  });

  return expenses;
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create(expense);
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async ({ id, ...rest }) => {
  await Expense.update({ ...rest }, { where: { id } });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
