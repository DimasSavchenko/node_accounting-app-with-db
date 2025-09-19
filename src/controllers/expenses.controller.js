const expensesService = require('../repository/expenses.repository');
const usersService = require('../repository/users.repository');

const get = async (req, res) => {
  try {
    const expenses = await expensesService.getAll(req.query);

    res.json(expenses);
  } catch (error) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const userAdded = await usersService.getById(userId);

  if (userAdded === null) {
    res.sendStatus(400);

    return;
  }

  try {
    const expense = await expensesService.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expensesService.getById(id);

    if (expense === null) {
      res.sendStatus(404);

      return;
    }
    res.json(expense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expenseAdded = await expensesService.getById(id);

  if (expenseAdded === null) {
    res.sendStatus(404);

    return;
  }

  try {
    await expensesService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  const expenseAdded = await expensesService.getById(id);

  if (expenseAdded === null) {
    res.sendStatus(404);

    return;
  }

  try {
    await expensesService.update({ id, ...req.body });

    const expenseUpdated = await expensesService.getById(id);

    res.json(expenseUpdated);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
