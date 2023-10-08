import UserRepository from '../repositories/userRepository'

export class StartService {
  static async initValue() {
    // create admin user
    const user = await UserRepository.getOneUserByEmail('admin@admin.com')
    if (!user) {
      const adminData = {
        name: 'admin',
        email: 'admin@admin.com',
        password: '$2b$05$5j/Nq1K5uRxjeE4mipSKgO3w6LU0Zl7AFk9TNpUp3IWNV7KFQr/FK',
      }
      await UserRepository.createUser(adminData)
    }
  }
}
