import bcrypt from 'bcrypt'
import { UserDocument } from '../models/model'
import userRepository from '../repositories/userRepository'

class UserService {
  async getAllUsers() {
    return userRepository.getAllUsers()
  }

  async getOneUser(id: string) {
    return userRepository.getOneUser(id)
  }

  async createUser(userId: string, data: UserDocument) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      const hashPass = bcrypt.hashSync(data.password, 5)
      return userRepository.createUser({ ...data, password: hashPass })
    }
    return null
  }

  async updateUser(userId: string, id: string, data: Partial<UserDocument>) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      if (data.password) {
        const hashPass = bcrypt.hashSync(data.password, 5)
        return userRepository.updateUser(id, { password: hashPass })
      }
    }
    return null
  }

  async deleteUser(userId: string, id: string) {
    const user = userRepository.getOneUser(userId)
    if (user) {
      return userRepository.deleteUser(id)
    }
    return null
  }
}

export default new UserService()
