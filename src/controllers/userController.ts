import User from '../models/User.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })
      .select('-__v');

    if (!user) {
      res.status(404).json({ message: 'No user with that ID' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.create(req.body);
    res.json({
      message: 'User successfully created!',
      user: dbUserData,
    }); 
  } catch (err) {
    res.status(500).json(err);
  }
}


export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json({
      message: 'User successfully updated!',
      user,
    }); 
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    return; 
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId); // Correcto

    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }

    res.json({ message: 'User successfully deleted!' }); // Mensaje de éxito
  } catch (err) {
    res.status(500).json(err);
  }

  return; 
}

// Add a friend
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId); // Verifica que el usuario exista
    const friend = await User.findById(req.params.friendId); // Verifica que el amigo exista

    if (!user) {
        return res.status(404).json({ message: `No user found with id ${req.params.userId}!` });
    }

    if (!friend) {
        return res.status(404).json({ message: `No friend found with id ${req.params.friendId}!` });
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } }, // Agrega el ID del amigo al array `friends`
        { runValidators: true, new: true }
    );

      res.json({
        message: 'Friend successfully added',
        friend: updatedUser,
  });
      return;
  } catch (err) {
      res.status(500).json(err);
      return;
  }
}


// Delete a friend
export const deleteFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId); // Verifica que el usuario exista
    const friend = await User.findById(req.params.friendId); // Verifica que el amigo exista

    if (!user) {
        return res.status(404).json({ message: `No user found with id ${req.params.userId}!` });
    }

    if (!friend) {
        return res.status(404).json({ message: `No friend found with id ${req.params.friendId}!` });
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } }, // Elimina el ID del amigo del array `friends`
        { runValidators: true, new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ message: 'Friend not found in user\'s friend list!' });
    }

      res.json({
          message: 'Friend successfully deleted',
          friend: updatedUser,
  });
      return;
  } catch (err) {
      res.status(500).json(err);
      return;
  }
}
