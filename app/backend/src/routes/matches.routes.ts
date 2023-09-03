import { Request, Response } from 'express';
import * as express from 'express';
import MatchesControllers from '../controllers/matches.controllers';
import Validations from '../middlewares/validations';

const matchesRouter = express.Router();

const matchesControllers = new MatchesControllers();

matchesRouter.get('/matches', (req: Request, res: Response) =>
  matchesControllers.getAllMatches(req, res));

matchesRouter.patch(
  '/matches/:id/finish',
  Validations.validateToken,

  (req: Request, res: Response) =>
    matchesControllers.finishMatch(req, res),
);

matchesRouter.patch(
  '/matches/:id',
  Validations.validateToken,

  (req: Request, res: Response) => matchesControllers.updateMatch(req, res),
);

export default matchesRouter;
