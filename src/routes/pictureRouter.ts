import { Router } from 'express'
import authMiddleware from '../middlewares/authMiddleware'
import pictureController from '../controllers/pictureController'

const router = Router()

router.post('/uploadPicture', authMiddleware, pictureController.uploadPicture)
router.post('/deletePicture', authMiddleware, pictureController.deletePicture)

export default router
