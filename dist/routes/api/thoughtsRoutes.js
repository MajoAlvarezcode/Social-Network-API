import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought } from '../../controllers/thoughtsController.js';
// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);
// /api/thoughts/:thoughtsId
router
    .route('/:thoughtId/')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
export default router;
