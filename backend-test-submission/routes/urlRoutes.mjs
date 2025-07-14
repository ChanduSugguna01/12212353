import { Router } from 'express';
import { createShortUrl, getStats, redirectUrl } from '../controllers/urlController.mjs';

const router = Router();

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:shortcode', getStats);
router.get('/:shortcode', redirectUrl);

export default router;