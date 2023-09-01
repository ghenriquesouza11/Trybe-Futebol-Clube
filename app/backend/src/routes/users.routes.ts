import * as express from 'express';
import { Request, Response } from 'express';
import Validations from '../middlewares/validations';
import UsersControllers from '../controllers/users.controllers';

const usersRoutes = express.Router();

const usersControllers = new UsersControllers();

usersRoutes.post(
  '/login',
  Validations.validateLogin,

  (req: Request, res: Response) => usersControllers.login(req, res),
);

usersRoutes.get(
  '/login/role',
  Validations.validateToken,

  (req: Request, res: Response) => usersControllers.role(req, res),
);

export default usersRoutes;
