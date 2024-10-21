import { Thought, User } from '../models/index.js';
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        // Formatea `createdAt` para todos los pensamientos
        const formattedThoughts = thoughts.map((thought) => ({
            ...thought.toObject(),
            createdAt: thought.createdAt.toLocaleString() // Formato de fecha
        }));
        res.json(formattedThoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSingleThought = async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        const formattedThought = {
            ...thought.toObject(), // convierte el documento de Mongoose a un objeto plano
            createdAt: thought.createdAt.toLocaleString() // Aplica el formato a `createdAt`
        };
        res.json(formattedThought);
        return;
    }
    catch (err) {
        res.status(500).json(err);
    }
    return;
};
// create a new Thought
export const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { thoughts: thought._id } }, { new: true });
        if (!user) {
            return res.status(404).json({
                message: 'Thought created, but found no user with that ID',
            });
        }
        res.json('Created the thought 🎉');
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    return;
};
export const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json({
            message: 'Thought successfully updated',
            thought,
        });
        return;
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
};
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        const user = await User.findOneAndUpdate({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        if (!user) {
            return res
                .status(404)
                .json({ message: 'Thought deleted, but no user associated with this id!' });
        }
        res.json({ message: 'Thought successfully deleted!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
    return;
};
// // Add a video response
// export const addVideoResponse = async (req: Request, res: Response) => {
//     try {
//         const video = await Video.findOneAndUpdate(
//             { _id: req.params.videoId },
//             { $addToSet: { responses: req.body } },
//             { runValidators: true, new: true }
//         );
//         if (!video) {
//             return res.status(404).json({ message: 'No video with this id!' });
//         }
//         res.json(video);
//         return;
//     } catch (err) {
//         res.status(500).json(err);
//         return;
//     }
// }
// // Remove video response
// export const removeVideoResponse = async (req: Request, res: Response) => {
//     try {
//         const video = await Video.findOneAndUpdate(
//             { _id: req.params.videoId },
//             { $pull: { reactions: { responseId: req.params.responseId } } },
//             { runValidators: true, new: true }
//         )
//         if (!video) {
//             return res.status(404).json({ message: 'No video with this id!' });
//         }
//         res.json(video);
//         return;
//     } catch (err) {
//         res.status(500).json(err);
//         return;
//     }
// }