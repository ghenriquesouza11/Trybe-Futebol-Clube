import { Request, Response } from 'express';
import * as express from 'express';
import LeaderboardControllers from '../controllers/leaderboard.controllers';

const leaderboardRouter = express.Router();

const leaderboardControllers = new LeaderboardControllers();

leaderboardRouter.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderboardControllers.getHomeTeamsPerformance(req, res),
);

export default leaderboardRouter;
