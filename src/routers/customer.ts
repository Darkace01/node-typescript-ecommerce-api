import express from 'express';
import { handleApiAuth } from '../middleware';
import { ApiConstants } from '../utils';
import { getCustomers, addCustomer } from '../controllers/customer';
export default (router: express.Router) => {
  router.get(
    `${ApiConstants.ApiBaseUrl}/customers`,
    handleApiAuth,
    getCustomers
  );
  router.post(
    `${ApiConstants.ApiBaseUrl}/customers`,
    handleApiAuth,
    addCustomer
  );
};
