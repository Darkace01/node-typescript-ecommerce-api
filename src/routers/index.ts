import express from 'express';
import category from './category';
import customer from './customer';

const router = express.Router();

export default (): express.Router => {
  category(router);
  customer(router);
  return router;
};
