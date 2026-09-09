const express = require('express')
const router = express.Router()
const upload = require('../middlewares/uploadMiddleware')
const documentController = require('../controllers/documentController')

router.get('/', documentController.getAllDocuments)
router.get('/export', documentController.exportDocuments)
router.get('/:id/download', documentController.getDocumentDownload)
router.get('/:id', documentController.getDocumentById)
router.post('/', upload.single('file'), documentController.createDocument)
router.put('/:id', documentController.updateDocument)
router.delete('/:id', documentController.deleteDocument)

module.exports = router