import Server from './src/config/Server';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'variables.env' });

const server = new Server();

server.start();
