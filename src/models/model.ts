import { Schema, model, Document } from 'mongoose'

const toJSON = {
  virtuals: true,
  transform: (doc, ret) => {
    // Перетворити _id в id
    /* eslint-disable */
    ret.id = ret._id
    delete ret._id
    /* eslint-enable */
    return ret
  },
}

export enum ECarType {
  'car',
  'repair',
  'zombie',
}
// USER
export interface UserDocument extends Document {
  name: string
  email: string
  password: string
}
const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { toJSON },
)

const UserModel = model<UserDocument>('User', userSchema)

// CAR
export interface CarDocument extends Document {
  name: string
  number: string
  numberSort: number
  militaryBase: string
  carName: string
  status: string
  amountTires: number
  amountDyeing: number
  amountRepair: number
  addEquip: string
  description: string
  active: boolean
  color: string
  isRepair: boolean
  contactName: string
  contactPhone: string
  contactEmail: string
  carType: ECarType
  pictures: string[]
  sponsors: string[]
}
const carSchema = new Schema<CarDocument>(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    numberSort: { type: Number, required: true, min: 0 },
    militaryBase: { type: String },
    carName: { type: String },
    status: { type: String },
    amountTires: { type: Number },
    amountDyeing: { type: Number },
    amountRepair: { type: Number },
    addEquip: { type: String },
    active: { type: Boolean },
    description: { type: String },
    color: { type: String },
    isRepair: { type: Boolean },
    contactName: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String },
    carType: { type: Number },
    pictures: [{ type: String }],
    sponsors: [{ type: Schema.Types.ObjectId, ref: 'Sponsor' }],
  },
  {
    toJSON,
  },
)
const CarModel = model<CarDocument>('Car', carSchema)

// SPONSOR
export interface SponsorDocument extends Document {
  name: string
  description: string
  picture: string
  url: string
  active: boolean
}
const sponsorSchema = new Schema<SponsorDocument>(
  {
    name: { type: String, required: true },
    description: { type: String },
    picture: { type: String },
    url: { type: String },
    active: { type: Boolean },
  },
  {
    toJSON,
  },
)
const SponsorModel = model<SponsorDocument>('Sponsor', sponsorSchema)

// GRATITUDE
export interface GratitudeDocument extends Document {
  url: string
  description: string
}
const gratitudeSchema = new Schema<GratitudeDocument>(
  {
    url: { type: String },
    description: { type: String },
  },
  {
    toJSON,
  },
)

const GratitudeModel = model<SponsorDocument>('Gratitude', gratitudeSchema)

// HTML TEXT
export interface HtmlTextDocument extends Document {
  name: string
  html: string
}
const htmlTextSchema = new Schema<HtmlTextDocument>({
  name: { type: String, required: true },
  html: { type: String, required: true },
})
const HtmlTextModel = model<HtmlTextDocument>('HtmlText', htmlTextSchema)

export { UserModel, CarModel, SponsorModel, GratitudeModel, HtmlTextModel }
