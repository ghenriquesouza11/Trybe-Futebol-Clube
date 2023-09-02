import * as express from 'express';
import teamsRoutes from './teams.routes';
import usersRoutes from './users.routes';
import matchesRouter from './matches.routes';

const router = express.Router();

router.use(teamsRoutes);
router.use(usersRoutes);
router.use(matchesRouter);

export default router;
