import express from 'express';
import { addDraft, deleteDraft, getDraft } from '../controllers/draft.js';
import { updatePost } from '../controllers/post.js';

const router = express.Router();

router.get('/:id', getDraft);
router.post('/', addDraft);
router.delete('/:id', deleteDraft);
router.put("/:id", updatePost);

export default router;
