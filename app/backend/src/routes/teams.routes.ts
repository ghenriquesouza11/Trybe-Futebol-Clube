import { Request, Response } from 'express';
import * as express from 'express';
import TeamsControllers from '../controllers/teams.controllers';

const router = express.Router();

const teamsControllers = new TeamsControllers();

router.get('/teams', (req: Request, res: Response) => teamsControllers.findAll(req, res));

export default router;
