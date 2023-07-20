import constants from '../../common/constants'
import fs from 'fs'
import path from 'path'

export const jwt = {
  algorithm: 'HS256',
  publicAccessKey: fs.readFileSync(path.resolve(__dirname, './public.key')),
  privateAccessKey: fs.readFileSync(path.resolve(__dirname, './private.key')),
  publicRefreshKey: fs.readFileSync(path.resolve(__dirname, './public.refresh.key')),
  privateRefreshKey: fs.readFileSync(path.resolve(__dirname, './private.refresh.key')),
  expiresIn: constants.JWT.JWT_REFRESH,
}
