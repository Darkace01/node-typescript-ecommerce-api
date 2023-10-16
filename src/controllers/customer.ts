import express from 'express';
import { db } from '../lib/db';

export const getCustomers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const customers = await db.customer.findMany();
    return res.status(200).json(customers || []);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addCustomer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const existingCustomer = await db.customer.findFirst({
      where: {
        email: email,
      },
    });

    if (existingCustomer) {
      return res.status(400).json({ message: 'Customer already exists' });
    }

    const customer = await db.customer.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        email,
      },
    });

    return res.status(200).json(customer);
  } catch (error) {
    console.log('[Customer_ADD_ERROR]', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
