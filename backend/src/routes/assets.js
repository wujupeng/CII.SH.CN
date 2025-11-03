const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

router.get('/', assetController.list);
router.post('/', assetController.create);
router.get('/:id', assetController.getById);
router.post('/:id/assign', assetController.assign);
router.post('/:id/repair', assetController.repair);
router.get('/:id/logs', assetController.logs);

module.exports = router;