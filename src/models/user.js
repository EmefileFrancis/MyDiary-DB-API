import Joi from 'joi';

class User {
  constructor(username, hashedpassword, email, numberofentries, createdon) {
    this.username = username;
    this.hashedpassword = hashedpassword;
    this.email = email;
    this.numberofentries = numberofentries;
    this.createdon = createdon;
  }
}

function validateUser(user) {
  const schema = {
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().required().email(),
  };

  return Joi.validate(user, schema);
}

export { User, validateUser };
