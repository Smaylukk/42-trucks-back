import * as mongoose from 'mongoose'
import { DatabaseConfig } from '../config/config'
import { StartService } from './startService'
import { UpdateService } from './updateService'

const connectDb = async () => {
  await mongoose.connect(DatabaseConfig.mongoURL)
  await StartService.initValue()
  await UpdateService.updateDb()
}

export { connectDb }
