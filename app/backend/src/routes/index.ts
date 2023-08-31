import * as express from 'express';
import teamsRoutes from './teams.routes';
import usersRoutes from './users.routes';

const router = express.Router();

router.use(teamsRoutes);
router.use(usersRoutes);

export default router;
