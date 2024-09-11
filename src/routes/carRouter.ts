import { Router } from 'express'
import { body } from 'express-validator'
import carController from '../controllers/carController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post(
  '/',
  [
    body('name').notEmpty().withMessage("Марка машини обов'язкова"),
    body('number').notEmpty().withMessage("Номер машини обов'язкова"),
  ],
  authMiddleware,
  carController.create,
)
router.put('/:id', authMiddleware, carController.update)
router.get('/', authMiddleware, carController.getAll)
router.get('/car/active', carController.getAllActiveCar)
router.get('/repair/active', carController.getAllActiveRepairCar)
router.get('/zombie/active', carController.getAllActiveZombieCar)
router.get('/:id', carController.getOne)
router.get('/admin/:id', authMiddleware, carController.getOneAdmin)
router.delete('/:id', authMiddleware, carController.delete)
router.get('/prev/:id', carController.getPrev)
router.get('/next/:id', carController.getNext)

export default router
