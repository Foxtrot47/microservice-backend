import express from 'express';
import compression from 'compression';
import cors from 'cors';

import { connectDB } from './db/mongoose';
import ProductRoutes from './routes';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

connectDB();

// Enable compression
app.use(compression());

// Enable CORS
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/', ProductRoutes);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
