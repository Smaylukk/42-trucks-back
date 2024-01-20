import { Router } from 'express'
import { body } from 'express-validator'
import todoController from '../controllers/carController'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

router.post(
  '/',
  [
    body('name').notEmpty().withMessage("Марка машини обов'язкова"),
    body('number').notEmpty().withMessage("Номер машини обов'язкова"),
  ],
  authMiddleware,
  todoController.create,
)
router.put('/:id', authMiddleware, todoController.update)
router.get('/', todoController.getAll)
router.get('/repair', todoController.getAllRepair)
router.get('/active', todoController.getAllActiveCar)
router.get('/repair/active', todoController.getAllActiveRepairCar)
router.get('/:id', todoController.getOne)
router.delete('/:id', authMiddleware, todoController.delete)
router.get('/prev/:id', todoController.getPrev)
router.get('/next/:id', todoController.getNext)

export default router
