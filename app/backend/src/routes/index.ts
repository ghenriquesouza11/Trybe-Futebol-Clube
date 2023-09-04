import * as express from 'express';
import teamsRoutes from './teams.routes';
import usersRoutes from './users.routes';
import matchesRouter from './matches.routes';
import leaderboardRouter from './leaderboard.routes';

const router = express.Router();

router.use(teamsRoutes);
router.use(usersRoutes);
router.use(matchesRouter);
router.use(leaderboardRouter);

export default router;
