import { Router } from 'express'
import userRouter from './userRouter'
import carRouter from './carRouter'
import sponsorRouter from './sponsorRouter'
import pictureRouter from './pictureRouter'
import gratitudeRouter from './gratitudeRouter'
import htmlTextRouter from './htmlTextRouter'

const router = Router()

router.use('/api/user', userRouter)
router.use('/api/car', carRouter)
router.use('/api/sponsor', sponsorRouter)
router.use('/api', pictureRouter)
router.use('/api/gratitude', gratitudeRouter)
router.use('/api', htmlTextRouter)
router.get('/', (req, res) => {
  res.status(200).send('It work!')
})

export default router
