import { HtmlTextDocument, HtmlTextModel } from '../models/model'
import htmlTextRepository from '../repositories/htmlTextRepository'

class HtmlTextService {
  async getOne(name: string) {
    return htmlTextRepository.getOneByName(name)
  }

  async create(userId: string, data: HtmlTextDocument) {
    const user = htmlTextRepository.getOne(userId)
    if (user) {
      return htmlTextRepository.create(data)
    }
    return null
  }

  async update(userId: string, name: string, data: Partial<HtmlTextDocument>) {
    const user = htmlTextRepository.getOne(userId)
    if (user) {
      return htmlTextRepository.update(name, data)
    }
    return null
  }
}

export default new HtmlTextService()
