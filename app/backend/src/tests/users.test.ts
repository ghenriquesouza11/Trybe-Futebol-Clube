import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/teams.model';

import { Response } from 'superagent';
import SequelizeUsers from '../database/models/users.model';
import { invalidToken, loginWithoutEmail, loginWithoutPassword, userDataValues, validCredentials } from './Mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Login com sucesso', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const res: Response = await chai.request(app).post('/login').send(validCredentials);

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.key('token');
  });

  it('Tentativa de login sem informar o email', async () => {
    const res: Response = await chai.request(app).post('/login').send(loginWithoutEmail);

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.deep.equal({message: "All fields must be filled"});
  });

  it('Tentativa de login sem informar o password', async () => {
    const res: Response = await chai.request(app).post('/login').send(loginWithoutPassword);

    expect(res.status).to.be.equal(400);
    expect(res.body).to.be.deep.equal({message: "All fields must be filled"});
  });
  
  it('Obter a user role com sucesso', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const UserRoleRes: Response = await chai.request(app).get('/login/role').set({ authorization: 'Bearer ' + LoginRes.body.token }).send();

    expect(UserRoleRes.status).to.be.equal(200);
    expect(UserRoleRes.body).to.have.key('role');
    expect(UserRoleRes.body.role).to.be.equal('admin');
  });

  it('Tentativa de obter a user role sem um token', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const UserRoleRes: Response = await chai.request(app).get('/login/role').set({ authorization: '' }).send();

    expect(UserRoleRes.status).to.be.equal(401);
    expect(UserRoleRes.body).to.be.deep.equal({ message: "Token not found" });
  });

  it('Tentativa de obter a user role com um token inválido', async () => {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userDataValues as SequelizeUsers);

    const LoginRes: Response = await chai.request(app).post('/login').send(validCredentials);

    const UserRoleRes: Response = await chai.request(app).get('/login/role').set({ authorization: 'Bearer ' + invalidToken }).send();

    expect(UserRoleRes.status).to.be.equal(401);
    expect(UserRoleRes.body).to.be.deep.equal({ message: "Token must be a valid token" });
  });
});
