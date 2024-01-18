// userController.js
import express from 'express';
import UserService from './user-service.js';
import { validateUser } from './user-validator.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    // Validando os dados do usuário
    const validationResult = await validateUser(req.body);

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error });
    }

    const { email } = validationResult.value;

    // Checando se o email ja existe
    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) {
      return res.status(412).json({ message: 'Email already exists' });
    }

    // Cria o novo usuário
    const { name, phone, coordinates } = validationResult.value;
    const newUser = await UserService.createUser(name, email, phone, coordinates);
    res.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Server Error');
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, coordinates } = req.body;
    const updatedUser = await UserService.updateUser(id, name, email, phone, coordinates);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Server Error');
  }
});

export default router;
