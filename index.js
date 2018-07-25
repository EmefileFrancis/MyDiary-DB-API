import express from 'express';
import users from './src/routes/users';

const app = express();

app.use(express.json());
app.use('/api/v1/users', users);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;
