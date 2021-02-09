import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';

const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);

(async () => {
  try {
    await mongoose.connect('mongodb://localhost/godev', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    });
    mongoose.set('debug', true);
    console.log('Mongo connected...');

    const app = express();

    if (!isProduction) {
      app.use(morgan('dev'));
    }

    app.use(cors());
    app.use(express.json());
    app.use(helmet.hidePoweredBy());
    app.use(compression({}));

    app.get('/', (req, res) => {
      res.send('<h1>Hello from backend.</h1>');
    });

    const PORT = process.env.PORT || 1337;

    app.listen(PORT, () => {
      console.log(`App is ready on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
