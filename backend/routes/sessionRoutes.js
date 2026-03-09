import express from 'express';
import { startSession, trackActivity, endSession, getSession, getActivities, getAnalytics } from '../controllers/sessionController.js';

const router = express.Router();

router.post('/session/start', startSession); // Start new session
router.post('/activity', trackActivity); // Track activity
router.post('/session/end', endSession); // End session
router.get('/session/:id', getSession); // Get session analytics
router.get('/session/:id/activities', getActivities); // Get activities for a session
router.get('/session/:id/analytics', getAnalytics); // Get analytics for a session
export default router;