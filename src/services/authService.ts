import bcrypt from 'bcrypt'
import jwtService from './jwtService'
import ApiError from '../errors/ApiError'
import UserRepository from '../repositories/userRepository'
import { UserDocument } from '../models/model';

class AuthService {
  async registration(email: string, name: string, password: string) {
    const existUser = await UserRepository.getOneUserByEmail(email)
    if (existUser) {
      throw ApiError.badRequestError(`Користувач з email ${email} вже зареєстрований`)
    }
    const user = await UserRepository.createUser({ email, name, password })

    const payload = {
      id: user.id,
      email,
      name,
    }

    return jwtService.createTokensPair(payload)
  }

  async login(email: string, password: string) {
    const user = await UserRepository.getOneUserByEmail(email)
    if (!user) {
      throw ApiError.badRequestError('Email чи пароль користувача неправильний')
    }
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      throw ApiError.badRequestError('Email чи пароль користувача неправильний')
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    return jwtService.createTokensPair(payload)
  }

  async check(user: UserDocument) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    return jwtService.generateAccessToken(payload)
  }
}

export default new AuthService()
