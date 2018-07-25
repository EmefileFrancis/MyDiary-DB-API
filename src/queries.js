
import pg from 'pg';
import config from 'config';
import { User, validateUser } from './models/user';

const connectData = {
  user: config.get('user'),
  database: config.get('database'),
  password: config.get('password'),
  port: config.get('port'),
};

const pool = new pg.Pool(connectData);

function insertANewUser(req, res, next) {
  const result = validateUser(req.body);
  if (result.error) {
    return res.status(400).json({ success: false, data: result.error.details[0].message });
  }

  pool.connect((err, client, done) => {
    if (err) {
      return res.status(500).json({ success: false, data: err });
    }

    const data = new User(req.body.username, 'iangoaefahnrgoahfnovs;dnvoa', req.body.email, 0, new Date());

    client.query('insert into users(username, hashedpassword, email, numberofentries, createdon) values($1, $2, $3, $4, $5)',
      [data.username, data.hashedpassword, data.email, data.numberofentries, data.createdon],
      (error) => {
        if (error) {
          return res.status(500).json({ success: false, data: error });
        }
        res.status(200).send({
          status: 'success',
          message: 'User added.',
        });
        done();
      });
  });
}

export { pg, insertANewUser };
