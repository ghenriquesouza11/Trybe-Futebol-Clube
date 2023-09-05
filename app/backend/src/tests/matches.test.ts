import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/matches.model';

import { Response } from 'superagent';
import { allTeamsMock, teamById } from './Mocks/teams.mock';
import { allMatches, createdMatch, finishedMatches, matchToCreate, matchWithEqualTeams, onGoingMatches } from './Mocks/matches.mock';
import SequelizeUsers from '../database/models/users.model';
import { invalidToken, userDataValues, validCredentials } from './Mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Obter todas partidas', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as SequelizeMatches[]);

    const res: Response = await chai.request(app).get('/matches').send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(allMatches);
  });

  it('Obter todas as partidas em andamento', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(onGoingMatches as SequelizeMatches[]);

    const res: Response = await chai.request(app).get('/matches?inProgress=true').send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(onGoingMatches);
  });

  it('Obter todas as partidas finalizadas', async () => {
    sinon.stub(SequelizeMatches, 'findAll').resolves(finishedMatches as SequelizeMatches[]);

    const res: Response = await chai.request(app).get('/matches?inProgress=false').send();

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal(finishedMatches);
  });

  it('Finalizar uma partida com sucesso', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).patch('/matches/1/finish').set({ authorization: 'Bearer ' + LoginRes.body.token });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal({ message: "Finished" });
  });

  it('Tentativa de finalizar uma partida sem token', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).patch('/matches/1/finish').set({ authorization: '' });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: "Token not found" });
  });

  it('Tentativa de finalizar uma partida com um token inválido', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).patch('/matches/1/finish').set({ authorization: 'Bearer ' + invalidToken });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: "Token must be a valid token" });
  });

  it('Atualizar uma partida em andamento com sucesso', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).patch('/matches/1').set({ authorization: 'Bearer ' + LoginRes.body.token });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.deep.equal({ message: "Updated" });
  });

  it('Tentativa de atualizar uma partida em andamento sem token', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).patch('/matches/1').set({ authorization: '' });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: "Token not found" });
  });

  it('Tentativa de atualizar uma partida em andamento com um token inválido', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).patch('/matches/1').set({ authorization: 'Bearer ' + invalidToken });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: "Token must be a valid token" });
  });

  it('Cadastrar uma nova partida com sucesso', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);
    sinon.stub(SequelizeMatches, 'create').resolves(createdMatch as SequelizeMatches);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).post('/matches').set({ authorization: 'Bearer ' + LoginRes.body.token }).send(matchToCreate);

    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.deep.equal(createdMatch);

  });

  it('Tentativa de cadastrar uma nova partida sem token', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);
    sinon.stub(SequelizeMatches, 'create').resolves(createdMatch as SequelizeMatches);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).post('/matches').set({ authorization: '' }).send(matchToCreate);

    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: "Token not found" });

  });

  it('Tentativa de cadastrar uma nova partida com um token inválido', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);
    sinon.stub(SequelizeMatches, 'create').resolves(createdMatch as SequelizeMatches);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).patch('/matches/1').set({ authorization: 'Bearer ' + invalidToken });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.be.deep.equal({ message: "Token must be a valid token" });

  });

  it('Tentativa de cadastrar uma nova partida com dois times iguais', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);
    sinon.stub(SequelizeMatches, 'create').resolves(createdMatch as SequelizeMatches);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const res: Response = await chai.request(app).post('/matches').set({ authorization: 'Bearer ' + LoginRes.body.token }).send(matchWithEqualTeams);

    expect(res.status).to.be.equal(422);
    expect(res.body).to.be.deep.equal({ message: "It is not possible to create a match with two equal teams" });

  });
});
