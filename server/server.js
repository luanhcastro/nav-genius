import express from 'express';
import userController from './src/user-controller.js';
import { createTableUsers } from './database/db-tables.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
createTableUsers();

app.use('/users', userController);

app.listen(port, () => console.log(`Server has started on port: ${port}`));
