const usersService = require('../repository/users.repository');

const get = async (_req, res) => {
  try {
    const users = await usersService.getAll();

    res.json(users.map((user) => usersService.normilizeUser(user)));
  } catch (error) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await usersService.create(name);

    res.status(201).json(usersService.normilizeUser(user));
  } catch (error) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.json(usersService.normilizeUser(user));
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await usersService.getById(id);

    if (!todo) {
      res.sendStatus(404);

      return;
    }

    await usersService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await usersService.update({ id, name });

    const updatedUser = await usersService.getById(id);

    res.json(usersService.normilizeUser(updatedUser));
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
