import * as express from 'express';
import teamsRoutes from './teams.routes';

const router = express.Router();

router.use(teamsRoutes);

export default router;
