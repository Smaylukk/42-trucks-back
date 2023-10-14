import { CarDocument, CarModel } from '../models/model'

class CarRepository {
  async create(carData: Partial<CarDocument>): Promise<CarDocument> {
    const car = new CarModel(carData)
    return car.save()
  }

  // Знайти всі автомобілі
  async getAll(): Promise<CarDocument[]> {
    return CarModel.find().exec()
  }

  // Знайти всі активні автомобілі
  async getAllActiveCar(): Promise<CarDocument[]> {
    return CarModel.find({ active: true }).exec()
  }

  // Знайти автомобіль за ідентифікатором
  async getOne(id: string): Promise<CarDocument | null> {
    return CarModel.findById(id).exec()
  }

  // Оновити інформацію про автомобіль
  async update(id: string, carData: Partial<CarDocument>): Promise<CarDocument | null> {
    return CarModel.findByIdAndUpdate(id, carData, { new: true }).exec()
  }

  // Видалити автомобіль за ідентифікатором
  async delete(id: string): Promise<CarDocument | null> {
    return CarModel.findByIdAndDelete(id).exec()
  }
}

export default new CarRepository()
