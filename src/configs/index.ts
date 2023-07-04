import { cors } from './cors'
import { jwt } from './jwt'
import { dbConfigs } from './db'

export default {
  dbConfigs,
  cors,
  jwtConfigs: jwt,
}
