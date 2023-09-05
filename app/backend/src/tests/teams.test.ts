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
  it('Get all teams', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(allTeamsMock as SequelizeTeams[]);


    const res: Response = await chai.request(app).get('/teams').send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(allTeamsMock);
  });

  it('Get team by id', async () => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(teamById as SequelizeTeams)

    const res: Response = await chai.request(app).get('/teams/1').send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(teamById);
  });
});
