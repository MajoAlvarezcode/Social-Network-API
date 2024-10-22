import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } from '../../controllers/userController.js';
// /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);
// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);
// /api/users/:userId/friends
router.route('/:userId/friends/:friendId').post(addFriend);
// /api/users/:userId/friends/friendId
router.route('/:userId/friends/:friendId').delete(deleteFriend);
export default router;
