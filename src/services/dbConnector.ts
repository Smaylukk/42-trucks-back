import * as mongoose from 'mongoose';
import { DatabaseConfig } from '../config/config';
import { StartService } from './startService';

const connectDb = async () => {
  await mongoose.connect(DatabaseConfig.mongoURL)
  await StartService.initValue()
}

export { connectDb }
