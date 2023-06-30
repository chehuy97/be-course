import dotenv from 'dotenv';

dotenv.config();

export const dbConfigs = {
  host: process.env.SQL_HOST as string,
  port: parseInt(process.env.SQL_PORT as string, 3000),
  username: process.env.SQL_USERNAME as string,
  password: process.env.SQL_PASSWORD as string,
  name: process.env.SQL_NAME as string,
};
