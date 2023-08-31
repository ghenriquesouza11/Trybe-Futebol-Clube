import { Request, Response } from 'express';
import * as express from 'express';
import TeamsControllers from '../controllers/teams.controllers';

const router = express.Router();

const teamsControllers = new TeamsControllers();

router.get('/teams', (req: Request, res: Response) => teamsControllers.findAll(req, res));
router.get('/teams/:id', (req: Request, res: Response) => teamsControllers.findByPk(req, res));

export default router;
