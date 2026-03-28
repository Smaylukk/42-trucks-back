import * as mongoose from 'mongoose'
import * as dns from 'dns'
import { DatabaseConfig } from '../config/config'
import { StartService } from './startService'
import { UpdateService } from './updateService'

// Використовувати Google DNS для резолюції MongoDB Atlas
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1'])

const connectDb = async () => {
  await mongoose.connect(DatabaseConfig.mongoURL)
  await StartService.initValue()
  await UpdateService.updateDb()
}

export { connectDb }
