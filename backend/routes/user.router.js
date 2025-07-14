import express from 'express';
import {
  addUser,
  getAllUsers,
  deleteUser,
  updateUser,
  searchUsers,
  getUserById,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/add-user', addUser); // <-- THIS MUST EXIST
router.get('/', getAllUsers);
router.get('/search', searchUsers);
router.get('/:id', getUserById);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;
