import express from 'express';
import { addDraft, deleteDraft, getDraft, updateDraft } from '../controllers/draft.js';

const router = express.Router();

router.get('/:id', getDraft);
router.post('/', addDraft);
router.delete('/:id', deleteDraft);
router.put("/:id", updateDraft);

export default router;
