import express from 'express'
import aiReview from '../controllers/ai-controller.js'

const router = express.Router()

router.post('/review', aiReview)

export default router