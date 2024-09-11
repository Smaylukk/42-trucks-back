import { CarModel, HtmlTextDocument, HtmlTextModel } from '../models/model'

class HtmlTextRepository {
  async getAll(): Promise<HtmlTextDocument[]> {
    return HtmlTextModel.find().exec()
  }

  async getOne(id: string): Promise<HtmlTextDocument | null> {
    return HtmlTextModel.findById(id).exec()
  }

  async getOneByName(name: string): Promise<HtmlTextDocument | null> {
    return HtmlTextModel.findOne({ name }).exec()
  }

  async create(data: Partial<HtmlTextDocument>): Promise<HtmlTextDocument> {
    const candidate = await this.getOneByName(data.name)
    if (candidate) {
      throw new Error(`HTML text with name ${data.name} found`)
    }
    const userData = new HtmlTextModel(data)
    return userData.save()
  }

  async update(name: string, data: Partial<HtmlTextDocument>): Promise<HtmlTextDocument | null> {
    return HtmlTextModel.findOneAndUpdate({ name }, data, { new: true }).exec()
  }

  async delete(name: string): Promise<HtmlTextDocument | null> {
    return HtmlTextModel.findOneAndDelete({ name }).exec()
  }

  async updateDatabase() {
    await this.createFirstElements()
  }

  async createFirstElements() {
    const result = await this.getOneByName('requisites')
    if (!result) {
      await this.create({ name: 'requisites', html: '<body>body</body>' })
      console.log('Created first HTML-element - requisites')
    }

    const result1 = await this.getOneByName('thankCommunity')
    if (!result1) {
      await this.create({ name: 'thankCommunity', html: '<body>body</body>' })
      console.log('Created first HTML-element - thankCommunity')
    }
  }
}

export default new HtmlTextRepository()
