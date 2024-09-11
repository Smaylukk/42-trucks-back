import { Router } from 'express'
import { body } from 'express-validator'
import authMiddleware from '../middlewares/authMiddleware'
import htmlTextController from '../controllers/htmlTextController'

const router = Router()

router.post(
  '/saveHtmlElement',
  [
    body('name').notEmpty().withMessage("Назва елементу обов'язкова"),
    body('html').notEmpty().withMessage("Текст елементу обов'язковий"),
  ],
  authMiddleware,
  htmlTextController.saveHtmlText,
)
router.get('/getHtmlElement/:name', htmlTextController.getHtmlText)

export default router
