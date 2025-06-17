const express = require('express')
const { getNote, createNote, updateNote, deleteNote } = require('../controllers/noteController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.use(authMiddleware)
router.get('/',getNote)
router.post('/',createNote)
router.put('/:id',updateNote)
router.delete('/:id',deleteNote)

module.exports = router