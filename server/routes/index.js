const express = require('express');
const router = express.Router();
const placeholder = require('../controllers/placeholder');

router.get('/placeholder', placeholder.getPlaceholder);
router.post('/placeholder', placeholder.postPlaceholder);

module.exports = router;