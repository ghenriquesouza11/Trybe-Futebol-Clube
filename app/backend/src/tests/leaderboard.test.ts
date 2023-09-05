import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/teams.model';

import { Response } from 'superagent';
import { allTeamsMock, teamById } from './Mocks/teams.mock';
import { Teams } from '../Interfaces/teams.interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /teams', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Obter a performance de todos os times da casa', async () => {
    const res: Response = await chai.request(app).get('/leaderboard/home').send();

    expect(res.status).to.be.equal(200);
  });
});
