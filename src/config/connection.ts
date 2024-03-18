import app from '../app';
import { ServiceUnavailableError } from '../utils/ApiError';
import sequelizeConfig from './sequelizeConfig';

const connection = async () => {
  try {
    await sequelizeConfig.authenticate();
    console.log('Connection to database successful');
    await sequelizeConfig.sync();
    console.log('Synced data');

    app.emit('db ready');
  } catch (error) {
    throw new ServiceUnavailableError('Unable to access the database');
  }
};

export default connection;
