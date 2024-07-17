import express from 'express';
import { addDraft, deleteDraft, getDraft } from '../controllers/draft.js';

const router = express.Router();

router.get('/:id', getDraft);
router.post('/addDraft', addDraft);
router.delete('/:id', deleteDraft);

export default router;
