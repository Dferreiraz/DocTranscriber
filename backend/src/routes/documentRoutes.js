const express = require('express')
const router = express.Router()
const documentController = require('../controllers/documentController')
const upload = require('../middlewares/uploadMiddleware')

router.get('/', documentController.getAllDocuments)
router.get('/:id', documentController.getDocumentById)
router.put('/:id', documentController.updateDocument)
router.delete('/:id', documentController.deleteDocument)
router.post('/', upload.single('file'), documentController.createDocument)

module.exports = router