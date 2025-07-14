import express from 'express';
import cors from 'cors';
import urlRoutes from './routes/urlRoutes.mjs';
import loggerMiddleware from './middlewares/loggerMiddleware.mjs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/', urlRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});