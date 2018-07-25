import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.should();
chai.use(chaiHttp);

const server = require('../dist/index');

describe('/api/v1/users', () => {
  describe('POST /', () => {
    it('should return 400 if username is lesser than 2', () => {
      chai.request(server.default)
        .post('/api/v1/users')
        .send({ username: '1', email: 'francis@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
        });
    });

    it('should return 400 if username is not provided', () => {
      chai.request(server.default)
        .post('api/v1/users')
        .send({ email: 'francis@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
        });
    });

    it('should return 400 if email is not provided', () => {
      chai.request(server.default)
        .post('api/v1/users')
        .send({ username: 'francis' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
        });
    });

    it('should return 400 if email is not a valid mail address', () => {
      chai.request(server.default)
        .post('api/v1/users')
        .send({ username: 'francis', email: 'francisgmailcom' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body.success).to.equal(false);
        });
    });

    it('should return expected data if input is valid', () => {
      chai.request(server.default)
        .post('api/v1/users')
        .send({ username: 'francis', email: 'francis@gmail.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal(false);
        });
    });
  });
});
