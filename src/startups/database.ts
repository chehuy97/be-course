import { Sequelize } from 'sequelize';
import configs from '../configs';

const { dbConfigs } = configs;

// export const database = () => {
//     const client = new Client({
//         user: dbConfigs.username,
//         host: dbConfigs.host,
//         database: dbConfigs.name,
//         password: dbConfigs.password,
//         port: dbConfigs.port
//     })

//     client.connect((err) => {
//         if(err) {
//             console.log('DATABASE CONNECTED FAILURELY!')
//             throw err
//         }
//         console.log('DATABASE CONNECTED!')
//     })

// }

export const database = () => {
  const sequelize = new Sequelize(
    dbConfigs.name,
    dbConfigs.username,
    dbConfigs.password,
    {
      dialect: 'postgres',
      host: dbConfigs.host,
      port: dbConfigs.port,
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log('DATABASE CONNECTED SUCCESSFULLY!');
    })
    .catch((err) => {
      console.log('DATABASE CONNECTED FAILURELY!');
      throw err;
    });
};
