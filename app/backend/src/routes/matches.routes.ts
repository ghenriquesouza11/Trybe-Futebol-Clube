import { Request, Response } from 'express';
import * as express from 'express';
import MatchesControllers from '../controllers/matches.controllers';

const matchesRouter = express.Router();

const matchesControllers = new MatchesControllers();

matchesRouter.get('/matches', (req: Request, res: Response) =>
  matchesControllers.getAllMatches(req, res));

export default matchesRouter;
