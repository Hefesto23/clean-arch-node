/* eslint-disable prefer-destructuring */
import dotenv from 'dotenv';

dotenv.config();

export const URL_BIG_COMMERCE = 'https://api.bigcommerce.com/stores/';

export const API_PORT = process.env.API_PORT;

export const BC_HASH = process.env.BC_HASH;

export const BC_AUTH_CLIENT = process.env.BC_AUTH_CLIENT;

export const BC_AUTH_TOKEN = process.env.BC_AUTH_TOKEN;

export const BC_HTTP_HEADER = {
  'content-type': 'application/json',
  accept: 'application/json',
  'X-Auth-Token': BC_AUTH_TOKEN,
};
