import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

const server = require('../dist/index');

describe('/api/v1/users', () => {
  describe('POST /', (done) => {
    it('should return 400 if username is lesser than 2', () => {
      chai.request(server.default)
        .post('/api/v1/users')
        .send({ username: '1', email: 'francis@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
});
