import constants from '../../common/constants';
import fs from 'fs';
import path from 'path';

export const jwt = {
  algorithm: 'HS256',
  publicKey: fs.readFileSync(path.resolve(__dirname, './public.key')),
  privateKey: fs.readFileSync(path.resolve(__dirname, './private.key')),
  expiresIn: constants.JWT.JWT_REFRESH,
};
